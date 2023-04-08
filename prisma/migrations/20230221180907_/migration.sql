/*
  Warnings:

  - The primary key for the `Stocks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `day` on the `Stocks` table. All the data in the column will be lost.
  - Added the required column `date` to the `Stocks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Stocks` DROP PRIMARY KEY,
    DROP COLUMN `day`,
    ADD COLUMN `date` DATE NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `Reits` (
    `id` VARCHAR(191) NOT NULL,
    `reit` VARCHAR(191) NOT NULL,
    `date` DATE NOT NULL,
    `investedValue` DOUBLE NOT NULL,
    `currentValue` DOUBLE NOT NULL,
    `contribution` DOUBLE NOT NULL,
    `quotas` INTEGER NOT NULL,
    `currentQuotaValue` DOUBLE NOT NULL,
    `meanQuotaValue` DOUBLE NOT NULL,
    `dailyVariation` DOUBLE NOT NULL,
    `dailyVariationPercent` DOUBLE NOT NULL,
    `variation` DOUBLE NOT NULL,
    `variationPercent` DOUBLE NOT NULL,
    `dividends` DOUBLE NOT NULL,
    `totalDividends` DOUBLE NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
