import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    // Enum for user roles
    private usersRole = {
        ADMIN: 'ADMIN',
        INTERN: 'INTERN',
        ENGINEER: 'ENGINEER',
        MANAGER: 'MANAGER'
    }


    private usersData = [
        {
            id: 1,
            name: 'John Doe',
            email: 'jone@gmail.com',
            age: 25,
            address: '123 Main St, Cityville',
            phone: '555-1234',
            role: this.usersRole.ADMIN,
            isActive: true,
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'smith@gmail.com',
            age: 30,
            address: '456 Elm St, Townsville',
            phone: '555-5678',
            role: this.usersRole.INTERN,
            isActive: false,
        },
        {
            id: 3,
            name: 'Alice Johnson',
            email: 'alice@gmail.com',
            age: 28,
            address: '789 Oak St, Villageville',
            phone: '555-9012',
            role: this.usersRole.ENGINEER,
            isActive: true,
        },
        {
            id: 4,
            name: 'Bob Brown',
            email: 'bob@gmail.com',
            age: 35,
            address: '321 Pine St, Hamletville',
            phone: '555-3456',
            role: this.usersRole.MANAGER,
            isActive: false,
        }
    ]


    findAll(role?: 'ADMIN' | 'INTERN' | 'ENGINEER' | 'MANAGER') {
        if (role) {
            return this.usersData.filter(user => user.role === role);
        }
        return this.usersData;
    }


    findOne(id: number) {
        return this.usersData.find(user => user.id === id);
    }

    // Method to create a new user
    createUser(user: {
        name: string;
        email: string;
        age: number;
        address: string;
        phone: string;
        role: 'ADMIN' | 'INTERN' | 'ENGINEER' | 'MANAGER';
        isActive: boolean;
    }) {
        const newUser = {
            id: this.usersData.length + 1,
            ...user
        };
        this.usersData.push(newUser);
        return newUser;
    }

    // Method to update an existing user
    updateUser(id: number, user: {
        name?: string;
        email?: string;
        age?: number;
        address?: string;
        phone?: string;
        role?: 'ADMIN' | 'INTERN' | 'ENGINEER' | 'MANAGER';
        isActive?: boolean;
    }) {
        const existingUser = this.findOne(id);
        if (existingUser) {
            Object.assign(existingUser, user);
            return existingUser;
        }
        return null;
    }


    // Method to delete a user
    deleteUser(id: number) {
        const userIndex = this.usersData.findIndex(user => user.id === id);
        if (userIndex !== -1) {
            const deletedUser = this.usersData.splice(userIndex, 1);
            return deletedUser[0];
        }
        return null;
    }
}
