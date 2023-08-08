import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableStudent1687315222138 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'student',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '63',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '127',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '127',
          },
        ],
      }),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
