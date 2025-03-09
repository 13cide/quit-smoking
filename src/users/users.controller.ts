import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';

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
    async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
        return this.usersService.create(createUserDto)
    }

    @Post('login') // POST /users/login
    loginUser(@Body() loginDto: LoginDto) {
        return this.usersService.loginUser(loginDto)
    }
    
    @Patch(':id') // PATCH /users/:id
    async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserEntity> {
        console.log(updateUserDto)
        return this.usersService.update(id, updateUserDto)
    }

    @Delete(':id') // DELETE /users/:id
    async delete(@Param("id") id: string): Promise<UserEntity> {
        return this.usersService.delete(id)
    }
}
