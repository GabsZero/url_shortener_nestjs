-- CreateTable
CREATE TABLE "redirects" (
    "id" SERIAL NOT NULL,
    "original_url" TEXT NOT NULL,
    "shortened_url" TEXT NOT NULL,
    "redirects_count" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expire_at" TIMESTAMP(3),

    CONSTRAINT "redirects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "redirects_shortened_url_key" ON "redirects"("shortened_url");
