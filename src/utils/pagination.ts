export function getPaginationParams(query: Record<string, string>) {
  const limit = query.limit ? parseInt(query.limit) : 10;
  const page = query.page ? parseInt(query.page) : 1;
  const offset = (page - 1) * limit;

  delete query.page;
  delete query.limit;

  return { filter: query, limit, page, offset };
}

export function createPaginationMeta(
  total: number,
  limit: number,
  page: number
) {
  const totalPage = Math.ceil(total / limit);
  return {
    total,
    total_page: totalPage,
    page,
    per_page: limit,
  };
}
