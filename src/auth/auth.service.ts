import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StudentService } from '../student/student.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { CreateStudentDTO } from '../student/dto/create-student.dto';
import { StudentEntity } from '../student/entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  private issuer = 'login';
  private audience = 'students';

  constructor(
    private readonly jwtService: JwtService,
    private readonly studentService: StudentService,
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
  ) {}

  createToken(student: StudentEntity) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: student.id,
          name: student.name,
          email: student.email,
        },
        {
          expiresIn: '7 days',
          subject: String(student.id),
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: this.issuer,
        audience: this.audience,
      });

      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (e) {
      return false;
    }
  }

  async login(email: string, password: string) {
    const student = await this.studentRepository.findOne({
      where: {
        email,
        password,
      },
    });

    if (!student) {
      throw new UnauthorizedException('Email/senha incorretos!');
    }

    return this.createToken(student);
  }

  async forget(email: string) {
    const student = await this.studentRepository.findOne({
      where: {
        email,
      },
    });

    if (!student) {
      throw new UnauthorizedException('Email incorreto!');
    }

    const token = this.jwtService.sign(
      {
        id: student.id,
      },
      {
        expiresIn: '30 minutes',
        subject: String(student.id),
        issuer: 'forget',
        audience: 'students',
      },
    );

    return true;
  }

  async reset(password: string, token: string) {
    try {
      const data: any = this.jwtService.verify(token, {
        issuer: 'forget',
        audience: 'students',
      });

      if (isNaN(Number(data.id))) {
        throw new BadRequestException('Token é inválido.');
      }

      const student = await this.studentRepository.findOne(data.id);
      if (!student) {
        throw new UnauthorizedException('Token inválido!');
      }

      student.password = password;
      await this.studentRepository.save(student);

      return this.createToken(student);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async register(data: AuthRegisterDTO) {
    const createStudentData: CreateStudentDTO = {
      id: data.id,
      name: data.name,
      email: data.email,
      mae: data.mae,
      pai: data.pai,
      password: data.password,
    };

    const student = await this.studentService.create(createStudentData);

    return this.createToken(student);
  }
}
