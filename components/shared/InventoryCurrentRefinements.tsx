import React from 'react'
import { MdClose } from 'react-icons/md'
import {
  useCurrentRefinements,
  UseCurrentRefinementsProps,
} from 'react-instantsearch'

import RefinementsClear from '@/components/shared/RefinementsClear'
import { Button } from '@/components/ui/button'
import { currencyFormatter } from '@/lib/utils'

export default function InventoryCurrentRefinements(
  props: UseCurrentRefinementsProps,
) {
  const { items, refine } = useCurrentRefinements(props)

  return (
    <ul className="mb-3">
      {items.map((item) => (
        <li
          className="inline-block"
          key={[item.indexName, item.label].join('/')}
        >
          {item.refinements.map((refinement) => (
            <Button
              key={refinement.label}
              className="ml-2 mb-2 uppercase"
              size="xs"
              variant="secondary"
              onClick={(event) => {
                if (isModifierClick(event)) {
                  return
                }

                refine(refinement)
              }}
            >
              {refinementLabel(refinement)} <MdClose className="ml-2 h-4 w-4" />
            </Button>
          ))}
        </li>
      ))}
      <RefinementsClear />
    </ul>
  )
}

function refinementLabel(refinement) {
  if (refinement.attribute === 'price' && refinement.operator === '>=') {
    return `${currencyFormatter(refinement.value)} or more`
  } else if (refinement.attribute === 'price' && refinement.operator === '<=') {
    return `${currencyFormatter(refinement.value)} or less`
  } else if (
    refinement.attribute === 'hoursCurrent' &&
    refinement.operator === '>='
  ) {
    return `${refinement.value} hours or less`
  } else if (
    refinement.attribute === 'hoursCurrent' &&
    refinement.operator === '<='
  ) {
    return `${refinement.value} hours or more`
  }
  return refinement.label
}

function isModifierClick(event: React.MouseEvent) {
  const isMiddleClick = event.button === 1

  return Boolean(
    isMiddleClick ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey,
  )
}
