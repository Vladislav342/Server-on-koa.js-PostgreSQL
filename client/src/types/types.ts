export type InitialStateDto = {
  id: number | undefined;
  login: string;
  isAuth: boolean;
  error: string;
  loading: boolean;
};

export type UserParams = {
  login: string;
  password: string;
};
