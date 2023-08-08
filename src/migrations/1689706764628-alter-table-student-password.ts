/* eslint-disable @typescript-eslint/no-empty-function */
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableStudentPassword1689706764628
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'student',
      new TableColumn({
        name: 'password',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
