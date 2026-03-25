import type { Language } from '@/hooks/useLanguage';

const translations = {
  // Header
  loggedIn: { en: 'Logged in', nl: 'Ingelogd', fr: 'Connecté' },
  switchApplication: { en: 'Switch application', nl: 'Applicatie wisselen', fr: "Changer d'application" },

  // Home page
  demoPlatform: { en: 'Tiro.health Demo Platform', nl: 'Tiro.health Demo Platform', fr: 'Tiro.health Plateforme Démo' },
  selectDemo: { en: 'Select a demo to explore', nl: 'Selecteer een demo om te verkennen', fr: 'Sélectionnez une démo à explorer' },

  // Demo registry
  pacsTitle: { en: 'Radiology Worklist', nl: 'Radiologie Werklijst', fr: 'Liste de travail Radiologie' },
  pacsDescription: { en: 'DICOM imaging worklist with modality filters, study details, and radiology reporting.', nl: 'DICOM beeldvorming werklijst met modaliteitsfilters, onderzoeksdetails en radiologische verslaggeving.', fr: "Liste de travail d'imagerie DICOM avec filtres de modalité, détails d'examen et rapports radiologiques." },
  pacsTiroLabel: { en: 'Tiro.health Radiology Demo', nl: 'Tiro.health Radiologie Demo', fr: 'Tiro.health Démo Radiologie' },
  lisTitle: { en: 'Pathology Worklist', nl: 'Pathologie Werklijst', fr: 'Liste de travail Pathologie' },
  lisDescription: { en: 'Pathology specimen tracking focused on biopsy and resection workflows.', nl: 'Pathologie specimenregistratie gericht op biopsie- en resectieworkflows.', fr: "Suivi des spécimens de pathologie axé sur les flux de biopsie et de résection." },
  lisTiroLabel: { en: 'Tiro.health Pathology Demo', nl: 'Tiro.health Pathologie Demo', fr: 'Tiro.health Démo Pathologie' },
  ehrTitle: { en: 'EHR Workspace', nl: 'EPD Werkruimte', fr: 'Espace de travail DSE' },
  ehrDescription: { en: 'Electronic health record workflow with operative reporting and longitudinal patient context.', nl: 'Elektronisch patiëntendossier workflow met operatieverslaggeving en longitudinale patiëntcontext.', fr: "Flux de travail de dossier de santé électronique avec rapports opératoires et contexte patient longitudinal." },
  ehrTiroLabel: { en: 'Tiro.health EHR Demo', nl: 'Tiro.health EPD Demo', fr: 'Tiro.health Démo DSE' },

  // PACS filter bar
  searchStudyPlaceholder: { en: 'Search patient name, study, or research question...', nl: 'Zoek patiëntnaam, onderzoek of onderzoeksvraag...', fr: 'Rechercher nom du patient, examen ou question de recherche...' },
  allModalities: { en: 'All Modalities', nl: 'Alle Modaliteiten', fr: 'Toutes les Modalités' },
  allUrgency: { en: 'All Urgency', nl: 'Alle Urgentie', fr: 'Toutes les Urgences' },
  study: { en: 'study', nl: 'onderzoek', fr: 'examen' },
  studies: { en: 'studies', nl: 'onderzoeken', fr: 'examens' },

  // PACS table headers
  dateTime: { en: 'Date/Time', nl: 'Datum/Tijd', fr: 'Date/Heure' },
  patient: { en: 'Patient', nl: 'Patiënt', fr: 'Patient' },
  mod: { en: 'Mod', nl: 'Mod', fr: 'Mod' },
  studyHeader: { en: 'Study', nl: 'Onderzoek', fr: 'Examen' },
  researchQuestion: { en: 'Research Question', nl: 'Onderzoeksvraag', fr: 'Question de recherche' },

  // Header context
  patientLabel: { en: 'Patient:', nl: 'Patiënt:', fr: 'Patient :' },
  accessionLabel: { en: 'Accession:', nl: 'Toeg.nr.:', fr: 'N° accession :' },
  specimenLabel: { en: 'Specimen:', nl: 'Specimen:', fr: 'Spécimen :' },

  // Study details
  studyNotFound: { en: 'Study not found', nl: 'Onderzoek niet gevonden', fr: 'Examen introuvable' },
  backToWorklist: { en: 'Back to Worklist', nl: 'Terug naar werklijst', fr: 'Retour à la liste de travail' },

  // SDK Panel
  sdkTitle: { en: 'Tiro.health SDK', nl: 'Tiro.health SDK', fr: 'Tiro.health SDK' },
  sdkDescription: { en: 'AI Documentation Assistant', nl: 'AI Documentatie-assistent', fr: 'Assistant de documentation IA' },

  // LIS filter bar
  searchSpecimenPlaceholder: { en: 'Search patient name, test, or accession...', nl: 'Zoek patiëntnaam, test of toeg.nr...', fr: "Rechercher nom du patient, test ou n° d'accession..." },
  allTypes: { en: 'All Types', nl: 'Alle Types', fr: 'Tous les Types' },
  allPriority: { en: 'All Priority', nl: 'Alle Prioriteit', fr: 'Toutes les Priorités' },
  allStatus: { en: 'All Status', nl: 'Alle Status', fr: 'Tous les Statuts' },
  specimen: { en: 'specimen', nl: 'specimen', fr: 'spécimen' },
  specimens: { en: 'specimens', nl: 'specimens', fr: 'spécimens' },

  // LIS table headers
  type: { en: 'Type', nl: 'Type', fr: 'Type' },
  test: { en: 'Test', nl: 'Test', fr: 'Test' },
  priority: { en: 'Priority', nl: 'Prioriteit', fr: 'Priorité' },
  status: { en: 'Status', nl: 'Status', fr: 'Statut' },
  accessionNumber: { en: 'Accession #', nl: 'Toeg.nr.', fr: "N° d'accession" },
  noSpecimensFound: { en: 'No specimens found', nl: 'Geen specimens gevonden', fr: 'Aucun spécimen trouvé' },

  // Specimen details
  specimenNotFound: { en: 'Specimen not found', nl: 'Specimen niet gevonden', fr: 'Spécimen introuvable' },
  specimenDetails: { en: 'Specimen Details', nl: 'Specimen Details', fr: 'Détails du spécimen' },
  name: { en: 'Name', nl: 'Naam', fr: 'Nom' },
  gender: { en: 'Gender', nl: 'Geslacht', fr: 'Sexe' },
  male: { en: 'Male', nl: 'Man', fr: 'Homme' },
  female: { en: 'Female', nl: 'Vrouw', fr: 'Femme' },
  dateOfBirth: { en: 'Date of Birth', nl: 'Geboortedatum', fr: 'Date de naissance' },
  collection: { en: 'Collection', nl: 'Afname', fr: 'Prélèvement' },
  dateAndTime: { en: 'Date & Time', nl: 'Datum & Tijd', fr: 'Date et heure' },
  collectionSite: { en: 'Collection Site', nl: 'Afnamelocatie', fr: 'Lieu de prélèvement' },
  orderingPhysician: { en: 'Ordering Physician', nl: 'Aanvragend Arts', fr: 'Médecin prescripteur' },
  specimenSection: { en: 'Specimen', nl: 'Specimen', fr: 'Spécimen' },
  testOrdered: { en: 'Test Ordered', nl: 'Aangevraagde Test', fr: 'Test demandé' },
  container: { en: 'Container', nl: 'Container', fr: 'Conteneur' },
  transport: { en: 'Transport', nl: 'Transport', fr: 'Transport' },
  labNotes: { en: 'Lab Notes', nl: 'Labonotities', fr: 'Notes de laboratoire' },

  // EHR page
  patientContext: { en: 'Patient Context', nl: 'Patiëntcontext', fr: 'Contexte patient' },
  activePatient: { en: 'Active patient', nl: 'Actieve patiënt', fr: 'Patient actif' },
  allergies: { en: 'Allergies', nl: 'Allergieën', fr: 'Allergies' },
  currentEncounter: { en: 'Current Encounter', nl: 'Huidig Contact', fr: 'Consultation en cours' },
  activeProblems: { en: 'Active Problems', nl: 'Actieve Problemen', fr: 'Problèmes actifs' },
  clinicalNotes: { en: 'Clinical Notes', nl: 'Klinische Notities', fr: 'Notes cliniques' },
  biometrics: { en: 'Biometrics', nl: 'Biometrie', fr: 'Biométrie' },
  weight: { en: 'Weight', nl: 'Gewicht', fr: 'Poids' },
  height: { en: 'Height', nl: 'Lengte', fr: 'Taille' },

  // Parameter form
  reporting: { en: 'Reporting', nl: 'Verslaggeving', fr: 'Rapport' },
  template: { en: 'Template', nl: 'Sjabloon', fr: 'Modèle' },
  selectTemplate: { en: 'Select template', nl: 'Selecteer sjabloon', fr: 'Sélectionner un modèle' },
  urlParameters: { en: 'URL Parameters', nl: 'URL Parameters', fr: 'Paramètres URL' },
  copyUrl: { en: 'Copy URL', nl: 'URL kopiëren', fr: "Copier l'URL" },
  refreshIframe: { en: 'Refresh iframe', nl: 'Iframe vernieuwen', fr: "Rafraîchir l'iframe" },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, language: Language): string {
  return translations[key][language];
}

const demoTitleKeys: Record<string, TranslationKey> = {
  pacs: 'pacsTitle',
  lis: 'lisTitle',
  ehr: 'ehrTitle',
};

const demoDescriptionKeys: Record<string, TranslationKey> = {
  pacs: 'pacsDescription',
  lis: 'lisDescription',
  ehr: 'ehrDescription',
};

const demoTiroLabelKeys: Record<string, TranslationKey> = {
  pacs: 'pacsTiroLabel',
  lis: 'lisTiroLabel',
  ehr: 'ehrTiroLabel',
};

export function getDemoTitle(demoId: string, language: Language): string {
  const key = demoTitleKeys[demoId];
  return key ? t(key, language) : demoId;
}

export function getDemoDescription(demoId: string, language: Language): string {
  const key = demoDescriptionKeys[demoId];
  return key ? t(key, language) : '';
}

export function getDemoTiroLabel(demoId: string, language: Language): string {
  const key = demoTiroLabelKeys[demoId];
  return key ? t(key, language) : '';
}
