
export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface IUpdateUser {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}

export interface IAuthResponse {
  token: string;
  user: IUser;
}
