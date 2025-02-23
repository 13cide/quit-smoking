import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { UserEntity } from './entities/userEntity';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get() // GET /users or /users
    async findAll(): Promise<UserEntity[]> {
        const response = await this.usersService.findAll()

        if (!response?.length) {
            throw new NotFoundException('Examples are not exist')
          }

        return response
        
    }

    @Get(':id') // GET /users/:id
    async findOne(@Param("id") id: string): Promise<UserEntity> {
        const response = await this.usersService.findOne(id)

        if (!response) {
            throw new NotFoundException('Example does not exist')
          }

        return response
    }

    @Post() // POST /users
    async create(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<UserEntity> {
        const response = await this.usersService.create(createUserDto)
        return response
    }

    // @Patch(':id') // PATCH /users/:id
    // async update(@Param("id") id: string, @Body(ValidationPipe) updateUserDto: UpdateUserDto): Promise<UserEntity> {
    //     const response = await this.usersService.update(id, updateUserDto)
    //     return response
    // }

    // @Delete(':id') // DELETE /users/:id
    // async delete(@Param("id") id: string): Promise<UserEntity> {
    //     const response = await this.usersService.delete(id)
    //     return response
    // }
}
