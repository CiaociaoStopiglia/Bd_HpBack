/*
  Warnings:

  - You are about to drop the `comida` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."comida";

-- CreateTable
CREATE TABLE "Bruxo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "casa" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "varinha" TEXT NOT NULL,
    "patrono" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bruxo_pkey" PRIMARY KEY ("id")
);
