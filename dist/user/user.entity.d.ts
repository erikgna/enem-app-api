import { UpdateUserDto } from "./update-user.dto";
export declare class Users {
    id: string;
    fullName: string;
    email: string;
    password: string;
    questions: UpdateUserDto[];
}
