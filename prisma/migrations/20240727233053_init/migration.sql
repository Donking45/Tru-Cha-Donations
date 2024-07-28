/*
  Warnings:

  - You are about to drop the column `donationId` on the `Donor` table. All the data in the column will be lost.
  - Added the required column `txid` to the `Donor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donor" DROP COLUMN "donationId",
ADD COLUMN     "txid" TEXT NOT NULL;
