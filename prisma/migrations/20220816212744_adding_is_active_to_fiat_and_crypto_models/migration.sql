-- AlterTable
ALTER TABLE "Crypto" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Fiat" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
