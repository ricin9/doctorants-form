DO $$ BEGIN
 CREATE TYPE "directorGrade" AS ENUM('Professeur', 'Maître de conférences classe A', 'Maître de conférences classe B', 'Maître assistant classe A', 'Maître assistant classe B', 'Directeur de recherche', 'Chargé de recherche', 'Maître de recherche classe A', 'Maître de recherche classe B', 'Attaché de recherche A', 'Attaché de recherche B');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "doctorateType" AS ENUM('classique', 'lmd');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "gender" AS ENUM('homme', 'femme');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('user', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "situationProfessionnelle" AS ENUM('Maître assistant classe A', 'Maître assistant classe B', 'Attaché de recherche A', 'Attaché de recherche B', 'Salarié MESRS non enseignant', 'Salarié hors MESRS', 'Non salarié');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "doctorant_details" (
	"id" integer PRIMARY KEY NOT NULL,
	"anne_bac" integer NOT NULL,
	"matricule_bac" integer NOT NULL,
	"annee_premiere_inscription" integer,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"location_birth" varchar(255) NOT NULL,
	"date_birth" varchar(255) NOT NULL,
	"gender" "gender" NOT NULL,
	"first_name_ar" varchar(255) NOT NULL,
	"last_name_ar" varchar(255) NOT NULL,
	"location_birth_ar" varchar(255) NOT NULL,
	"doctorate_type" "doctorateType" NOT NULL,
	"soutenance_expected_date" integer NOT NULL,
	"telephone" varchar(255) NOT NULL,
	"domain" varchar(255) NOT NULL,
	"filiere" varchar(255) NOT NULL,
	"speciality" varchar(255) NOT NULL,
	"laboratoite_rattachement" varchar(255) NOT NULL,
	"disciplines" varchar(255) NOT NULL,
	"titre_these" varchar(512) NOT NULL,
	"etat_avancement" varchar(512) NOT NULL,
	"situation_professionnelle" "situationProfessionnelle" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "doctorate_registration" (
	"id" integer PRIMARY KEY NOT NULL,
	"doctorant_details" serial NOT NULL,
	"thesis_director_details" serial NOT NULL,
	"thesis_co_director_details" serial NOT NULL,
	"file" varchar(255),
	"recu_payment" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "directeur_these" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"establishment" varchar(255) NOT NULL,
	"grade" "directorGrade" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(128) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" "role" DEFAULT 'user' NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "doctorant_details" ADD CONSTRAINT "doctorant_details_id_user_id_fk" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "doctorate_registration" ADD CONSTRAINT "doctorate_registration_id_user_id_fk" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "doctorate_registration" ADD CONSTRAINT "doctorate_registration_doctorant_details_doctorant_details_id_fk" FOREIGN KEY ("doctorant_details") REFERENCES "doctorant_details"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "doctorate_registration" ADD CONSTRAINT "doctorate_registration_thesis_director_details_directeur_these_id_fk" FOREIGN KEY ("thesis_director_details") REFERENCES "directeur_these"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "doctorate_registration" ADD CONSTRAINT "doctorate_registration_thesis_co_director_details_directeur_these_id_fk" FOREIGN KEY ("thesis_co_director_details") REFERENCES "directeur_these"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
