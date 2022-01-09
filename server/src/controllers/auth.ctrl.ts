import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import argon2 from 'argon2';

const authCtrl = {
  register: async (req: Request, res: Response) => {
    try {
      const { email, nickname, pw, confirmPw } = req.body;
    } catch (err) {
      console.log(err);
    }
  },
  login: async (req: Request, res: Response) => {},
  logout: async (req: Request, res: Response) => {},
};

export default authCtrl;
