import { CreateUserDto } from "./create-user.dto";
import { PartialType } from "@nestjs/mapped-types";


export class UpdateUserDto extends PartialType(CreateUserDto) {
    // This class will automatically inherit all properties from CreateUserDto
    // and make them optional.
    // No need to redefine them here.
}