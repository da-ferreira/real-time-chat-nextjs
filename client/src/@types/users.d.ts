export interface UserCreate {
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
  avatar: string | undefined;
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
    avatar: string;
    id: string;
  };
  message: string;
}

export interface UserLoginResponse extends UserCreateResponse { }

export interface UserChat {
  id: string;
  user1Id: string;
  user2Id: string;
  user1Avatar: string;
  user2Avatar: string;
  user1Name: string;
  user2Name: string;
  lastMessage: string;
  createdAt: string;
  updatedAt: string;
}