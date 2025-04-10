import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { create } from 'domain';



@Controller('users')
export class UsersController {

    // constructor for user roles
    constructor(private readonly usersService: UsersService) { }

    // GET /users or /users?role=admin
    @Get()
    findAll(@Query('role') role: 'ADMIN' | 'INTERN' | 'ENGINEER' | 'MANAGER') {
        return this.usersService.findAll(role);
    }


    // GET /users/:id
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }


    // POST /users
    @Post()
    createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    // PATCH /users/:id
    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(id, updateUserDto);
    }


    // DELETE /users/:id
    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id);
    }

}
