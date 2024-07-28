-- CreateTable
CREATE TABLE "Donor" (
    "id" SERIAL NOT NULL,
    "donor_id" TEXT NOT NULL,
    "charity_id" TEXT NOT NULL,
    "amount" TEXT NOT NULL,

    CONSTRAINT "Donor_pkey" PRIMARY KEY ("id")
);
