-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_fiatId_fkey" FOREIGN KEY ("fiatId") REFERENCES "Fiat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
