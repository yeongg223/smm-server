-- CreateTable
CREATE TABLE `Site` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `siteId` VARCHAR(191) NOT NULL,
    `siteKey` VARCHAR(255) NOT NULL,
    `isRoot` BOOLEAN NOT NULL DEFAULT false,
    `parentSiteId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Site_siteId_key`(`siteId`),
    INDEX `Site_parentSiteId_idx`(`parentSiteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Site` ADD CONSTRAINT `Site_parentSiteId_fkey` FOREIGN KEY (`parentSiteId`) REFERENCES `Site`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
