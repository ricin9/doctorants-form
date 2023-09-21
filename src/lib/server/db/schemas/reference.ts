import {
	doctorateTypeEnum,
	domainEnum,
	establishmentEnum,
	filiereEnum,
	genderEnum,
	gradesEnum,
	laboratoiteRattachementEnum,
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
export const domainPgEnum = pgEnum('domain', domainEnum);
export const filierePgEnum = pgEnum('filiere', filiereEnum);
export const laboratoiteRattachementPgEnum = pgEnum(
	'laboratoiteRattachement',
	laboratoiteRattachementEnum
);
export const establishmentPgEnum = pgEnum('establishment', establishmentEnum);
