import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '@src/entities/user.entity';
import logger from '@src/helpers/winston.helper';
import { sendRegisterEmail, sendFindEmail } from '@src/helpers/nodemailer.helper';

const settingsController = {
  email: async (req: Request, res: Response) => {
    const newEmail = req.body.email;

    const currentEmail = req.session.user?.email;
  },
  nickname: async (req: Request, res: Response) => {},
  pw: async (req: Request, res: Response) => {},
  deleteAccount: async (req: Request, res: Response) => {},
};

export default settingsController;
