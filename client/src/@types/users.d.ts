export interface UserCreate {
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
}

export interface UserLogin {
  email: string | undefined;
  password: string | undefined;
}

export interface UserCreateResponse {
  token: string;
  user: {
    name: string;
    email: string;
  };
  message: string;
}

export interface UserLoginResponse extends UserCreateResponse { }