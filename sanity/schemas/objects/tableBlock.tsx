import { FiGrid } from 'react-icons/fi'
// import TablePreview from "../components/TablePreview";

const grayBackgroundRender = (props) => (
  <div style={{ backgroundColor: '#cccccc', padding: '1rem' }}>
    {props.children}
  </div>
)

import { defineType } from 'sanity'

export default defineType({
  name: 'tableBlock',
  title: 'Table',
  type: 'object',
  icon: FiGrid,
  fields: [
    {
      name: 'table',
      title: 'Table',
      type: 'table',
      options: {
        initialRows: 2,
        initialColumns: 2,
      },
    },
    {
      name: 'firstRowIsHeading',
      title: 'Make the first row a heading',
      type: 'boolean',
    },
    {
      name: 'fullWidth',
      title: 'Full width?',
      type: 'boolean',
    },
  ],
  preview: {
    select: {
      title: 'table.rows[0].cells[0]',
      image: 'mainImage',
      rows: 'table.rows',
    },
    prepare({ title = 'No title', image, rows }) {
      return {
        title: `Table`,
        subtitle: title,
        media: image,
        // extendedPreview: <TablePreview rows={rows || []} />
      }
    },
  },
})
