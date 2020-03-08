
import { Injectable, BadRequestException } from '@nestjs/common';
import { UserDTO, transformDbUser, User } from './users.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hashedPassword } from './users.helpers';

//export type User = any;

@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findOne(username: string): Promise<User | undefined> {
    try {
      const user = await this.userModel.findOne({username: username})
      if(user){
        return user;
      } else {
        return null;
      }
    } catch(error){
      console.log(error);
      return null;
    }
  }

  async register(dto: UserDTO) {
    try {
      const existingUser = await this.findOne(dto.username);
      if(existingUser){
        throw new BadRequestException("Username exists");
      }
      const hashedPsw = await hashedPassword(dto.password);
      const newUser = new this.userModel({
        username: dto.username,
        password: hashedPsw
      })
      const result = await newUser.save();
      return transformDbUser(result);
    } catch(error){
      throw error;
    }
  }
}