import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableStudentPai1688694215423 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'student',
      new TableColumn({
        name: 'pai',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
