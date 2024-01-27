export interface UserCreateResponse {
  token: string;
  user: {
    name: string;
    email: string;
  };
  message: string;
}