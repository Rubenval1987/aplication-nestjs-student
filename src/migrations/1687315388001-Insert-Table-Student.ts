import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTableStudent1687315388001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO student (name, email, password)
      VALUES
        ('John Stones', 'john@example.com', '101010'),
        ('Jane Doe', 'jane@example.com', '202020'),
        ('Alice Smith', 'alice@example.com', '303030'),
        ('Bob Johnson', 'bob@example.com', '404040'),
        ('Emma Thompson', 'emma@example.com', '505050');
    `);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
