import { User } from 'lucide-react'
import { defineType } from 'sanity'

export default defineType({
  name: 'staff',
  title: 'Staff',
  type: 'document',
  icon: User,
  fields: [
    {
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'firstName',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
    },
    {
      name: 'phoneDirect',
      title: 'Direct Phone',
      type: 'string',
    },
    {
      name: 'phoneCell',
      title: 'Cell Phone',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'department',
      title: 'Department',
      type: 'reference',
      to: { type: 'department' },
    },
    {
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: { type: 'location' },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'hide',
      title: 'Hide',
      type: 'boolean',
      description: 'Hide this staff member from the website',
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'firstName',
      image: 'image',
      firstName: 'firstName',
      lastName: 'lastName',
      role: 'role',
      location: 'location.title',
    },
    prepare({ title = 'No Name', image, firstName, lastName, role, location }) {
      return {
        title: `${firstName} ${lastName}`,
        subtitle: `${location} | ${role}`,
        media: image,
      }
    },
  },
})
