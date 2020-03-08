import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: String,
    password: String
})

export interface User extends mongoose.Document {
    id: string;
    username: string;
    password: string;
}

export function transformDbUser(dbUser: any){
    return {
        id: dbUser.id,
        username: dbUser.username,
        password: dbUser.password
    }
}

export class UserDTO {
    id: string;
    username: string;
    password: string;
}