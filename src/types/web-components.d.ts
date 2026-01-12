import type { DetailedHTMLProps, HTMLAttributes } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'tiro-form-filler': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        id?: string;
        questionnaire?: string;
        'sdc-endpoint-address'?: string;
        'launch-context'?: string;
        'read-only'?: boolean;
        language?: string;
      };
      'tiro-narrative': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        for?: string;
        'sdc-endpoint-address'?: string;
      };
      'tiro-validation-report': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        for?: string;
        'hide-when-valid'?: boolean;
      };
    }
  }
}

export {};
