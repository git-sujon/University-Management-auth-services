export type ILoginUser = {
  id: string;
  password: string;
};

export type ILoginResponse = {
  accessToken: string;
  refreshToken?: string;
  needPasswordChange: boolean;
};


export type IJwtRefreshTokenResponse={
  accessToken:string
}