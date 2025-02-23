import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { UsersRepository } from './users.repositories';
import { Timestamp } from '@google-cloud/firestore';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async findAll() {
        return this.usersRepository.findAll()
    }

    async findOne(id: string) {
        return this.usersRepository.findOne(id)
    }

    async create(createUserDto: CreateUserDto) {
        return this.usersRepository.create(createUserDto)
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        return await this.usersRepository.update(id, updateUserDto)
    }

    async delete(id: string) {
        return this.usersRepository.delete(id)
    }

}
