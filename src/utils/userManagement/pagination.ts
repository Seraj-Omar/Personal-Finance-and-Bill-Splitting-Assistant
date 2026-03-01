export const paginate = <T>(data: T[], currentPage: number, itemsPerPage: number) => {
  const start = (currentPage - 1) * itemsPerPage;
  return data.slice(start, start + itemsPerPage);
};