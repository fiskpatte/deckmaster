import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import {UserDTO} from './users.model';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post('register')
    async register(@Body() userDto: UserDTO){
        this.usersService.register(userDto);
    }
}
