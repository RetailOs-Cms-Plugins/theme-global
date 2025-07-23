import type { Tab } from "payload";

import { ColorPickerField } from '@retailos-ai/cms-general-custom-fields'

export const colors: Tab = {
    fields: [
      {
        type: 'collapsible',
        fields: [
          {
            type: 'row',
            fields: [
              ColorPickerField(
                {
                  name: 'colorPrimary',
                  defaultValue: '#a855f7',
                  label: 'Primary (Semantic)',
                },
                {
                  allowEmpty: false,
                  enableGradient: false,
                },
              ),
              ColorPickerField(
                {
                  name: 'textOnPrimary',
                  defaultValue: '#ffffff',
                  label: 'Text on Primary',
                },
                {
                  allowEmpty: false,
                  enableGradient: false,
                },
              ),
            ],
          },
          {
            type: 'row',
            fields: [
              ColorPickerField(
                {
                  name: 'colorSecondary',
                  defaultValue: '#0ea5e9',
                  label: 'Secondary (Semantic)',
                },
                {
                  allowEmpty: false,
                  enableGradient: false,
                },
              ),
              ColorPickerField(
                {
                  name: 'textOnSecondary',
                  defaultValue: '#ffffff',
                  label: 'Text on Secondary',
                },
                {
                  allowEmpty: false,
                  enableGradient: false,
                },
              ),
            ],
          },
          {
            type: 'row',
            fields: [
              ColorPickerField(
                {
                  name: 'cardBackground',
                  defaultValue: '#faf5ff',
                  label: 'Card Background',
                },
                {
                  allowEmpty: false,
                  enableGradient: false,
                },
              ),
              ColorPickerField(
                {
                  name: 'textOnCard',
                  defaultValue: '#3b0764',
                  label: 'Text on Card',
                },
                {
                  allowEmpty: false,
                  enableGradient: false,
                },
              ),
            ],
          },
          {
            type: 'row',
            fields: [
              ColorPickerField(
                {
                  name: 'pageBackground',
                  defaultValue: '#ffffff',
                  label: 'Page Background',
                },
                {
                  allowEmpty: false,
                  enableGradient: false,
                },
              ),
              ColorPickerField(
                {
                  name: 'textOnPage',
                  defaultValue: '#000000',
                  label: 'Text on Page',
                },
                {
                  allowEmpty: false,
                  enableGradient: false,
                },
              ),
            ],
          },
        ],
        label: 'Website Colors',
      },
    ],
    label: 'Website Colors'
}