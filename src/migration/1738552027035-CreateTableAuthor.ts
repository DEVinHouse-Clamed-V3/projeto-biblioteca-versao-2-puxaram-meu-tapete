import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableAuthor1738552027035 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: "Author",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isGenerated: true,
                        isPrimary: true
                    },

                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false
                    },

                    {
                        name: "birthdate",
                        type: "Date"
                    },


                    {
                        name: "biography",
                        type: "text"
                    },


                    {
                        name: "nationality",
                        type: "varchar"
                    },


                    {
                        name: "active",
                        type: "boolean"
                    },


                    {
                        name: "created_at",
                        type: "timestamp"
                    },


                    {
                        name: "updated_at",
                        type: "timestamp"
                    },
                ]
                
            }), true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('Author')
    }

}