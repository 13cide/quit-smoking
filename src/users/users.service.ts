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
        const data = await this.usersRepository.findOne(id)

        if (!data) throw new NotFoundException(`User with ID ${id} not found`)

        return data
    }

    async create(createUserDto: CreateUserDto) {
        return this.usersRepository.create(createUserDto)
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const res = await this.usersRepository.update(id, updateUserDto)

        if (!res) throw new NotFoundException(`User with id ${id} not found`)

        return res
    }

    async delete(id: string) {
        const doc = await this.usersRepository.findOne(id)
        if (!doc) throw new NotFoundException(`User with id ${id} not found`)

        await this.usersRepository.delete(id)

        return doc
    }

}
