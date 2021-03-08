import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePaymentTable1561979886884 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `payment` (`id` int NOT NULL AUTO_INCREMENT, `value` decimal(9,2) NOT NULL, `isPayed` tinyint(1) NOT NULL, `payedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `payment` ADD CONSTRAINT `FK_b046318e0b341a7f72110b75857` FOREIGN KEY (`userId`) REFERENCES `user`(`id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `payment` DROP FOREIGN KEY `FK_b046318e0b341a7f72110b75857`");
        await queryRunner.query("DROP TABLE `payment`");
    }

}
