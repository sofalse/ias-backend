import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateItemTable1562963497793 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `item` ADD `currency` varchar(3) NOT NULL");
        await queryRunner.query("CREATE INDEX `IDX_98444c0ad52b9e6e2b1f8f1a7d` ON `order_items_item` (`orderId`)");
        await queryRunner.query("CREATE INDEX `IDX_beae103ca77096a308d911bc0b` ON `order_items_item` (`itemId`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `IDX_beae103ca77096a308d911bc0b` ON `order_items_item`");
        await queryRunner.query("DROP INDEX `IDX_98444c0ad52b9e6e2b1f8f1a7d` ON `order_items_item`");
        await queryRunner.query("ALTER TABLE `item` DROP COLUMN `currency`");
    }

}
