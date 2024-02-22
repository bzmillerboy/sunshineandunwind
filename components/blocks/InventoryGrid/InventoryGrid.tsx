'use client'

import algoliasearch from 'algoliasearch/lite'
import { history } from 'instantsearch.js/es/lib/routers'
import { notFound } from 'next/navigation'
import {
  Configure,
  InstantSearch,
  SearchBox,
  useInstantSearch,
} from 'react-instantsearch'

import EquipmentSearchResults from '@/components/shared/EquipmentSearchResults'
import RefinementList from '@/components/shared/RefinementList'
import RefinementListSheet from '@/components/shared/RefinementListSheet'
import RefinementRange from '@/components/shared/RefinementRange'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { InventoryPayload } from '@/types'

import InventoryItems from './InventoryItems'

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || '',
)

interface InventoryGridProps {
  inventory: InventoryPayload[] | null
  categoryId?: string
}

const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || ''

export default function InventoryGrid({
  inventory,
  categoryId,
}: InventoryGridProps) {
  // console.log('InventoryGrid inventory:', inventory)

  if (!inventory) {
    notFound()
  }

  const routing = {
    router: history(),
    stateMapping: {
      stateToRoute(uiState) {
        const indexUiState = uiState[indexName]
        // console.log('InventoryGrid indexUiState:', indexUiState)
        return {
          q: indexUiState.query,
          make:
            indexUiState.refinementList && indexUiState.refinementList?.make,
          model: indexUiState.refinementList?.model,
          year: indexUiState.refinementList?.year,
          price: indexUiState.range?.price,
          hours: indexUiState.range?.hoursCurrent,
          page: indexUiState.page,
        }
      },
      routeToState(routeState) {
        if (
          Object.keys(routeState).length === 0 &&
          routeState.constructor === Object
        ) {
          return
        } else {
          const key = Object.keys(routeState)[0] // Define key from routeState
          const updatedRouteState = {
            ...routeState,
            [key]: Array.isArray(routeState[key])
              ? routeState[key]
              : [routeState[key]],
          }

          return {
            [indexName]: {
              query: updatedRouteState.q,
              refinementList: {
                make: updatedRouteState.make,
                model: updatedRouteState.model,
                year: updatedRouteState.year,
              },
              range: {
                price: updatedRouteState.price,
                hoursCurrent: updatedRouteState.hours,
              },
              page: updatedRouteState.page,
            },
          }
        }
      },
    },
  }

  //TODO: update this to slug
  const category = inventory[0]?.equipmentCategories?.title

  return (
    <>
      <div className="container grid grid-cols-3 gap-6 md:grid-cols-4 md:gap-10">
        <InstantSearch
          searchClient={searchClient}
          indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || ''}
          routing={routing}
          future={{
            preserveSharedStateOnUnmount: true,
          }}
          insights={true}
        >
          <Configure
            filters={`type:inventory AND category:"${category}" AND isAvailable:true`}
            hitsPerPage={20}
            clickAnalytics={true}
          />

          {/* Filter Section */}
          <div className=" row-span-1 col-span-3 md:col-span-1">
            <div className="mb-2 md:mb-6">
              <SearchBox
                placeholder="Search inventory"
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
                <InventoryAccordion />
              </RefinementListSheet>
              <div className="hidden md:block">
                <InventoryAccordion />
              </div>
            </div>
          </div>
          {/* Inventory List/Results */}
          <div className="row-span-1 col-span-3">
            {/* Results */}
            <EquipmentSearchResults />
            {/* Default list with no search query */}
            <InventoryItems data={inventory} categoryId={categoryId} />
          </div>
        </InstantSearch>
      </div>
    </>
  )
}

function InventoryAccordion() {
  const { indexUiState } = useInstantSearch()
  // console.log('InventoryAccordion indexUiState:', indexUiState)

  return (
    <Accordion
      type="multiple"
      defaultValue={['models', 'make', 'year', 'price', 'hours', 'condition']}
    >
      <AccordionItem
        value="condition"
        className="has-[div.singleRefinement]:hidden"
      >
        <AccordionTrigger
          disabled={indexUiState?.refinementList?.condition ? true : false}
        >
          Condition
        </AccordionTrigger>
        <AccordionContent>
          <RefinementList
            attribute="condition"
            sortBy={['name:asc', 'count:desc']}
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="make" className="has-[div.singleRefinement]:hidden">
        <AccordionTrigger
          disabled={indexUiState?.refinementList?.make ? true : false}
        >
          Manufacturer
        </AccordionTrigger>
        <AccordionContent>
          <RefinementList
            attribute="make"
            limit={5}
            showMore={true}
            sortBy={['name:asc', 'count:desc']}
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="models"
        className="has-[div.singleRefinement]:hidden"
      >
        <AccordionTrigger
          disabled={indexUiState?.refinementList?.model ? true : false}
        >
          Models
        </AccordionTrigger>
        <AccordionContent>
          <RefinementList
            attribute="model"
            limit={5}
            showMore={true}
            sortBy={['name:asc', 'count:desc']}
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="year" className="has-[div.singleRefinement]:hidden">
        <AccordionTrigger
          disabled={indexUiState?.refinementList?.year ? true : false}
        >
          Year
        </AccordionTrigger>

        <AccordionContent>
          <RefinementList
            attribute="year"
            limit={5}
            showMore={true}
            sortBy={['name:desc']}
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="price">
        <AccordionTrigger disabled={indexUiState?.range?.price ? true : false}>
          Price
        </AccordionTrigger>
        <AccordionContent>
          <RefinementRange attribute="price" currency={true} step={1000} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="hours">
        <AccordionTrigger
          disabled={indexUiState?.range?.hoursCurrent ? true : false}
        >
          Hours
        </AccordionTrigger>
        <AccordionContent>
          <RefinementRange attribute="hoursCurrent" step={100} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
