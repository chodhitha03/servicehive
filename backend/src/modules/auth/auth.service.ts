import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import { UserDocument, UserModel } from "../../models/User.model";
import { ApiError } from "../../middleware/error.middleware";
import {
  AuthTokens,
  AuthUser,
  JwtPayload,
  LoginInput,
  RefreshInput,
  RegisterInput
} from "./auth.types";
import { UserRole } from "../../shared/constants/roles";

const toAuthUser = (user: UserDocument): AuthUser => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  role: user.role
});

const signTokens = (payload: JwtPayload): AuthTokens => ({
  accessToken: jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN
  } as jwt.SignOptions),
  refreshToken: jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN
  } as jwt.SignOptions)
});

export const register = async (input: RegisterInput) => {
  const existing = await UserModel.findOne({ email: input.email });
  if (existing) {
    throw new ApiError(409, "Email already in use");
  }

  const passwordHash = await bcrypt.hash(input.password, 12);

  const user = await UserModel.create({
    name: input.name,
    email: input.email,
    passwordHash,
    role: input.role ?? UserRole.Sales
  });

  const payload: JwtPayload = { userId: user._id.toString(), role: user.role };
  const tokens = signTokens(payload);
  user.refreshTokenHash = await bcrypt.hash(tokens.refreshToken, 12);
  await user.save();

  return { user: toAuthUser(user), tokens };
};

export const login = async (input: LoginInput) => {
  const user = await UserModel.findOne({ email: input.email });
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const matches = await bcrypt.compare(input.password, user.passwordHash);
  if (!matches) {
    throw new ApiError(401, "Invalid credentials");
  }

  const payload: JwtPayload = { userId: user._id.toString(), role: user.role };
  const tokens = signTokens(payload);
  user.refreshTokenHash = await bcrypt.hash(tokens.refreshToken, 12);
  await user.save();

  return { user: toAuthUser(user), tokens };
};

export const refresh = async (input: RefreshInput) => {
  let payload: JwtPayload;

  try {
    payload = jwt.verify(input.refreshToken, env.JWT_REFRESH_SECRET) as JwtPayload;
  } catch (error) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const user = await UserModel.findById(payload.userId);

  if (!user || !user.refreshTokenHash) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const matches = await bcrypt.compare(input.refreshToken, user.refreshTokenHash);
  if (!matches) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const tokens = signTokens({ userId: user._id.toString(), role: user.role });
  user.refreshTokenHash = await bcrypt.hash(tokens.refreshToken, 12);
  await user.save();

  return { user: toAuthUser(user), tokens };
};

export const logout = async (userId: string): Promise<void> => {
  await UserModel.findByIdAndUpdate(userId, { $unset: { refreshTokenHash: 1 } });
};

export const getMe = async (userId: string): Promise<AuthUser> => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return toAuthUser(user);
};