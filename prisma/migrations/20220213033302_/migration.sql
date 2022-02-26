/*
  Warnings:

  - Added the required column `dailyVariation` to the `Stocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dailyVariationPercent` to the `Stocks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Stocks` ADD COLUMN `dailyVariation` DOUBLE NOT NULL,
    ADD COLUMN `dailyVariationPercent` DOUBLE NOT NULL;
