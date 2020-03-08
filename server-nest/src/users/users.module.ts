import { UsersService } from './users.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}
