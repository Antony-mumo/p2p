-- CreateEnum
CREATE TYPE "PriceType" AS ENUM ('MARKET', 'FIXED');

-- CreateEnum
CREATE TYPE "OfferType" AS ENUM ('BUY', 'SELL');

-- CreateEnum
CREATE TYPE "P2PType" AS ENUM ('NORMAL', 'SECURE');

-- CreateEnum
CREATE TYPE "OfferStatus" AS ENUM ('ACTIVE', 'CANCELED', 'EXPIRED', 'COMPLETED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Crypto" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Crypto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fiat" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fiat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TradeDuration" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TradeDuration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
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
    "status" "OfferStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_cryptoId_fkey" FOREIGN KEY ("cryptoId") REFERENCES "Crypto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_durationId_fkey" FOREIGN KEY ("durationId") REFERENCES "TradeDuration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
