-- DropForeignKey (추가해야됨)
ALTER TABLE `Site`
DROP FOREIGN KEY `Site_parentSiteId_fkey`;

-- 기존 코드
ALTER TABLE `Admin` DROP FOREIGN KEY `Admin_siteId_fkey`;

-- DropIndex
DROP INDEX `Admin_siteId_idx` ON `Admin`;
DROP INDEX `Site_parentSiteId_idx` ON `Site`;

-- AlterTable
ALTER TABLE `Admin` DROP COLUMN `siteId`;

ALTER TABLE `Site`
  DROP COLUMN `isRoot`,
  DROP COLUMN `parentSiteId`,
  ADD COLUMN `adminId` INTEGER NOT NULL,
  ADD COLUMN `enabled` BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN `siteName` VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE `Site`
ADD CONSTRAINT `Site_adminId_fkey`
FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`)
ON DELETE RESTRICT ON UPDATE CASCADE;