'use client'

import algoliasearch from 'algoliasearch/lite'
import { history } from 'instantsearch.js/es/lib/routers'
import { Configure, InstantSearch, SearchBox } from 'react-instantsearch'

import EquipmentSearchResults from '@/components/shared/EquipmentSearchResults'

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || '',
)

const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || ''

export default function Search({ content }) {
  // console.log('InventoryGrid data:', data)

  const routing = {
    router: history(),
    stateMapping: {
      stateToRoute(uiState) {
        const indexUiState = uiState[indexName]
        // console.log('indexUiState:', indexUiState)
        return {
          q: indexUiState.query,
          typeName: indexUiState.menu?.typeName,
          page: indexUiState.page,
        }
      },
      routeToState(routeState) {
        // console.log('routeState:', routeState)
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
              menu: {
                typeName: routeState.typeName,
              },
              page: routeState.page,
            },
          }
        }
      },
    },
  }

  return (
    <>
      <div className="container mt-12">
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
            hitsPerPage={20}
            clickAnalytics={true}
            filters={`isAvailable:true`}
          />
          {/* Filter Section */}
          <div className=" row-span-1 col-span-3 md:col-span-1">
            <div className="mb-2 md:mb-3 max-w-xl mx-auto">
              <SearchBox
                placeholder="Search..."
                autoFocus={true}
                classNames={{
                  form: 'relative ',
                  input:
                    'border border-gray-200 rounded-md shadow-md p-4 w-full h-full text-lg px-10 appearance-none focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-yellow-500 focus:border-transparent',
                  submit: 'absolute left-4 top-1/2 transform -translate-y-1/2',
                  submitIcon: 'text-slate-300 h-4 w-4 fill-current ',
                  reset: 'absolute right-4 top-1/2 transform -translate-y-1/2',
                  resetIcon: 'text-slate-300 h-4 w-4 fill-current ',
                }}
              />
            </div>
          </div>
          {/* Inventory List/Results */}
          <div className="row-span-1 col-span-3">
            {/* Results */}
            <EquipmentSearchResults displayFacetMenu={true} />
            <div className="max-w-xl mx-auto mt-12">{content}</div>
          </div>
        </InstantSearch>
      </div>
    </>
  )
}
