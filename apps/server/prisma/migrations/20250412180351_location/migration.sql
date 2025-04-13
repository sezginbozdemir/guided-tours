-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "images" TEXT[],

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);
