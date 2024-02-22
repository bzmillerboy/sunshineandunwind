import React from 'react'
import { MdClose } from 'react-icons/md'
import {
  useClearRefinements,
  UseClearRefinementsProps,
} from 'react-instantsearch'

import { Button } from '@/components/ui/button'

export default function RefinementsClear(props: UseClearRefinementsProps) {
  const { canRefine, refine } = useClearRefinements(props)

  return (
    <Button
      disabled={!canRefine}
      className="disabled:hidden ml-2 mb-2"
      size="xs"
      variant="secondary"
      onClick={refine}
    >
      Clear All
    </Button>
  )
}
