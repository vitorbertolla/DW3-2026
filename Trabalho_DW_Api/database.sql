CREATE SCHEMA "public";
CREATE TABLE "estadios" (
	"id" serial,
	"nome" varchar(100) NOT NULL,
	"capacidade" integer,
	"time_id" integer NOT NULL CONSTRAINT "estadio_time_id_key" UNIQUE,
	CONSTRAINT "estadio_pkey" PRIMARY KEY("id")
);
CREATE TABLE "estados" (
	"id" serial,
	"nome" varchar(100) NOT NULL CONSTRAINT "estados_nome_key" UNIQUE,
	"sigla" char(2) NOT NULL CONSTRAINT "estado_sigla_key" UNIQUE,
	CONSTRAINT "estado_pkey" PRIMARY KEY("id")
);
CREATE TABLE "time_has_titulo" (
	"id" serial PRIMARY KEY,
	"time_id" integer NOT NULL UNIQUE,
	"titulo_id" integer NOT NULL UNIQUE,
	"ano" integer NOT NULL UNIQUE,
	CONSTRAINT "uk_time_titulo_ano" UNIQUE("time_id","titulo_id","ano")
);
CREATE TABLE "times" (
	"id" serial,
	"nome" varchar(100) NOT NULL CONSTRAINT "times_nome_key" UNIQUE,
	"fundacao" date,
	"estado_id" integer NOT NULL,
	CONSTRAINT "time_pkey" PRIMARY KEY("id")
);
CREATE TABLE "titulos" (
	"id" serial,
	"nome" varchar(100) NOT NULL CONSTRAINT "titulos_nome_key" UNIQUE,
	CONSTRAINT "titulo_pkey" PRIMARY KEY("id")
);
CREATE UNIQUE INDEX "estadio_pkey" ON "estadios" ("id");
CREATE UNIQUE INDEX "estadio_time_id_key" ON "estadios" ("time_id");
CREATE UNIQUE INDEX "estado_pkey" ON "estados" ("id");
CREATE UNIQUE INDEX "estado_sigla_key" ON "estados" ("sigla");
CREATE UNIQUE INDEX "estados_nome_key" ON "estados" ("nome");
CREATE UNIQUE INDEX "time_has_titulo_pkey" ON "time_has_titulo" ("id");
CREATE UNIQUE INDEX "uk_time_titulo_ano" ON "time_has_titulo" ("time_id","titulo_id","ano");
CREATE UNIQUE INDEX "time_pkey" ON "times" ("id");
CREATE UNIQUE INDEX "times_nome_key" ON "times" ("nome");
CREATE UNIQUE INDEX "titulo_pkey" ON "titulos" ("id");
CREATE UNIQUE INDEX "titulos_nome_key" ON "titulos" ("nome");
ALTER TABLE "estadios" ADD CONSTRAINT "fk_estadio_time" FOREIGN KEY ("time_id") REFERENCES "times"("id");
ALTER TABLE "time_has_titulo" ADD CONSTRAINT "fk_time" FOREIGN KEY ("time_id") REFERENCES "times"("id") ON DELETE CASCADE;
ALTER TABLE "time_has_titulo" ADD CONSTRAINT "fk_titulo" FOREIGN KEY ("titulo_id") REFERENCES "titulos"("id") ON DELETE CASCADE;
ALTER TABLE "times" ADD CONSTRAINT "fk_time_estado" FOREIGN KEY ("estado_id") REFERENCES "estados"("id");