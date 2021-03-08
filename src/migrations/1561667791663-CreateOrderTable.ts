import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateOrderTable1561667791663 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `item` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `description` text NULL, `price` decimal(9,2) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(32) NOT NULL, `password` varchar(64) NOT NULL, `email` varchar(128) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `order` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `order_items_item` (`orderId` int NOT NULL, `itemId` int NOT NULL, PRIMARY KEY (`orderId`, `itemId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `order` ADD CONSTRAINT `FK_caabe91507b3379c7ba73637b84` FOREIGN KEY (`userId`) REFERENCES `user`(`id`)");
        await queryRunner.query("ALTER TABLE `order_items_item` ADD CONSTRAINT `FK_98444c0ad52b9e6e2b1f8f1a7df` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `order_items_item` ADD CONSTRAINT `FK_beae103ca77096a308d911bc0b8` FOREIGN KEY (`itemId`) REFERENCES `item`(`id`) ON DELETE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `order_items_item` DROP FOREIGN KEY `FK_beae103ca77096a308d911bc0b8`");
        await queryRunner.query("ALTER TABLE `order_items_item` DROP FOREIGN KEY `FK_98444c0ad52b9e6e2b1f8f1a7df`");
        await queryRunner.query("ALTER TABLE `order` DROP FOREIGN KEY `FK_caabe91507b3379c7ba73637b84`");
        await queryRunner.query("DROP TABLE `order_items_item`");
        await queryRunner.query("DROP TABLE `order`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `item`");
    }

}
