import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // @ApiCreatedResponse({ type: UserEntity })
  // async signup(@Body() createUserDto: CreateUserDto) {
  //   return await this.usersService.signup(createUserDto);
  // }

  // @Post('signin')
  // @ApiOkResponse({ type: UserEntity })
  // async signin(@Res() res: any, @Body() createUserDto: CreateUserDto) {
  //   return await this.usersService.signin(createUserDto, this.jwtService, res);
  // }

  // @Delete('logout')
  // @ApiOkResponse({ type: UserEntity })
  // async logout(@Res() res: any) {
  //   return await this.usersService.logout(res);
  // }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserEntity })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}
