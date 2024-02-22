import { defineType } from 'sanity'

export default defineType({
  name: 'modelSpecContent',
  title: 'Model Spec Content',
  type: 'object',
  fields: [
    {
      title: 'Spec Name',
      name: 'specName',
      type: 'reference',
      to: { type: 'specifications' },
      //TODO: Add filter to only show specs that are not already in the modelSpecs array
      // options: {
      //   filter: ({ document }) => {
      //     const existingReferences = document.specifications
      //       .map((item) => item?.specName?._ref)
      //       .filter(Boolean)
      //     return {
      //       filter: '!(_id in $existingReferences)',
      //       params: {
      //         existingReferences,
      //       },
      //     }
      //   },
      // },
    },
    {
      name: 'specValue',
      title: 'Spec Value',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'specName.name',
      value: 'specValue',
    },
    prepare({ title = 'No name', value = 'No value' }) {
      return {
        title: title,
        subtitle: value,
      }
    },
  },
})
