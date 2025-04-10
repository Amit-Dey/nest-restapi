import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty({ message: "Name is required" })
    name: string;

    @IsEmail()
    email: string;
    age: number;
    address: string;
    phone: string;

    @IsEnum(["ADMIN", "INTERN", "ENGINEER", "MANAGER"], {
        message: "Role must be one of the following: ADMIN, INTERN, ENGINEER, MANAGER"
    })
    role: 'ADMIN' | 'INTERN' | 'ENGINEER' | 'MANAGER';
    isActive: boolean;
}