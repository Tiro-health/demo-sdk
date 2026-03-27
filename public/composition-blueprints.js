// Hardcoded Composition blueprints for template extraction
// Maps questionnaire URLs to their Composition blueprints with FHIRPath expressions

const COMPOSITION_BLUEPRINTS = {
  // ER/PR/HER2 rapportering
  "http://templates.tiro.health/templates/2ff90405d2bf4bbba8941b61d4881d78": {
    resourceType: "Composition",
    status: "final",
    type: {
      coding: [{ system: "http://loinc.org", code: "11529-5", display: "Surgical pathology report" }],
    },
    title: "ER/PR/HER2 Rapportering",
    section: [
      {
        id: "specimen",
        title: "Specimen",
        extension: [
          {
            url: "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-templateExtractContext",
            valueExpression: {
              language: "text/fhirpath",
              expression: "item.where(linkId='019c90a9-0cf9-7550-96fb-2e67c349f999')",
            },
          },
        ],
        text: {
          status: "generated",
          div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><strong>Type specimen:</strong> {{%context.item.where(linkId='019c90a9-0c94-7fe0-8272-a317a96862c0').answer.valueCoding.display}}</p></div>",
        },
      },
      {
        id: "er-results",
        title: "Resultaat ER",
        extension: [
          {
            url: "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-templateExtractContext",
            valueExpression: {
              language: "text/fhirpath",
              expression: "item.where(linkId='019c90a9-0cf9-7550-96fb-2e67c349f999').item.where(linkId='019c93f7-e55e-7aa7-931b-74f7e3d739f0')",
            },
          },
        ],
        text: {
          status: "generated",
          div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><strong>ER percentage:</strong> {{%context.item.where(linkId='019c93f7-e7b6-7aa7-931b-81c50e888ae4').answer.valueDecimal}}%</p><p><strong>ER resultaat:</strong> {{%context.item.where(linkId='019c93f7-e7b6-7aa7-931b-92ab69c556eb').answer.valueCoding.display}}</p><p><strong>ER intensiteit:</strong> {{%context.item.where(linkId='019c93f7-e7b6-7aa7-931b-a22fae77508c').answer.valueCoding.display}}</p></div>",
        },
      },
      {
        id: "pr-results",
        title: "Resultaat PR",
        extension: [
          {
            url: "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-templateExtractContext",
            valueExpression: {
              language: "text/fhirpath",
              expression: "item.where(linkId='019c90a9-0cf9-7550-96fb-2e67c349f999').item.where(linkId='019c93f7-752c-7aa7-9316-f12f649ffbdf')",
            },
          },
        ],
        text: {
          status: "generated",
          div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><strong>PR percentage:</strong> {{%context.item.where(linkId='019c93f7-7b20-7aa7-9317-16c3f6512044').answer.valueDecimal}}%</p><p><strong>PR resultaat:</strong> {{%context.item.where(linkId='019c93f7-7b20-7aa7-9317-268766388e44').answer.valueCoding.display}}</p><p><strong>PR intensiteit:</strong> {{%context.item.where(linkId='019c93f7-7b20-7aa7-9317-36e1d4e7e907').answer.valueCoding.display}}</p></div>",
        },
      },
      {
        id: "her2-ihc",
        title: "HER2-IHC Resultaat",
        extension: [
          {
            url: "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-templateExtractContext",
            valueExpression: {
              language: "text/fhirpath",
              expression: "item.where(linkId='019c90a9-0cf9-7550-96fb-2e67c349f999').item.where(linkId='019c940e-8640-7aa7-93be-5276a36ae34d')",
            },
          },
        ],
        text: {
          status: "generated",
          div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><strong>IHC score:</strong> {{%context.item.where(linkId='019c940e-8b90-7aa7-93be-6d906eeef1e9').answer.valueCoding.display}}</p><p><strong>HER2 status:</strong> {{%context.item.where(linkId='019c940e-8b90-7aa7-93be-79a363123727').answer.valueCoding.display}}</p><p><strong>Membraan aankleuring:</strong> {{%context.item.where(linkId='019c940e-8b90-7aa7-93be-8e6fee57fdfd').answer.valueCoding.display}}</p></div>",
        },
      },
      {
        id: "her2-ish",
        title: "HER2-ISH",
        extension: [
          {
            url: "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-templateExtractContext",
            valueExpression: {
              language: "text/fhirpath",
              expression: "item.where(linkId='019c90a9-0cf9-7550-96fb-2e67c349f999')",
            },
          },
        ],
        text: {
          status: "generated",
          div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><strong>Besluit HER2-ISH:</strong> {{%context.item.where(linkId='019c90a9-0c96-74a2-9033-cf152c833c24').answer.valueCoding.display}}</p><p><strong>Opmerkingen HER2-IHC:</strong> {{%context.item.where(linkId='019c93ff-aed4-7aa7-933f-8071bb4f581c').answer.valueString}}</p><p><strong>Opmerkingen HER2-ISH:</strong> {{%context.item.where(linkId='019c93ff-d5b5-7aa7-9348-77280164c375').answer.valueString}}</p></div>",
        },
      },
      {
        id: "her2-combined",
        title: "Resultaat HER2-status (IHC en ISH)",
        extension: [
          {
            url: "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-templateExtractContext",
            valueExpression: {
              language: "text/fhirpath",
              expression: "item.where(linkId='019c90a9-0cf9-7550-96fb-2e67c349f999').item.where(linkId='019c93e4-1881-7aa7-9313-ce1c47138639')",
            },
          },
        ],
        text: {
          status: "generated",
          div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><strong>ISH groep:</strong> {{%context.item.where(linkId='019c93e4-1ae5-7aa7-9313-d8d0652ba1d9').answer.valueCoding.display}}</p><p><strong>IHC score:</strong> {{%context.item.where(linkId='019c93e4-1ae5-7aa7-9313-eb3fda8517f2').answer.valueCoding.display}}</p><p><strong>HER2 status:</strong> {{%context.item.where(linkId='019c93e4-1ae5-7aa7-9313-f8a7c4066297').answer.valueCoding.display}}</p></div>",
        },
      },
      {
        id: "remarks",
        title: "Opmerkingen",
        extension: [
          {
            url: "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-templateExtractContext",
            valueExpression: {
              language: "text/fhirpath",
              expression: "item.where(linkId='019c90a9-0cf9-7550-96fb-2e67c349f999')",
            },
          },
        ],
        text: {
          status: "generated",
          div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p>{{%context.item.where(linkId='019c93fb-ad46-7aa7-931e-67d4cb120d84').answer.valueString}}</p></div>",
        },
      },
      {
        id: "footer",
        title: "Interpretatie",
        extension: [
          {
            url: "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-templateExtractContext",
            valueExpression: {
              language: "text/fhirpath",
              expression: "item.where(linkId='019c90a9-0cf9-7550-96fb-2e67c349f999')",
            },
          },
        ],
        text: {
          status: "generated",
          div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><em>{{%context.item.where(linkId='019c93fb-fcd3-7aa7-9336-274e6b38e4b7').answer.valueString}}</em></p></div>",
        },
      },
    ],
  },

  // Mondholte tumoren
  "http://templates.tiro.health/templates/049555af4ddf4a74b7d2572f7000b12c": {
    resourceType: "Composition",
    status: "final",
    type: {
      coding: [{ system: "http://loinc.org", code: "11529-5", display: "Surgical pathology report" }],
    },
    title: "Mondholte Tumoren Rapportering",
    section: [
      {
        id: "staal-informatie",
        title: "Staal informatie",
        extension: [
          {
            url: "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-templateExtractContext",
            valueExpression: {
              language: "text/fhirpath",
              expression: "item.where(linkId='019d2048-7efc-7aa9-98e2-9a15a5b6c486')",
            },
          },
        ],
        text: {
          status: "generated",
          div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><strong>Identificatie nummer:</strong> {{%context.item.where(linkId='019d2049-7122-7aa9-990f-b7186ced993a').answer.valueString}}</p><p><strong>Aanvraagdatum:</strong> {{%context.item.where(linkId='019d2048-dc02-7aa9-98f5-7bc11d31207a').answer.valueDate}}</p></div>",
        },
      },
      {
        id: "tumorlokalisatie",
        title: "Tumorlokalisatie",
        extension: [
          {
            url: "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-templateExtractContext",
            valueExpression: {
              language: "text/fhirpath",
              expression: "item.where(linkId='019c9436-ac8c-7dd7-af8b-8c06c3b749b7')",
            },
          },
        ],
        text: {
          status: "generated",
          div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><strong>Neoadjuvante therapie:</strong> {{%context.item.where(linkId='019c9436-abcc-7b62-9dc6-2008753b679b').answer.valueCoding.display}}</p><p><strong>Tumorlokalisatie:</strong> {{%context.item.where(linkId='019c9436-abcc-7b62-9dc6-2020b9139276').answer.valueCoding.display}}</p><p><strong>Lip locatie:</strong> {{%context.item.where(linkId='019c9436-abcc-7b62-9dc6-2020b9139276').answer.item.where(linkId='019c9436-abcc-7b62-9dc6-2032a5a6ea7e').answer.valueCoding.display}}</p><p><strong>Mondholte locatie:</strong> {{%context.item.where(linkId='019c9436-abcc-7b62-9dc6-2020b9139276').answer.item.where(linkId='019d0c0d-d4b2-7449-b281-8481636cf372').answer.valueCoding.display}}</p><p><strong>Lateraliteit:</strong> {{%context.item.where(linkId='019c9436-abcc-7b62-9dc6-2020b9139276').answer.item.where(linkId='019c9436-abcd-74d2-ae73-81af3761b06c').answer.valueCoding.display}}</p></div>",
        },
      },
      {
        id: "tumor-eigenschappen",
        title: "Tumor eigenschappen",
        extension: [
          {
            url: "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-templateExtractContext",
            valueExpression: {
              language: "text/fhirpath",
              expression: "item.where(linkId='019c9436-ac8c-7dd7-af8b-8c06c3b749b7')",
            },
          },
        ],
        text: {
          status: "generated",
          div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><strong>Focaliteit:</strong> {{%context.item.where(linkId='019d0ac8-b005-7552-854f-535eaa1e6281').item.where(linkId='019c9436-abcd-74d2-ae73-81b19e085363').answer.valueCoding.display}}</p><p><strong>Aantal foci:</strong> {{%context.item.where(linkId='019d0ac8-b005-7552-854f-535eaa1e6281').item.where(linkId='019c943f-2f5e-7dd7-afe5-e444daa0d0c3').answer.valueDecimal}}</p><p><strong>Tumorafmetingen:</strong> {{%context.item.where(linkId='019c9436-abcd-74d2-ae73-81eca8692fc3').answer.valueCoding.display}}</p><p><strong>Maximale tumordimensie:</strong> {{%context.item.where(linkId='019c9436-abcd-74d2-ae73-81eca8692fc3').answer.item.where(linkId='019c9436-abcd-74d2-ae73-820dcb88663b').answer.valueDecimal}} mm</p><p><strong>Histologisch tumortype:</strong> {{%context.item.where(linkId='019c9436-abcd-74d2-ae73-822d9b46b13d').answer.valueCoding.display}}</p><p><strong>Differentiatiegraad:</strong> {{%context.item.where(linkId='019c9436-abcd-74d2-ae73-82488d577c58').answer.valueCoding.display}}</p><p><strong>WPOI:</strong> {{%context.item.where(linkId='019c9436-abcd-74d2-ae73-82667ae4b927').answer.valueCoding.display}}</p></div>",
        },
      },
      {
        id: "invasie",
        title: "Invasie",
        extension: [
          {
            url: "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-templateExtractContext",
            valueExpression: {
              language: "text/fhirpath",
              expression: "item.where(linkId='019c9436-ac8c-7dd7-af8b-8c06c3b749b7')",
            },
          },
        ],
        text: {
          status: "generated",
          div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><strong>Invasiediepte:</strong> {{%context.item.where(linkId='019c9436-abce-7cd2-b1c6-e670e22ef147').answer.valueCoding.display}}</p><p><strong>Patroon van invasie:</strong> {{%context.item.where(linkId='019c9436-abce-7cd2-b1c6-e6b611952ad7').answer.valueCoding.display}}</p><p><strong>Lokale uitbreiding:</strong> {{%context.item.where(linkId='019c9436-abce-7cd2-b1c6-e6c79d93e8b9').answer.valueCoding.display}}</p><p><strong>Invasie van bot:</strong> {{%context.item.where(linkId='019c9436-abce-7cd2-b1c6-e6c79d93e8b9').answer.item.where(linkId='019c9436-abce-7cd2-b1c6-e6e44e1b4e5d').answer.valueCoding.display}}</p><p><strong>Invasie in huid:</strong> {{%context.item.where(linkId='019c9436-abce-7cd2-b1c6-e6c79d93e8b9').answer.item.where(linkId='019d2045-f9be-7aa9-98a0-5e7cbd48f358').answer.valueCoding.display}}</p><p><strong>Invasie in mondbodem:</strong> {{%context.item.where(linkId='019c9436-abce-7cd2-b1c6-e6c79d93e8b9').answer.item.where(linkId='019d2046-4085-7aa9-98a6-ca3c09d94905').answer.valueCoding.display}}</p><p><strong>Invasie in sinus maxillaris:</strong> {{%context.item.where(linkId='019c9436-abce-7cd2-b1c6-e6c79d93e8b9').answer.item.where(linkId='019d2046-6473-7aa9-98aa-3a625ff1fbd5').answer.valueCoding.display}}</p></div>",
        },
      },
      {
        id: "vasculaire-neurale-invasie",
        title: "Vasculaire/Neurale invasie",
        extension: [
          {
            url: "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-templateExtractContext",
            valueExpression: {
              language: "text/fhirpath",
              expression: "item.where(linkId='019c9436-ac8c-7dd7-af8b-8c06c3b749b7')",
            },
          },
        ],
        text: {
          status: "generated",
          div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><strong>Lymfovasculaire invasie:</strong> {{%context.item.where(linkId='019c9436-abce-7cd2-b1c6-e73e801e976a').answer.valueCoding.display}}</p><p><strong>Specificeer lymfo/bloedvat:</strong> {{%context.item.where(linkId='019c9436-abce-7cd2-b1c6-e73e801e976a').answer.item.where(linkId='019c9436-abce-7cd2-b1c6-e749bc95903e').answer.valueCoding.display}}</p><p><strong>Perineurale invasie:</strong> {{%context.item.where(linkId='019c9436-abce-7cd2-b1c6-e76ee4994e18').answer.valueCoding.display}}</p><p><strong>Diameter grootste zenuwtak:</strong> {{%context.item.where(linkId='019c9436-abce-7cd2-b1c6-e76ee4994e18').answer.item.where(linkId='019c9436-abce-7cd2-b1c6-e77c7598adbc').answer.valueCoding.display}}</p></div>",
        },
      },
      {
        id: "marges",
        title: "Marges",
        extension: [
          {
            url: "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-templateExtractContext",
            valueExpression: {
              language: "text/fhirpath",
              expression: "item.where(linkId='019c9436-ac8c-7dd7-af8b-8c06c3b749b7')",
            },
          },
        ],
        text: {
          status: "generated",
          div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><strong>Tumorvrije marge invasief carcinoom:</strong> {{%context.item.where(linkId='019c9436-abce-7cd2-b1c6-e795cc062cb6').answer.valueCoding.display}}</p><p><strong>Minimale tumorvrije marge:</strong> {{%context.item.where(linkId='019c9436-abce-7cd2-b1c6-e795cc062cb6').answer.item.where(linkId='019c9436-abce-7cd2-b1c6-e7b0d13e1bc9').answer.valueDecimal}} mm</p><p><strong>Dichtstbijzijnde snedevlak:</strong> {{%context.item.where(linkId='019c9436-abce-7cd2-b1c6-e795cc062cb6').answer.item.where(linkId='019c9436-abce-7cd2-b1c6-e7c29ec6d649').answer.valueString}}</p><p><strong>Marge dysplasie/in situ:</strong> {{%context.item.where(linkId='019c9453-fb78-7dd7-b12d-e92c5f80b56a').answer.valueCoding.display}}</p><p><strong>Specificeer marge dysplasie:</strong> {{%context.item.where(linkId='019c9453-fb78-7dd7-b12d-e92c5f80b56a').answer.item.where(linkId='019c9453-fb78-7dd7-b12e-1a179216e2e4').answer.valueString}}</p></div>",
        },
      },
      {
        id: "ptnm",
        title: "pTNM classificatie",
        extension: [
          {
            url: "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-templateExtractContext",
            valueExpression: {
              language: "text/fhirpath",
              expression: "item.where(linkId='019c9436-ac8c-7dd7-af8b-8c06c3b749b7').item.where(linkId='019c9436-abcf-7ef0-bf4c-3d57a27dfcba')",
            },
          },
        ],
        text: {
          status: "generated",
          div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><strong>Voorvoegsel:</strong> {{%context.item.where(linkId='019c9436-abcf-7ef0-bf4c-3d696d6cd3ac').answer.valueCoding.display}}</p><p><strong>pT-stage:</strong> {{%context.item.where(linkId='019c9436-abcf-7ef0-bf4c-3d696d6cd3ac').answer.item.where(linkId='019d29a7-9827-7332-af34-f41a9f4adc0c').answer.valueCoding.display}}</p><p><strong>mpT-stage:</strong> {{%context.item.where(linkId='019c9436-abcf-7ef0-bf4c-3d696d6cd3ac').answer.item.where(linkId='019d0ad8-f3e1-7cc7-aa11-709034132f02').answer.valueCoding.display}}</p><p><strong>rpT-stage:</strong> {{%context.item.where(linkId='019c9436-abcf-7ef0-bf4c-3d696d6cd3ac').answer.item.where(linkId='019d0ae0-c327-7cc7-aa35-805705a3a488').answer.valueCoding.display}}</p><p><strong>ypT-stage:</strong> {{%context.item.where(linkId='019c9436-abcf-7ef0-bf4c-3d696d6cd3ac').answer.item.where(linkId='019c9436-abcf-7ef0-bf4c-3d4e58a22bd7').answer.valueCoding.display}}</p></div>",
        },
      },
    ],
  },
};

// Helper to get Composition blueprint for a questionnaire URL
function getCompositionBlueprint(questionnaireUrl) {
  // Strip version from URL if present (e.g., "url|1.0.0" -> "url")
  const baseUrl = questionnaireUrl?.split("|")[0];
  return COMPOSITION_BLUEPRINTS[baseUrl] || null;
}

// Build templateExtractBundle from a Composition blueprint
function buildTemplateExtractBundle(compositionBlueprint) {
  if (!compositionBlueprint) return null;
  return {
    resourceType: "Bundle",
    type: "collection",
    entry: [{ resource: compositionBlueprint }],
  };
}
