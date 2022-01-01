-- CreateTable
CREATE TABLE "ApiToken" (
    "token" TEXT NOT NULL,
    "allowedIPs" TEXT[],

    CONSTRAINT "ApiToken_pkey" PRIMARY KEY ("token")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApiToken_token_key" ON "ApiToken"("token");
