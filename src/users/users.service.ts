import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { UsersRepository } from './users.repositories';

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
        const response = await this.usersRepository.update(id, updateUserDto)
        if (!response) {
            return null
        }
        return response
    }

    async delete(id: string) {
        const res = await this.usersRepository.findOne(id)
        await this.usersRepository.delete(id)
        return res
    }

}
