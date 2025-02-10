-- CreateTable
CREATE TABLE "movies" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "vote_average" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "vote_count" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL,
    "release_date" TIMESTAMP(3),
    "revenue" BIGINT NOT NULL DEFAULT 0,
    "runtime" INTEGER,
    "adult" BOOLEAN NOT NULL DEFAULT false,
    "budget" BIGINT NOT NULL DEFAULT 0,
    "imdb_id" TEXT,
    "original_language" TEXT NOT NULL,
    "original_title" TEXT NOT NULL,
    "overview" TEXT,
    "popularity" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "tagline" TEXT,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genres" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "languages" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "keywords" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "keywords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MovieGenres" (
    "id" SERIAL NOT NULL,
    "movie_id" INTEGER NOT NULL,
    "genre_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "_MovieGenres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MovieCompanies" (
    "id" SERIAL NOT NULL,
    "movie_id" INTEGER NOT NULL,
    "company_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "_MovieCompanies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MovieCountries" (
    "id" SERIAL NOT NULL,
    "movie_id" INTEGER NOT NULL,
    "country_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "_MovieCountries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MovieLanguages" (
    "id" SERIAL NOT NULL,
    "movie_id" INTEGER NOT NULL,
    "language_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "_MovieLanguages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MovieKeywords" (
    "id" SERIAL NOT NULL,
    "movie_id" INTEGER NOT NULL,
    "keyword_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "_MovieKeywords_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "movies_imdb_id_key" ON "movies"("imdb_id");

-- CreateIndex
CREATE UNIQUE INDEX "genres_name_key" ON "genres"("name");

-- CreateIndex
CREATE UNIQUE INDEX "companies_name_key" ON "companies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "countries_name_key" ON "countries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "languages_code_key" ON "languages"("code");

-- CreateIndex
CREATE UNIQUE INDEX "keywords_name_key" ON "keywords"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_MovieGenres_movie_id_genre_id_key" ON "_MovieGenres"("movie_id", "genre_id");

-- CreateIndex
CREATE UNIQUE INDEX "_MovieCompanies_movie_id_company_id_key" ON "_MovieCompanies"("movie_id", "company_id");

-- CreateIndex
CREATE UNIQUE INDEX "_MovieCountries_movie_id_country_id_key" ON "_MovieCountries"("movie_id", "country_id");

-- CreateIndex
CREATE UNIQUE INDEX "_MovieLanguages_movie_id_language_id_key" ON "_MovieLanguages"("movie_id", "language_id");

-- CreateIndex
CREATE UNIQUE INDEX "_MovieKeywords_movie_id_keyword_id_key" ON "_MovieKeywords"("movie_id", "keyword_id");

-- AddForeignKey
ALTER TABLE "_MovieGenres" ADD CONSTRAINT "_MovieGenres_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieGenres" ADD CONSTRAINT "_MovieGenres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieCompanies" ADD CONSTRAINT "_MovieCompanies_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieCompanies" ADD CONSTRAINT "_MovieCompanies_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieCountries" ADD CONSTRAINT "_MovieCountries_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieCountries" ADD CONSTRAINT "_MovieCountries_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieLanguages" ADD CONSTRAINT "_MovieLanguages_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieLanguages" ADD CONSTRAINT "_MovieLanguages_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieKeywords" ADD CONSTRAINT "_MovieKeywords_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieKeywords" ADD CONSTRAINT "_MovieKeywords_keyword_id_fkey" FOREIGN KEY ("keyword_id") REFERENCES "keywords"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
