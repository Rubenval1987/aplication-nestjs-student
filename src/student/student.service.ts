import { Injectable } from '@nestjs/common';
import { CreateStudentDTO } from './dto/create-student.dto';
import { UpdateStudentDTO } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentEntity } from './entities/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
  ) {}

  async create(createStudentDTO: CreateStudentDTO) {
    const student = this.studentRepository.create(createStudentDTO);
    return this.studentRepository.save(student);
  }

  async read() {
    return this.studentRepository.find();
  }

  async update(id: any, updateStudentDTO: UpdateStudentDTO) {
    return this.studentRepository.update(id, updateStudentDTO);
  }

  async delete(id: any) {
    const student = await this.studentRepository.find(id);
    if (!student) {
      throw new Error('Estudante não encontrado!');
    }
    return this.studentRepository.delete(id);
  }
}
