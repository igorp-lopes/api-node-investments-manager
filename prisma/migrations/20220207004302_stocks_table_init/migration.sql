-- CreateTable
CREATE TABLE `Stocks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stock` VARCHAR(191) NOT NULL,
    `day` DATETIME(3) NOT NULL,
    `investedValue` DOUBLE NOT NULL,
    `currentValue` DOUBLE NOT NULL,
    `contribution` DOUBLE NOT NULL,
    `quotas` INTEGER NOT NULL,
    `currentQuotaValue` DOUBLE NOT NULL,
    `meanQuotaValue` DOUBLE NOT NULL,
    `variation` DOUBLE NOT NULL,
    `variationPercent` DOUBLE NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
