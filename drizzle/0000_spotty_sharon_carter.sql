DO $$ BEGIN
 CREATE TYPE "directorGrade" AS ENUM('1', '2', '3', '4', '5');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "doctorateType" AS ENUM('1', '2');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "gender" AS ENUM('male', 'female');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "domain" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "speciality" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "university" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "doctorant_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"bac_year" integer NOT NULL,
	"matricule_bac" integer NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"first_name_ar" varchar(255) NOT NULL,
	"last_name_ar" varchar(255) NOT NULL,
	"location_birth" varchar(255) NOT NULL,
	"location_birth_ar" varchar(255) NOT NULL,
	"date_birth" varchar(255) NOT NULL,
	"gender" "gender" NOT NULL,
	"domain" serial NOT NULL,
	"specialty" serial NOT NULL,
	"specialty_other" varchar(255),
	"doctorate_type" "doctorateType" NOT NULL,
	"year_first_registration" integer NOT NULL,
	"soutenance_expected_date" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "doctorate_registration" (
	"id" serial PRIMARY KEY NOT NULL,
	"user" serial NOT NULL,
	"doctorant_details" serial NOT NULL,
	"thesis_director_details" serial NOT NULL,
	"thesis_co_director_details" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "thesis_director_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"establishment" serial NOT NULL,
	"grade" "directorGrade" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(128) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "doctorant_details" ADD CONSTRAINT "doctorant_details_domain_domain_id_fk" FOREIGN KEY ("domain") REFERENCES "domain"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "doctorant_details" ADD CONSTRAINT "doctorant_details_specialty_speciality_id_fk" FOREIGN KEY ("specialty") REFERENCES "speciality"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "doctorate_registration" ADD CONSTRAINT "doctorate_registration_user_user_id_fk" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "doctorate_registration" ADD CONSTRAINT "doctorate_registration_doctorant_details_doctorant_details_id_fk" FOREIGN KEY ("doctorant_details") REFERENCES "doctorant_details"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "doctorate_registration" ADD CONSTRAINT "doctorate_registration_thesis_director_details_thesis_director_details_id_fk" FOREIGN KEY ("thesis_director_details") REFERENCES "thesis_director_details"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "doctorate_registration" ADD CONSTRAINT "doctorate_registration_thesis_co_director_details_thesis_director_details_id_fk" FOREIGN KEY ("thesis_co_director_details") REFERENCES "thesis_director_details"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "thesis_director_details" ADD CONSTRAINT "thesis_director_details_establishment_university_id_fk" FOREIGN KEY ("establishment") REFERENCES "university"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
