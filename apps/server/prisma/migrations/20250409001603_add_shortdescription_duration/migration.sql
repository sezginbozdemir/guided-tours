/*
  Warnings:

  - Added the required column `duration` to the `Tour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDescription` to the `Tour` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tour" ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "shortDescription" TEXT NOT NULL;
