export const DEFAULT_PAGE_SIZE = 10;

export const getPagination = (page: number, pageSize = DEFAULT_PAGE_SIZE) => {
  const currentPage = page < 1 ? 1 : page;
  const limit = pageSize;
  const skip = (currentPage - 1) * limit;

  return { skip, limit, currentPage };
};

export const buildPageMeta = (
  totalRecords: number,
  currentPage: number,
  pageSize = DEFAULT_PAGE_SIZE
) => {
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));

  return {
    totalRecords,
    totalPages,
    currentPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1
  };
};