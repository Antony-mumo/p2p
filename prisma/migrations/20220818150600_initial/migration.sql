-- CreateEnum
CREATE TYPE "PriceType" AS ENUM ('MARKET', 'FIXED');

-- CreateEnum
CREATE TYPE "OfferType" AS ENUM ('BUY', 'SELL');

-- CreateEnum
CREATE TYPE "P2PType" AS ENUM ('NORMAL', 'SECURE');

-- CreateEnum
CREATE TYPE "OfferStatus" AS ENUM ('ACTIVE', 'CANCELED', 'EXPIRED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "DurationType" AS ENUM ('MINUTES', 'HOURS', 'DAYS', 'WEEK', 'MONTH');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL DEFAULT '254',
    "nationalId" TEXT,
    "nationalIdFrontImageUrl" TEXT,
    "nationalIdBackImageUrl" TEXT,
    "firstAddress" TEXT,
    "secondAddress" TEXT,
    "password" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Crypto" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Crypto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fiat" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fiat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TradeDuration" (
    "id" SERIAL NOT NULL,
    "duration" INTEGER NOT NULL,
    "type" "DurationType" NOT NULL DEFAULT 'MINUTES',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TradeDuration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" SERIAL NOT NULL,
    "chainId" TEXT NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cryptoId" INTEGER NOT NULL,
    "fiatId" INTEGER NOT NULL,
    "durationId" INTEGER NOT NULL,
    "priceType" "PriceType" NOT NULL,
    "p2pType" "P2PType" NOT NULL DEFAULT 'SECURE',
    "offerType" "OfferType" NOT NULL,
    "maximumAmount" DOUBLE PRECISION NOT NULL,
    "minimumAmount" DOUBLE PRECISION NOT NULL,
    "margin" DOUBLE PRECISION NOT NULL,
    "fixedRate" DOUBLE PRECISION NOT NULL,
    "offerTerms" TEXT NOT NULL,
    "tradeInstructions" TEXT NOT NULL,
    "status" "OfferStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_nationalId_key" ON "User"("nationalId");

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_cryptoId_fkey" FOREIGN KEY ("cryptoId") REFERENCES "Crypto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_fiatId_fkey" FOREIGN KEY ("fiatId") REFERENCES "Fiat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_durationId_fkey" FOREIGN KEY ("durationId") REFERENCES "TradeDuration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
