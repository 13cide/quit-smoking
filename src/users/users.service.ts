import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/user-create.dto';
import { UpdateUserDto } from './dto/user-update.dto';
import { UsersRepository } from './users.repositories';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async findAll() {
        return this.usersRepository.findAll()
    }

    async findOne(id: string) {

        // if (!snapshot.exists) {
        //     return null
        // } else {
        //     return snapshot.data() || null
        // }

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
        if (!res) {
            throw new NotFoundException(`User with id ${id} not found`)
        }
        await this.usersRepository.delete(id)
        return res
    }

}
