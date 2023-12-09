/*
  Warnings:

  - You are about to drop the column `address` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `contactNo` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `profileImg` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `CloseDay` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Day` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bookings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `services` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `time_slots` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_slotId_fkey";

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_userId_fkey";

-- DropIndex
DROP INDEX "users_contactNo_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "address",
DROP COLUMN "contactNo",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "profileImg",
DROP COLUMN "role",
ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "CloseDay";

-- DropTable
DROP TABLE "Day";

-- DropTable
DROP TABLE "bookings";

-- DropTable
DROP TABLE "services";

-- DropTable
DROP TABLE "time_slots";

-- DropEnum
DROP TYPE "BookingStatus";

-- DropEnum
DROP TYPE "ServiceAvailabality";

-- DropEnum
DROP TYPE "UserRole";
