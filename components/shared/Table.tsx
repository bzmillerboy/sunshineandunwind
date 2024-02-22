import { cn } from '@/lib/utils'

interface TableProps {
  firstRowIsHeading: boolean
  table: {
    rows: [
      {
        cells: [string]
      },
    ]
  }
  fullWidth: boolean
}

function Table({
  firstRowIsHeading,
  table = {
    rows: [
      {
        cells: [''],
      },
    ],
  },
  fullWidth = false,
}: TableProps) {
  // console.log('Table props:', props)

  const heading = firstRowIsHeading && table.rows[0]

  const rowsValues = firstRowIsHeading ? table.rows.slice(1) : table.rows

  return (
    <div
      className={cn({ 'w-full': fullWidth }, { container: !fullWidth }, 'mb-8')}
    >
      <table className={cn({ 'w-full': fullWidth })}>
        {firstRowIsHeading && (
          <thead className="bg-white border-b">
            <tr>
              {heading &&
                heading.cells.map((cell) => (
                  <th
                    key={`th-${cell}`}
                    className=" text-sm font-medium text-zinc-900 px-6 py-4 text-left"
                  >
                    {cell}
                  </th>
                ))}
            </tr>
          </thead>
        )}
        <tbody className="[&>*:nth-child(odd)]:bg-gray-100">
          {rowsValues &&
            rowsValues.length > 0 &&
            rowsValues.map((row, index) => (
              <tr key={index} className="bg-white border-b ">
                {row.cells.map((cell, index) => {
                  return (
                    <td
                      key={`td-${cell}`}
                      className="text-sm text-gray-900 font-light px-6 py-4 "
                    >
                      {cell}
                    </td>
                  )
                })}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
