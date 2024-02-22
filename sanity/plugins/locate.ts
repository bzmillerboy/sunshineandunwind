import { map, Observable } from 'rxjs'
import {
  DocumentLocationResolver,
  DocumentLocationsState,
} from 'sanity/presentation'

import { resolveHref } from '@/sanity/lib/utils'

export const locate: DocumentLocationResolver = (params, context) => {
  if (params.type === 'siteSettings') {
    return {
      message: 'This document is used on all pages',
      tone: 'caution',
    } satisfies DocumentLocationsState
  }

  if (params.type === 'page' || params.type === 'post') {
    const doc$ = context.documentStore.listenQuery(
      `*[_id==$id || references($id)]{_type,slug,title,equipmentCategories->{slug},equipmentMake->{slug}}`,
      params,
      { perspective: 'previewDrafts' },
    ) as Observable<
      | {
          _type: string
          slug: { current: string }
          title: string | null
        }[]
      | null
    >
    return doc$.pipe(
      map((docs) => {
        const isReferencedBySettings = docs?.some(
          (doc) => doc._type === 'settings',
        )
        switch (params.type) {
          case 'page':
          case 'post':
          default:
            return {
              message: 'Unable to map document type to locations',
              tone: 'critical',
            } satisfies DocumentLocationsState
        }
      }),
    )
  }

  return null
}
