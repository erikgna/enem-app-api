import { AuthService } from "../auth.service";
declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(email: string, password: string): Promise<import("../../user/entity/user.entity").Users>;
}
export {};
