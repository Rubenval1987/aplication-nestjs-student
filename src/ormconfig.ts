import { createConnection } from 'typeorm';
import { StudentEntity } from './student/entities/student.entity';

const connectionSource = createConnection({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [StudentEntity],
  synchronize: false,
  migrations: [`${__dirname}/migrations/{.ts,*.js}`],
  migrationsRun: true,
});

export default connectionSource;
