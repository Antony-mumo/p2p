/*
  Warnings:

  - Added the required column `chainId` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contractAddress` to the `Offer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "chainId" TEXT NOT NULL,
ADD COLUMN     "contractAddress" TEXT NOT NULL;
