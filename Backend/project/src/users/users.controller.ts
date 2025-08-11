import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.usersService.findAll();
    return users.map(({ password, ...rest }) => rest);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Omit<User, 'password'> | undefined> {
    const user = await this.usersService.findById(Number(id));
    if (!user) return undefined;
    const { password, ...rest } = user;
    return rest;
  }
}