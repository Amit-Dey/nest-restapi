import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';

enum UserRole {
    ADMIN = 'admin',
    INTERN = 'intern',
    ENGINEER = 'engineer',
    MANAGER = 'manager'
}

const usersData = [
    {
        id: 1,
        name: 'John Doe',
        email: 'jone@gmail.com',
        age: 25,
        address: '123 Main St, Cityville',
        phone: '555-1234',
        role : UserRole.ADMIN,
        isActive: true,
    },
    {
        id : 2,
        name: 'Jane Smith',
        email: 'smith@gmail.com',
        age: 30,
        address: '456 Elm St, Townsville',
        phone: '555-5678',
        role : UserRole.INTERN,
        isActive: false,
    },
    {
        id: 3,
        name: 'Alice Johnson',
        email: 'alice@gmail.com',
        age: 28,
        address: '789 Oak St, Villageville',
        phone: '555-9012',
        role : UserRole.ENGINEER,
        isActive: true,
    },
    { 
        id: 4,
        name: 'Bob Brown',
        email: 'bob@gmail.com',
        age: 35,
        address: '321 Pine St, Hamletville',
        phone: '555-3456',
        role : UserRole.MANAGER,
        isActive: false,
    }
]

interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    address: string;
    phone: string;
    role: UserRole;
    isActive: boolean;
}

@Controller('users')
export class UsersController {


    // GET /users or /users?role=admin
    @Get()
    findAll(@Query('role') role: UserRole){
        if (role) {
            const filteredUsers = usersData.filter(user => user.role === role);
            if (filteredUsers.length === 0) {
                return { message: 'No users found with the specified role' };
            }
            return filteredUsers;
        }
        if (usersData.length === 0) {
            return { message: 'No users found' };
        }
        return usersData;
    }


    // GET /users/:id
    @Get(':id')
    findOne(@Param('id') id: string){
        const user = usersData.find(user => user.id === +id);
        if (!user) {
            return { message: 'User not found' };
        }
        return user;
    }


    // POST /users
    @Post()
    createUser(@Body() user: User){
        const { id, ...userWithoutId } = user;
        const newUser = {
            id: usersData.length + 1,
            ...userWithoutId,
        };
        usersData.push(newUser);
        return newUser;
    }

    // PATCH /users/:id
    @Patch(':id')
    updateUser(@Param('id') id: string, @Body() user: User){
        const userIndex = usersData.findIndex(user => user.id === +id);
        if (userIndex === -1) {
            return { message: 'User not found' };
        }
        usersData[userIndex] = { ...usersData[userIndex], ...user };
        return usersData[userIndex];
    }
    
}
