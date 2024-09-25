import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const req = context.switchToHttp().getRequest();
            const headerAuth: string = req.headers.authorization;

            const bearer = headerAuth.split(' ')[0];
            const token = headerAuth.split(' ')[1];

            if (bearer !== 'Bearer' || !token) {
                throw new HttpException(
                    'Not authorization',
                    HttpStatus.UNAUTHORIZED,
                );
            }
            const verifyToken = this.jwtService.verify(token);
            req.user = verifyToken;
            return true;
        } catch (err) {
            throw new HttpException(
                'Failed to check auth',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
