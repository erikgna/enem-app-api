import { JwtService } from "@nestjs/jwt";
import { IHeaders } from "src/interfaces/Headers";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    findOne(headers: IHeaders): Promise<any[]>;
    create(createUserDto: CreateUserDto): Promise<void>;
    newQuestion(newQuestionDto: UpdateUserDto, headers: IHeaders): Promise<void>;
    eraseHistory(headers: IHeaders): Promise<void>;
}
