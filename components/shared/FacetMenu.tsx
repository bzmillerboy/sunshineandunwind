import * as React from 'react'
import {
  useClearRefinements,
  useInstantSearch,
  useMenu,
} from 'react-instantsearch'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

export default function FacetMenu(props) {
  const { refine } = useMenu(props)
  const { refine: clearRefine, createURL } = useClearRefinements(props)
  const { indexUiState } = useInstantSearch()
  const [value, setValue] = React.useState(indexUiState.menu?.typeName || 'All')

  return (
    <div className="max-w-xl m-auto">
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(value) => {
          if (value === 'All') {
            setValue(value)
            clearRefine()
          } else if (value) {
            setValue(value)
            refine(value)
          }
        }}
      >
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-1 p-2 mb-1">
            <ToggleGroupItem key="all" value="All">
              All
            </ToggleGroupItem>
            <ToggleGroupItem key="equipmentCategory" value="Equipment Category">
              Equipment Category
            </ToggleGroupItem>
            <ToggleGroupItem key="inventory" value="Inventory">
              Inventory
            </ToggleGroupItem>
            <ToggleGroupItem key="model" value="Model">
              Model
            </ToggleGroupItem>
            <ToggleGroupItem key="page" value="Page">
              Page
            </ToggleGroupItem>
            <ToggleGroupItem key="post" value="Post">
              News
            </ToggleGroupItem>
            <ToggleGroupItem key="video" value="Video">
              Video
            </ToggleGroupItem>
            <ToggleGroupItem key="rental" value="Rental">
              Rental
            </ToggleGroupItem>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </ToggleGroup>
    </div>
  )
}
