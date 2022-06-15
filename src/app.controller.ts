import { Body, Controller, Delete, Get, Post, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UserEntity } from './users/entities/user.entity';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Get()
  @ApiOkResponse()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.signup(createUserDto);
  }

  @Post('signin')
  @ApiOkResponse({ type: UserEntity })
  async signin(@Res() res: any, @Body() createUserDto: CreateUserDto) {
    return await this.usersService.signin(createUserDto, this.jwtService, res);
  }

  @Delete('logout')
  @ApiOkResponse({ type: UserEntity })
  async logout(@Res() res: any) {
    return await this.usersService.logout(res);
  }

  @Get('restore')
  @ApiOkResponse({ type: UserEntity })
  async restore(@Req() req: any, @Res() res: any) {
    const user = await this.usersService.restore(req, res, this.jwtService);
    return res.status(200).json(user);
  }
}
