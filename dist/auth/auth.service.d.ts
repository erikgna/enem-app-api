import { JwtService } from '@nestjs/jwt';
import { Users } from '../user/user.entity';
import { UserService } from '../user/user.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<Users>;
    login(user: any): Promise<{
        token: string;
    }>;
}
