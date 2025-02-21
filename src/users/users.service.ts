import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';

@Injectable()
export class UsersService {

    findAll() {
        return
    }

    findOne(id: number) {
        return
    }

    create(createUserDto: CreateUserDto) {
        const newUser = { id: 0, ...createUserDto };

        return newUser;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return
    }

    delete(id: number) {
        return
    }

}
