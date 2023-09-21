import {
	doctorateTypeEnum,
	genderEnum,
	gradesEnum,
	situationProfessionnelleEnum
} from '../../../common/formEnums';
import { pgEnum } from 'drizzle-orm/pg-core';

// Enums
export const genderPgEnum = pgEnum('gender', genderEnum);
export const doctorateTypePgEnum = pgEnum('doctorateType', doctorateTypeEnum);
export const directorGradePgEnum = pgEnum('directorGrade', gradesEnum);
export const situationProfessionnellePgEnum = pgEnum(
	'situationProfessionnelle',
	situationProfessionnelleEnum
);

// NOTE : these are causing problems because of the single quotes also ENUMs in postgres are max 64 characters
// export const laboratoiteRattachementPgEnum = pgEnum(
// 	'laboratoiteRattachement',
// 	laboratoiteRattachementEnum
// );
// export const domainPgEnum = pgEnum('domain', domainEnum);
// export const filierePgEnum = pgEnum('filiere', filiereEnum);
// export const establishmentPgEnum = pgEnum('establishment', establishmentEnum);
