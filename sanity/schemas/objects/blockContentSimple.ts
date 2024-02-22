import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ExternalLink,
  Highlighter,
  Link,
  List,
  ListOrdered,
  PersonStanding,
} from 'lucide-react'
import { defineType } from 'sanity'

import {
  AlignCenterComponent,
  AlignLeftComponent,
  AlignRightComponent,
  GrayBackgroundComponent,
  HighlightComponent,
  LeadComponent,
} from '../shared'

export default defineType({
  title: 'Block Content Simple',
  name: 'blockContentSimple',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // corrensponds with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'H5', value: 'h5' },
        { title: 'H6', value: 'h6' },
        { title: 'Quote', value: 'blockquote' },
        { title: 'Lead', value: 'lead', component: LeadComponent },
        {
          title: 'Gray Background',
          value: 'grayBackground',
          component: GrayBackgroundComponent,
        },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet', icon: List },
        { title: 'Number', value: 'number', icon: ListOrdered },
        {
          title: 'Roman Numerals',
          value: 'roman',
          icon: List,
        },
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Underline', value: 'underline' },
          { title: 'Strike', value: 'strike-through' },
          {
            title: 'Highlight',
            value: 'highlight',
            icon: Highlighter,
            component: HighlightComponent,
          },
          {
            title: 'Align Left',
            value: 'alignLeft',
            icon: AlignLeft,
            component: AlignLeftComponent,
          },
          {
            title: 'Align Center',
            value: 'alignCenter',
            icon: AlignCenter,
            component: AlignCenterComponent,
          },
          {
            title: 'Align Right',
            value: 'alignRight',
            icon: AlignRight,
            component: AlignRightComponent,
          },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            name: 'internalLink',
            type: 'object',
            title: 'Internal Link',
            icon: Link,
            fields: [
              {
                name: 'reference',
                type: 'reference',
                title: 'Reference',
                to: [
                  { type: 'page' },
                  { type: 'post' },
                  // { type: 'inventory' },
                  { type: 'models' },
                  { type: 'equipmentCategory' },
                  // { type: 'assets' },
                  // { type: 'equipmentSubCategory' },
                  // other types you may want to link to
                ],
                options: {
                  disableNew: true,
                },
              },
              {
                title: 'Manual Path',
                name: 'manualPath',
                type: 'string',
                description:
                  'Used to set a manual internal page path (ex. /rentals). This will over-ride the reference above.',
              },
              {
                title: 'URL Parameters',
                name: 'params',
                type: 'string',
                description:
                  'Used to set state on a page, often on search pages. Example: "?brand=SANY"',
              },
              {
                title: 'Link Type',
                name: 'linkType',
                type: 'string',
                // role: 'link',
                options: {
                  list: [
                    { title: 'Normal', value: 'link' },
                    { title: 'Button: Primary', value: 'btnPrimary' },
                    { title: 'Button: Secondary', value: 'btnSecondary' },
                    {
                      title: 'Button: Primary Outline',
                      value: 'btnPrimaryOutline',
                    },
                    {
                      title: 'Button: Secondary Outline',
                      value: 'btnSecondaryOutline',
                    },
                  ],
                  layout: 'radio',
                },
              },
            ],
          },
          {
            title: 'External Link',
            name: 'externalLink',
            type: 'object',
            icon: ExternalLink,
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (Rule) =>
                  Rule.uri({
                    allowRelative: true,
                    scheme: ['https', 'http', 'mailto', 'tel'],
                  }),
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                description: 'Read https://css-tricks.com/use-target_blank/',
                type: 'boolean',
              },
              {
                title: 'Link Type',
                name: 'linkType',
                type: 'string',
                options: {
                  list: [
                    { title: 'Normal', value: 'link' },
                    { title: 'Button: Primary', value: 'btnPrimary' },
                    { title: 'Button: Secondary', value: 'btnSecondary' },
                    {
                      title: 'Button: Primary Outline',
                      value: 'btnPrimaryOutline',
                    },
                    {
                      title: 'Button: Secondary Outline',
                      value: 'btnSecondaryOutline',
                    },
                  ],
                  layout: 'radio',
                },
              },
            ],
          },
          {
            title: 'Request Demo',
            name: 'requestDemo',
            type: 'object',
            icon: PersonStanding,
            fields: [
              {
                title: 'Link Type',
                name: 'linkType',
                type: 'string',
                options: {
                  list: [
                    { title: 'Normal', value: 'link' },
                    { title: 'Button: Primary', value: 'btnPrimary' },
                    { title: 'Button: Secondary', value: 'btnSecondary' },
                    {
                      title: 'Button: Primary Outline',
                      value: 'btnPrimaryOutline',
                    },
                    {
                      title: 'Button: Secondary Outline',
                      value: 'btnSecondaryOutline',
                    },
                  ],
                  layout: 'radio',
                },
              },
            ],
          },
          {
            title: 'Financing Application',
            name: 'financeApplication',
            type: 'object',
            fields: [
              {
                title: 'Link Type',
                name: 'linkType',
                type: 'string',
                options: {
                  list: [
                    { title: 'Normal', value: 'link' },
                    { title: 'Button: Primary', value: 'btnPrimary' },
                    { title: 'Button: Secondary', value: 'btnSecondary' },
                    {
                      title: 'Button: Primary Outline',
                      value: 'btnPrimaryOutline',
                    },
                    {
                      title: 'Button: Secondary Outline',
                      value: 'btnSecondaryOutline',
                    },
                  ],
                  layout: 'radio',
                },
              },
            ],
          },
        ],
      },
      // of: [{ type: 'phoneNumber' }],
    },
    {
      type: 'figure',
    },
    {
      type: 'video',
    },
    // {
    //   type: 'slideshow',
    // },
    {
      type: 'hero',
    },
    {
      type: 'heroEquipment',
    },
    {
      type: 'heroVideo',
    },
    {
      type: 'oneColumn',
    },
    {
      type: 'twoColumn',
    },
    {
      type: 'threeColumn',
    },
    {
      type: 'fourColumn',
    },
    {
      type: 'fiveColumn',
    },
    {
      type: 'equipmentGrid',
    },
    {
      type: 'inventoryCategoryGrid',
    },
    {
      type: 'inventoryCategoryAttachmentGrid',
    },
    {
      type: 'inventoryGrid',
    },
    {
      type: 'rentalGrid',
    },
    {
      type: 'inventoryList',
    },
    {
      type: 'videoGrid',
    },
    {
      type: 'blogGrid',
    },
    {
      type: 'equipmentHighlight',
    },
    {
      type: 'iFrame',
    },
    {
      type: 'jobListings',
    },
    {
      type: 'hubSpotForm',
    },
    {
      type: 'staffGrid',
    },
    {
      type: 'emailSubscribe',
    },
    {
      type: 'rentalHighlights',
    },
    { type: 'compareModelsBanner' },
    { type: 'financeApplicationForm' },
    { type: 'modal' },
    { type: 'accordion' },
  ],
})
