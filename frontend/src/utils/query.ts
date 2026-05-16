export const toQueryString = (
  params: Record<string, string | number | undefined>
): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === "") {
      return;
    }
    searchParams.append(key, String(value));
  });

  return searchParams.toString();
};