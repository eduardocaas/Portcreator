export interface IAuthService {
    generateHash(password: string): Promise<string>;
    compareHash(password: string, hashPassword: string): Promise<boolean>;
    generateToken(id: string, email: string, firstAccess: boolean): string;
    validateToken(token: string): boolean;
}