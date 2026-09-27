type BaseApiResult<T> = {
  data: T;
  message: string;
  status: number;
};
