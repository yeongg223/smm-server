/*
  Warnings:

  - You are about to drop the column `siteId` on the `site` table. All the data in the column will be lost.
  - You are about to alter the column `siteKey` on the `site` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - A unique constraint covering the columns `[siteKey]` on the table `Site` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `siteApiKey` to the `Site` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Site_siteId_key` ON `site`;

-- AlterTable
ALTER TABLE `site` DROP COLUMN `siteId`,
    ADD COLUMN `siteApiKey` VARCHAR(255) NOT NULL,
    MODIFY `siteKey` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `path` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `isRoot` BOOLEAN NOT NULL DEFAULT false,
    `siteId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Admin_username_key`(`username`),
    INDEX `Admin_siteId_idx`(`siteId`),
    INDEX `Admin_path_idx`(`path`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Site_siteKey_key` ON `Site`(`siteKey`);

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_siteId_fkey` FOREIGN KEY (`siteId`) REFERENCES `Site`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
