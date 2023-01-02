import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "./create-user.dto";
import { UpdateUserDto } from "./update-user.dto";
import { UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    findOne(headers: any): Promise<any[]>;
    create(createUserDto: CreateUserDto): Promise<import("./user.entity").Users>;
    newQuestion(newQuestionDto: UpdateUserDto, headers: any): Promise<void>;
    removeQuestion(questionId: string, headers: any): Promise<void>;
}
