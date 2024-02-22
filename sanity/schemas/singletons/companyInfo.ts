import { Building } from 'lucide-react'
import { defineType } from 'sanity'

export default defineType({
  name: 'companyInfo',
  title: 'Company Info',
  type: 'document',
  icon: Building,
  fields: [
    {
      name: 'name',
      title: 'Company name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'email',
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'address1',
      title: 'Address 1',
      type: 'string',
    },
    {
      name: 'address2',
      title: 'Address 2',
      type: 'string',
    },
    {
      name: 'zipCode',
      title: 'ZIP Code',
      type: 'string',
    },
    {
      name: 'city',
      title: 'City',
      type: 'string',
    },
    {
      name: 'state',
      title: 'State',
      type: 'string',
      description: 'As a two letter abbreviation (e.g. KY)',
    },
    {
      name: 'country',
      title: 'Country',
      type: 'string',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'mainImage',
    },
    {
      name: 'descriptionBlock',
      title: 'Description',
      type: 'blockText',
    },
    {
      name: 'socialLinkGoogle',
      title: 'Social Link: Google Business',
      type: 'string',
    },
    {
      name: 'socialLinkFacebook',
      title: 'Social Link: Facebook',
      type: 'string',
    },
    {
      name: 'socialLinkInstagram',
      title: 'Social Link: Instagram',
      type: 'string',
    },
    {
      name: 'socialLinkYoutube',
      title: 'Social Link: YouTube',
      type: 'string',
    },
    {
      name: 'socialLinkTwitter',
      title: 'Social Link: Twitter',
      type: 'string',
    },
    {
      name: 'socialLinkLinkedin',
      title: 'Social Link: LinkedIn',
      type: 'string',
    },
  ],
})
