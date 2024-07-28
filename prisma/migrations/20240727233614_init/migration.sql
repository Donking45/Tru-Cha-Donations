/*
  Warnings:

  - The primary key for the `Donor` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Donor" DROP CONSTRAINT "Donor_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Donor_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Donor_id_seq";
