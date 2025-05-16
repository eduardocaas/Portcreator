export interface IAuthService {
    generateHash(input: string): Promise<string>;
}