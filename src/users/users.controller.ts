import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';


interface User {
    name: string;
    email: string;
    age: number;
    address: string;
    phone: string;
    role: 'ADMIN' | 'INTERN' | 'ENGINEER' | 'MANAGER';
    isActive: boolean;
}

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
    createUser(@Body() user: User) {
        return this.usersService.createUser(user);
    }

    // PATCH /users/:id
    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: User) {
        return this.usersService.updateUser(id, user);
    }


    // DELETE /users/:id
    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id);
    }

}
