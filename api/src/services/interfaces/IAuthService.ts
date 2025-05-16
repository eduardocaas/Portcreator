export interface IAuthService {
    generateHash(password: string): Promise<string>;
    compareHash(password: string, hashPassword: string): Promise<boolean>;
}