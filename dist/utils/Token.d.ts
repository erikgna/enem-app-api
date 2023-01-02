import { JwtService } from "@nestjs/jwt";
export declare class TokenUtils {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    getToken(auth: string): Promise<string>;
}
