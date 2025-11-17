export interface IUser {
    input: string;
    password: string;
  }
  export interface findUser {
    ok: boolean;
    user?: {
      createdAt: string;
      email: string;
      firstName: string;
      lastName: string;
      updatedAt: string;
      _id: string;
      role?: string;
      accountProgress?: number;
    };
    token?: string;
    msg?: string;
  }