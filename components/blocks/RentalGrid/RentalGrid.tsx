'use client'

import algoliasearch from 'algoliasearch/lite'
import { history } from 'instantsearch.js/es/lib/routers'
import { Fragment } from 'react'
import {
  Configure,
  InstantSearch,
  SearchBox,
  useInstantSearch,
} from 'react-instantsearch'

import EquipmentCard from '@/components/shared/EquipmentCard'
import EquipmentSearchResults from '@/components/shared/EquipmentSearchResults'
import RefinementList from '@/components/shared/RefinementList'
import RefinementListSheet from '@/components/shared/RefinementListSheet'
import { Lead } from '@/components/shared/Typography'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { titleDisplay, truncate } from '@/lib/utils'
import { extractPlainText, resolveHref } from '@/sanity/lib/utils'
import { RentalSizePayload } from '@/types'

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || '',
)

interface RentalGridProps {
  data: RentalSizePayload[]
  categoryId: string
  fallbackContent: any
}

const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || ''

export default function RentalGrid({ data, fallbackContent }: RentalGridProps) {
  // console.log('InventoryGrid data:', data)

  const routing = {
    router: history(),
    stateMapping: {
      stateToRoute(uiState) {
        // console.log('uiState:', uiState)
        const indexUiState = uiState[indexName]

        return {
          q: indexUiState.query,
          jobCategory: indexUiState.refinementList?.jobCategory,
          category: indexUiState.refinementList?.category,
        }
      },
      routeToState(routeState) {
        // if routeStage doesn't exist, don't set values otherwise refinements will initiate search results on page load
        if (
          Object.keys(routeState).length === 0 &&
          routeState.constructor === Object
        ) {
          return
        } else {
          return {
            [indexName]: {
              query: routeState.q,
              refinementList: {
                jobCategory: routeState.jobCategory,
                category: routeState.category,
              },
              page: routeState.page,
            },
          }
        }
      },
    },
  }

  const category = data[0]?.equipmentCategories?.title

  return (
    <>
      <div className="px-6 grid grid-cols-3 gap-6 md:grid-cols-4 md:gap-10">
        <InstantSearch
          searchClient={searchClient}
          indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || ''}
          routing={routing}
          future={{
            preserveSharedStateOnUnmount: true,
          }}
          insights={true}
        >
          {/* // TODO: add type:rentalComparableModel */}
          <Configure
            filters={`type:equipmentSubCategory`}
            hitsPerPage={20}
            clickAnalytics={true}
          />
          {/* Filter Section */}
          <div className=" row-span-1 col-span-3 md:col-span-1">
            <div className="mb-2 md:mb-6">
              <SearchBox
                placeholder="Search rental equipment"
                classNames={{
                  root: 'mb-4 md:mb-8',
                  form: 'relative ',
                  input:
                    'border border-gray-200 rounded-md shadow-md p-4 w-full h-full text-lg px-10 appearance-none focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-yellow-500 focus:border-transparent',
                  submit: 'absolute left-4 top-1/2 transform -translate-y-1/2',
                  submitIcon: 'text-slate-300 h-4 w-4 fill-current ',
                  reset: 'absolute right-4 top-1/2 transform -translate-y-1/2',
                  resetIcon: 'text-slate-300 h-4 w-4 fill-current ',
                }}
              />
              <RefinementListSheet>
                <RentalAccordion />
              </RefinementListSheet>
              <div className="hidden md:block">
                <RentalAccordion />
              </div>
            </div>
          </div>
          {/* Inventory List/Results */}
          <div className="row-span-1 col-span-3">
            {/* Results */}
            <EquipmentSearchResults />
            {/* Default list with no search query */}
            {data.length === 0 && (
              <div className="text-center">{fallbackContent}</div>
            )}
            <RentalItems data={data} />
          </div>
        </InstantSearch>
      </div>
    </>
  )
}

function RentalAccordion() {
  const { indexUiState } = useInstantSearch()
  // console.log('RentalAccordion indexUiState:', indexUiState)

  return (
    <Accordion type="multiple" defaultValue={['category', 'jobCategory']}>
      <AccordionItem value="jobCategory">
        <AccordionTrigger
          disabled={indexUiState?.refinementList?.jobCategory ? true : false}
        >
          Job Type
        </AccordionTrigger>
        <AccordionContent>
          <RefinementList
            attribute="jobCategory"
            limit={5}
            showMore={true}
            sortBy={['name:asc', 'count:desc']}
            showCount={false}
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="category">
        <AccordionTrigger
          disabled={indexUiState?.refinementList?.category ? true : false}
        >
          Category
        </AccordionTrigger>
        <AccordionContent>
          <RefinementList
            attribute="category"
            limit={10}
            showMore={true}
            sortBy={['name:asc', 'count:desc']}
            showCount={false}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

function RentalItems({ data }: any) {
  // console.log('RentalItems data:', data)
  const { indexUiState } = useInstantSearch()

  if (
    !indexUiState.query &&
    !indexUiState.refinementList &&
    !indexUiState.range
  ) {
    return (
      <div className="grid grid-cols-2 gap-4 lg:gap-8 xl:gap-10">
        {data?.map((item: any) => {
          const titleCompiled =
            titleDisplay(
              'equipmentSubCategory',
              item.make,
              item.year,
              item.model,
              item.title,
            ) || ''

          return (
            <Fragment key={item._id}>
              <EquipmentCard
                title={truncate(titleCompiled, 40) || ''}
                surtitle={
                  <Badge
                    variant="outline"
                    className="inline-block mb-2 capitalize"
                  >
                    Rental
                  </Badge>
                }
                subtitle={
                  <>
                    <Lead className="text-sm lg:text-sm inline-block mb-2">
                      {item.equipmentCategories?.title}
                    </Lead>
                  </>
                }
                image={item.mainImage}
                buttonText={
                  <>
                    View
                    <span className="hidden md:inline-block ml-2">Rental</span>
                  </>
                }
                link={
                  resolveHref(
                    'rentals',
                    item?.slug,
                    '',
                    item?.equipmentCategories?.slug,
                  ) || ''
                }
                hours={item.hours}
                price={item.price}
                brand={item.equipmentMake?.name}
                model={item.model}
                year={item.year}
                description={truncate(extractPlainText(item.highlights), 140)}
              />
            </Fragment>
          )
        })}
      </div>
    )
  }

  return
}
