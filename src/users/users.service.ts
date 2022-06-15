import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({ data: createUserDto });
  }

  async signup(user: CreateUserDto): Promise<User> {
    const newUser = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: await bcrypt.hash(user.password, 10),
      },
    });
    return { ...newUser, password: null };
  }

  async signin(user: CreateUserDto, jwt: JwtService, res: any): Promise<any> {
    const foundUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });
    if (foundUser) {
      const { password } = foundUser;
      if (bcrypt.compare(user.password, password)) {
        const user = { ...foundUser };
        delete user.password;

        const token = jwt.sign(
          { data: user },
          { secret: process.env.JWT_SECRET },
        );

        res.cookie('token', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        });

        res.send({ user });
      }
      return new HttpException(
        'Incorrect username or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return new HttpException(
      'Incorrect username or password',
      HttpStatus.UNAUTHORIZED,
    );
  }

  async restore(req: any, res: any, jwt: JwtService): Promise<any> {
    const { token } = req.cookies;

    if (!token) {
      res.clearCookie('token');
      return new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
    }

    try {
      const decoded = jwt.verify(token, { secret: process.env.JWT_SECRET });
      const { data } = decoded;
      const { id } = data;
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      if (user) {
        return { user };
      }
    } catch (e) {
      return new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }

  async logout(res: any) {
    res.clearCookie('token');
    res.send({ message: 'Logged out' });
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        name: true,
        email: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
      select: {
        name: true,
        email: true,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: {
        name: true,
        email: true,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
