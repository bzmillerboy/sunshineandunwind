import { Fragment } from 'react'

import CardSimple from '@/components/shared/CardSimple'

export default function RentalComparableModels({ comparableModels }) {
  return (
    <div className="flex flex-wrap justify-center">
      {comparableModels.map((model) => {
        return (
          <Fragment key={model._id}>
            <CardSimple image={model.mainImage} title={model.title} />
          </Fragment>
        )
      })}
    </div>
  )
}
