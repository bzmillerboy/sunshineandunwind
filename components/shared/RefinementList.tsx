import { useRefinementList } from 'react-instantsearch'

import { Checkbox } from '@/components/ui/checkbox'

export default function RefinementList(props) {
  const { showCount = true, attribute } = props
  const {
    items,
    refine,
    canToggleShowMore,
    isShowingMore,
    hasExhaustiveItems,
    toggleShowMore,
  } = useRefinementList(props)

  return (
    <div className={`${items.length === 1 ? 'singleRefinement' : ''}`}>
      {items
        .sort((a, b) => a.label.localeCompare(b.label))
        .map((item) => (
          <div
            key={item.label}
            className="flex items-center space-x-2 mb-2 cursor-pointer h-8"
            data-insights-filter={`${attribute}:${item.value}`}
          >
            <Checkbox
              id={item.label}
              onCheckedChange={() => refine(item.value)}
              checked={item.isRefined}
            />
            <label
              htmlFor={item.label}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer capitalize"
            >
              {item.label}{' '}
              {showCount && (
                <span className="text-xs font-light text-gray-400">
                  ({item.count})
                </span>
              )}
            </label>
          </div>
        ))}
      {canToggleShowMore && (
        <button onClick={toggleShowMore} disabled={!canToggleShowMore}>
          {isShowingMore ? '- Less' : '+ More'}
        </button>
      )}
    </div>
  )
}
