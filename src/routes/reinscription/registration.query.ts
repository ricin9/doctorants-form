import { db } from '$lib/server/db';
import {
	doctorantDetails,
	doctorateRegistration,
	thesisDirectorDetails
} from '$lib/server/db/schemas/registration';
import type { DoctorateRegistration } from './doc.registration.schema';

export async function createDoctorateRegistration(uid: string, data: DoctorateRegistration) {
	return await db.transaction(async (tx) => {
		const directeur = await tx
			.insert(thesisDirectorDetails)
			.values({
				nom: data.nomDirecteur,
				prenom: data.prenomDirecteur,
				grade: data.gradeDirecteur,
				etablissement: data.etablissementDirecteur
			})
			.returning({ id: thesisDirectorDetails.id });

		let coDirecteur: typeof directeur = [];

		if (
			data.nomCoDirecteur &&
			data.prenomCoDirecteur &&
			data.gradeCoDirecteur &&
			data.etablissementCoDirecteur
		) {
			coDirecteur = await tx
				.insert(thesisDirectorDetails)
				.values({
					nom: data.nomCoDirecteur,
					prenom: data.prenomCoDirecteur,
					grade: data.gradeCoDirecteur,
					etablissement: data.etablissementCoDirecteur
				})
				.returning({ id: thesisDirectorDetails.id });
		}

		const doctorateDetails = await tx
			.insert(doctorantDetails)
			.values({
				id: +uid,
				anneBac: data.anneBac,
				annePrevueSoutenance: data.annePrevueSoutenance,
				dateNaissance: data.dateNaissance,
				domain: data.domain,
				filiere: data.filiere,
				lieuNaissance: data.lieuNaissance,
				matriculeBac: data.matriculeBac,
				nom: data.nom,
				prenom: data.prenom,
				speciality: data.speciality,
				typeDoctorat: data.typeDoctorat,
				disciplines: data.disciplines,
				etatAvancement: data.etatAvancement,
				laboratoiteRattachement: data.laboratoiteRattachement,
				situationProfessionnelle: data.situationProfessionnelle,
				titreThese: data.titreThese,
				gender: data.gender,
				nomAr: data.nomAr,
				prenomAr: data.prenomAr,
				lieuNaissanceAr: data.lieuNaissanceAr,
				anneePremiereInscription: data.anneePremiereInscription,
				telephone: data.telephone
			})
			.onConflictDoUpdate({
				target: doctorantDetails.id,
				set: {
					id: +uid,
					anneBac: data.anneBac,
					annePrevueSoutenance: data.annePrevueSoutenance,
					dateNaissance: data.dateNaissance,
					domain: data.domain,
					filiere: data.filiere,
					lieuNaissance: data.lieuNaissance,
					matriculeBac: data.matriculeBac,
					nom: data.nom,
					prenom: data.prenom,
					speciality: data.speciality,
					typeDoctorat: data.typeDoctorat,
					disciplines: data.disciplines,
					etatAvancement: data.etatAvancement,
					laboratoiteRattachement: data.laboratoiteRattachement,
					situationProfessionnelle: data.situationProfessionnelle,
					titreThese: data.titreThese,
					gender: data.gender,
					nomAr: data.nomAr,
					prenomAr: data.prenomAr,
					lieuNaissanceAr: data.lieuNaissanceAr,
					anneePremiereInscription: data.anneePremiereInscription,
					telephone: data.telephone
				}
			})
			.returning({ id: doctorantDetails.id });

		await tx
			.insert(doctorateRegistration)
			.values({
				id: +uid,
				thesisDirectorDetails: directeur[0].id,
				thesisCoDirectorDetails: coDirecteur[0]?.id,
				doctorantDetails: doctorateDetails[0].id
			})
			.onConflictDoUpdate({
				target: doctorateRegistration.id,
				set: {
					thesisDirectorDetails: directeur[0].id,
					thesisCoDirectorDetails: coDirecteur[0]?.id,
					doctorantDetails: doctorateDetails[0].id
				}
			});
	});
}
