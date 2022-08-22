/*
  Warnings:

  - You are about to drop the column `name` on the `TradeDuration` table. All the data in the column will be lost.
  - Added the required column `duration` to the `TradeDuration` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DurationType" AS ENUM ('MINUTES', 'HOURS', 'DAYS', 'WEEK', 'MONTH');

-- AlterTable
ALTER TABLE "TradeDuration" DROP COLUMN "name",
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "type" "DurationType" NOT NULL DEFAULT 'MINUTES';
