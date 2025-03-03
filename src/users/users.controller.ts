import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user-create.dto';
import { UpdateUserDto } from './dto/user-update.dto';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get() // GET /users or /users
    async findAll(): Promise<UserEntity[]> {
        return this.usersService.findAll()
    }

    @Get(':id') // GET /users/:id
    async findOne(@Param("id") id: string): Promise<UserEntity> {
        return this.usersService.findOne(id)
    }

    @Post() // POST /users
    async create(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<UserEntity> {
        return this.usersService.create(createUserDto)
    }

    @Patch(':id') // PATCH /users/:id
    async update(@Param("id") id: string, @Body(ValidationPipe) updateUserDto: UpdateUserDto): Promise<UserEntity> {
        return this.usersService.update(id, updateUserDto)
    }

    @Delete(':id') // DELETE /users/:id
    async delete(@Param("id") id: string): Promise<UserEntity> {
        return this.usersService.delete(id)
    }
}
