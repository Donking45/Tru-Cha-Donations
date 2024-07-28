/*
  Warnings:

  - Added the required column `donationId` to the `Donor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donor" ADD COLUMN     "donationId" TEXT NOT NULL;
