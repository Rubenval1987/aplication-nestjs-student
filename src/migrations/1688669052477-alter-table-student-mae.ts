import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableStudentMae1688669052477 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('student', 'password');
    await queryRunner.addColumn(
      'student',
      new TableColumn({
        name: 'mae',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
