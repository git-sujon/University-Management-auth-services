type IOptions = {
  page?: number;
  limit?: number;
};

type IOptionResult = {
  page: number;
  limit: number;
  skip: number;
};

const calculatePagination = (option: IOptions): IOptionResult => {
  const page = Number(option.page) || 1;
  const limit = Number(option.limit) || 10;

  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
  };
};

export const paginationHelpers = {
  calculatePagination,
};
