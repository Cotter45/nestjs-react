import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from './users/users.service';
interface UserRequest extends Request {
  user: any;
}
@Injectable()
export class isAuthenticated implements NestMiddleware {
  constructor(
    private readonly jwt: JwtService,
    private readonly userService: UsersService,
  ) {}
  async use(req: UserRequest, res: Response, next: NextFunction) {
    try {
      // token parsed from cookies
      const { token } = req.cookies;
      const secret = process.env.JWT_SECRET;

      const payload = this.jwt.verify(token, { secret });

      if (payload.data) {
        const user = await this.userService.findOne(payload.data.id);
        if (user) {
          req.user = user;
          next();
        }
      }
    } catch {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
