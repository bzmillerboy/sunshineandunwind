'use client'

import { InfiniteHits, useInstantSearch, useStats } from 'react-instantsearch'
import { Highlight } from 'react-instantsearch'

import EquipmentCard from '@/components/shared/EquipmentCard'
import FacetMenu from '@/components/shared/FacetMenu'
import InventoryCurrentRefinements from '@/components/shared/InventoryCurrentRefinements'
import { H4, H5, Lead, List, P } from '@/components/shared/Typography'
import { Badge } from '@/components/ui/badge'
import { truncate } from '@/lib/utils'
import { titleDisplay } from '@/lib/utils'
import { resolveHref } from '@/sanity/lib/utils'

function buttonText(type: string) {
  switch (type) {
    case 'equipmentComparableModel':
      return 'View Rental'
    case 'equipmentCategory':
      return 'View Inventory'
    case 'equipmentSubCategory':
      return 'View Rental'
    case 'models':
      return 'View Model'
    case 'inventory':
      return 'View Listing'
    case 'post':
      return 'View Post'
    case 'videoPost':
      return 'Watch Video'
    case 'page':
      return 'View Page'
    default:
      return 'View Details'
  }
}
function secondaryButtonText(type: string) {
  switch (type) {
    case 'equipmentComparableModel':
      return 'View Rental'
    case 'equipmentCategory':
      return 'View Rentals'
    case 'equipmentSubCategory':
      return 'View Rental'
    case 'models':
      return 'View Model'
    case 'inventory':
      return 'View Listing'
    case 'post':
      return 'View Post'
    case 'videoPost':
      return 'Watch Video'
    case 'page':
      return 'View Page'
    default:
      return 'View Details'
  }
}
function typeValue(type: string, condition?: string) {
  switch (type) {
    case 'equipmentSubCategory':
      return 'Rental'
    case 'models':
      return 'Model'
    case 'inventory':
      return condition
    case 'post':
      return 'News'
    case 'videoPost':
      return 'Video'
    case 'page':
      return 'Page'
    default:
      return 'View Details'
  }
}

function Hit({ hit }) {
  // console.log('Hit hit:', hit)
  const {
    recordID,
    title,
    category,
    categories,
    categorySlug,
    categoryType,
    condition,
    stockNumber,
    imageRef,
    slug,
    hoursCurrent,
    price,
    make,
    makeSlug,
    model,
    year,
    type,
    body,
    highlights,
    rentalAvailable,
  } = hit

  if (type === 'equipmentCategory') {
    return (
      <div
        key={recordID}
        data-insights-object-id={hit.objectID}
        data-insights-position={hit.__position}
        data-insights-query-id={hit.__queryID}
      >
        <EquipmentCard
          title={truncate(title, 40) || ''}
          surtitle={
            <Badge variant="outline" className="inline-block mb-2 capitalize">
              Category
            </Badge>
          }
          image={{ asset: { _ref: imageRef, _type: 'reference' } }}
          link={resolveHref(type, slug, makeSlug, categorySlug) || '/'}
          hit={hit}
          description={truncate(body, 140)}
        />
      </div>
    )
  } else if (type === 'equipmentComparableModel') {
    return (
      <div
        key={recordID}
        data-insights-object-id={hit.objectID}
        data-insights-position={hit.__position}
        data-insights-query-id={hit.__queryID}
      >
        <EquipmentCard
          title={categories[0]?.title || 'Category'}
          surtitle={
            <Badge variant="outline" className="inline-block mb-2 capitalize">
              Rental
            </Badge>
          }
          subtitle={
            <Lead className="lg:text-sm mb-2 inline-block">
              {`Compare To: ${title}`}
            </Lead>
          }
          image={{ asset: { _ref: imageRef, _type: 'reference' } }}
          imageAlt={title}
          buttonText={buttonText(type) || 'View Details'}
          link={
            resolveHref(
              'rentals',
              categories[0]?.slug,
              '',
              categories[0]?.categorySlug,
            ) || '/'
          }
          hit={hit}
          description={truncate(body, 140)}
        />
      </div>
    )
  } else if (type === 'equipmentSubCategory') {
    {
      return (
        <div
          key={recordID}
          data-insights-object-id={hit.objectID}
          data-insights-position={hit.__position}
          data-insights-query-id={hit.__queryID}
        >
          <EquipmentCard
            title={truncate(title, 40) || ''}
            surtitle={
              <Badge variant="outline" className="inline-block mb-2 capitalize">
                {typeValue(type)}
              </Badge>
            }
            subtitle={
              <>
                <Lead className="lg:text-sm mb-2 inline-block">{category}</Lead>
              </>
            }
            image={{ asset: { _ref: imageRef, _type: 'reference' } }}
            imageAlt={title}
            buttonText={buttonText(type) || 'View Details'}
            link={resolveHref(type, slug, makeSlug, categorySlug) || '/'}
            hours={hoursCurrent}
            price={price}
            brand={make}
            model={model}
            year={year}
            hit={hit}
            description={truncate(highlights, 140)}
          />
        </div>
      )
    }
  } else if (type === 'page') {
    return (
      <div
        key={recordID}
        data-insights-object-id={hit.objectID}
        data-insights-position={hit.__position}
        data-insights-query-id={hit.__queryID}
      >
        <EquipmentCard
          title={truncate(title, 40) || ''}
          surtitle={
            <Badge variant="outline" className="inline-block mb-2 capitalize">
              {typeValue(type, condition)}
            </Badge>
          }
          image={{ asset: { _ref: imageRef, _type: 'reference' } }}
          imageAlt={title}
          buttonText={buttonText(type) || 'View Details'}
          link={resolveHref(type, slug, makeSlug, categorySlug) || '/'}
          hours={hoursCurrent}
          price={price}
          brand={make}
          model={model}
          year={year}
          hit={hit}
          description={truncate(body, 140)}
        />
      </div>
    )
  } else if (type === 'models') {
    const titleCompiled = titleDisplay('models', make, year, model, title) || ''
    return (
      <div
        key={recordID}
        data-insights-object-id={hit.objectID}
        data-insights-position={hit.__position}
        data-insights-query-id={hit.__queryID}
      >
        <EquipmentCard
          title={truncate(titleCompiled, 40) || ''}
          surtitle={
            <Badge variant="outline" className="inline-block mb-2 capitalize">
              {typeValue(type, condition)}
            </Badge>
          }
          image={{ asset: { _ref: imageRef, _type: 'reference' } }}
          imageAlt={title}
          buttonText={buttonText(type) || 'View Details'}
          link={resolveHref(type, slug, makeSlug, categorySlug) || '/'}
          hours={hoursCurrent}
          price={price}
          brand={make}
          model={model}
          year={year}
          hit={hit}
          description={truncate(body, 140)}
        />
      </div>
    )
  } else if (type === 'post') {
    return (
      <div
        key={recordID}
        data-insights-object-id={hit.objectID}
        data-insights-position={hit.__position}
        data-insights-query-id={hit.__queryID}
      >
        <EquipmentCard
          title={truncate(title, 40) || ''}
          surtitle={
            <Badge variant="outline" className="inline-block mb-2 capitalize">
              {typeValue(type, condition)}
            </Badge>
          }
          image={{ asset: { _ref: imageRef, _type: 'reference' } }}
          imageAlt={title}
          buttonText={buttonText(type) || 'View Details'}
          link={resolveHref(type, slug, makeSlug, categorySlug) || '/'}
          hours={hoursCurrent}
          price={price}
          brand={make}
          model={model}
          year={year}
          hit={hit}
          description={truncate(body, 140)}
        />
      </div>
    )
  } else if (type === 'videoPost') {
    return (
      <div
        key={recordID}
        data-insights-object-id={hit.objectID}
        data-insights-position={hit.__position}
        data-insights-query-id={hit.__queryID}
      >
        <EquipmentCard
          title={truncate(title, 40) || ''}
          surtitle={
            <Badge variant="outline" className="inline-block mb-2 capitalize">
              {typeValue(type, condition)}
            </Badge>
          }
          image={{ asset: { _ref: imageRef, _type: 'reference' } }}
          imageAlt={title}
          buttonText={buttonText(type) || 'View Details'}
          link={resolveHref(type, slug, makeSlug, categorySlug) || '/'}
          hours={hoursCurrent}
          price={price}
          brand={make}
          model={model}
          year={year}
          hit={hit}
          description={truncate(body, 140)}
        />
      </div>
    )
  } else {
    return (
      <div
        key={recordID}
        data-insights-object-id={hit.objectID}
        data-insights-position={hit.__position}
        data-insights-query-id={hit.__queryID}
      >
        <EquipmentCard
          title={<Highlight attribute="title" hit={hit} />}
          surtitle={
            <Badge variant="outline" className="inline-block mb-2 capitalize">
              {typeValue(type, condition)}
            </Badge>
          }
          subtitle={
            <>
              <Lead className="text-sm lg:text-sm mb-2 inline-block">
                <Highlight attribute="stockNumber" hit={hit} />
              </Lead>
            </>
          }
          image={{ asset: { _ref: imageRef, _type: 'reference' } }}
          imageAlt={title}
          // buttonText={buttonText(type) || 'View Details'}
          buttonText={<span>View</span>}
          link={resolveHref(type, slug, makeSlug, categorySlug) || '/'}
          hours={hoursCurrent}
          price={price}
          brand={make}
          model={model}
          year={year}
          hit={hit}
          description={truncate(body, 140)}
        />
      </div>
    )
  }
}

export default function EquipmentSearchResults({ displayFacetMenu = false }) {
  const { indexUiState } = useInstantSearch()
  const { nbHits } = useStats()

  if (
    !indexUiState.query &&
    !indexUiState.refinementList &&
    !indexUiState.range
  ) {
    return null
  }

  return (
    <>
      {displayFacetMenu && <FacetMenu attribute="typeName" />}
      <H4>{nbHits} Results:</H4>
      {nbHits === 0 && (
        <p>
          No results were found for <em>&quot;{indexUiState.query}&quot;</em>.
        </p>
      )}

      <InventoryCurrentRefinements />
      <InfiniteHits
        hitComponent={Hit}
        showPrevious={false}
        classNames={{
          root: 'mb-12',
          list: 'grid grid-cols-2 gap-4 lg:gap-8 xl:gap-10 mb-12',
          loadMore:
            'disabled:hidden block items-center justify-center uppercase whitespace-nowrap rounded-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-2 border-foreground bg-transparent text-foreground hover:border-foreground/80 hover:text-foreground/80 h-12 rounded-md px-5 mx-auto',
        }}
      />
    </>
  )
}
