CREATE TABLE "recommendations" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"youtubeLink" varchar(255) NOT NULL,
	"score" integer NOT NULL,
	CONSTRAINT "recommendations_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);