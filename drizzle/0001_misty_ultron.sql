ALTER TABLE "doctorate_registration" DROP CONSTRAINT "doctorate_registration_doctorant_details_doctorant_details_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "doctorate_registration" ADD CONSTRAINT "doctorate_registration_doctorant_details_doctorant_details_id_fk" FOREIGN KEY ("doctorant_details") REFERENCES "doctorant_details"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
