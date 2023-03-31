import {scrypt, randomBytes} from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class PasswordsManager {

    static async toHash(password: string): Promise<string> {
        const salt = randomBytes(16).toString('hex');
        const buffer = (await scryptAsync(password, salt, 64)) as Buffer;
        return `${buffer.toString('hex')}.${salt}`;
    }

    static async compare(storedPassword: string, suppliedPassword: string){
      const [hash, salt] = storedPassword.split('.');
      const buffer = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
      return buffer.toString('hex') === hash;
    }
}