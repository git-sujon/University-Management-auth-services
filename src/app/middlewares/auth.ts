import { NextFunction, Request } from 'express';

const auth =
  (...requiredRoles) =>
  async (req: Request, res: Response, next: NextFunction) => {


    
    try {
    } catch (error) {
      next(error);
    }
  };

export default auth;
