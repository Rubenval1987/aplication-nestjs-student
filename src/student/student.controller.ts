import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateStudentDTO } from './dto/create-student.dto';
import { UpdateStudentDTO } from './dto/update-student.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @Post()
  async create(@Body() data: CreateStudentDTO) {
    const result = await this.studentService.create(data);
    delete result.password;
    return result;
  }

  @Get()
  async read() {
    return this.studentService.read();
  }

  @Patch()
  async update(@Body() data: UpdateStudentDTO) {
    return this.studentService.update(data.id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.delete(id);
  }
}
