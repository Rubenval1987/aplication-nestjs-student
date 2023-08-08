import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { StudentService } from 'src/student/student.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly studentService: StudentService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    try {
      const data = this.authService.checkToken(
        (authorization ?? '').split(' ')[1],
      );

      request.tokenPayload = data;

      //request.student = await this.studentService.show(data.id);

      return true;
    } catch (e) {
      return false;
    }
  }
}
