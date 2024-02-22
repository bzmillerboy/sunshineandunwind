import { map, Observable } from 'rxjs'
import {
  DocumentLocationResolver,
  DocumentLocationsState,
} from 'sanity/presentation'

import { resolveHref } from '@/sanity/lib/utils'

export const locate: DocumentLocationResolver = (params, context) => {
  if (params.type === 'siteSettings' || params.type === 'companyInfo') {
    return {
      message: 'This document is used on all pages',
      tone: 'caution',
    } satisfies DocumentLocationsState
  }

  if (
    params.type === 'page' ||
    params.type === 'post' ||
    params.type === 'videoPost' ||
    params.type === 'equipmentCategory' ||
    params.type === 'inventory' ||
    params.type === 'models'
  ) {
    const doc$ = context.documentStore.listenQuery(
      `*[_id==$id || references($id)]{_type,slug,title,equipmentCategories->{slug},equipmentMake->{slug}}`,
      params,
      { perspective: 'previewDrafts' },
    ) as Observable<
      | {
          _type: string
          slug: { current: string }
          title: string | null
          equipmentCategories: { slug: { current: string } }
          equipmentMake: { slug: { current: string } }
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
          case 'videoPost':
            return {
              locations: docs
                ?.map((doc) => {
                  const href = resolveHref(doc?._type, doc?.slug?.current)
                  return {
                    title: doc?.title || 'Untitled',
                    href: href!,
                  }
                })
                .filter((doc) => doc.href !== undefined),
              tone: 'positive', //isReferencedBySettings ? 'positive' : 'critical',
              message: 'This document publishes a page at the URL below',
              // isReferencedBySettings
              //   ? 'The top menu is linking to this page'
              //   : "The top menu isn't linking to this page. It can still be accessed if the visitor knows the URL.",
            } satisfies DocumentLocationsState
          case 'models':
            return {
              locations: docs
                ?.map((doc) => {
                  const href = resolveHref(
                    doc._type,
                    doc?.slug?.current,
                    doc?.equipmentMake?.slug?.current,
                    doc?.equipmentCategories?.slug?.current,
                  )
                  return {
                    title: doc?.title || 'Untitled',
                    href: href!,
                  }
                })
                .filter((doc) => doc.href !== undefined),
              tone: 'positive', //isReferencedBySettings ? 'positive' : 'critical',
              message: 'This document publishes a page at the URL below',
              // isReferencedBySettings
              //   ? 'The top menu is linking to this page'
              //   : "The top menu isn't linking to this page. It can still be accessed if the visitor knows the URL.",
            } satisfies DocumentLocationsState
          case 'inventory':
            return {
              locations: docs
                ?.map((doc) => {
                  const href = resolveHref(
                    doc._type,
                    doc?.slug?.current,
                    '',
                    doc?.equipmentCategories?.slug?.current,
                  )
                  return {
                    title: doc?.title || 'Untitled',
                    href: href!,
                  }
                })
                .filter((doc) => doc.href !== undefined),
              tone: 'positive', //isReferencedBySettings ? 'positive' : 'critical',
              message: 'This document publishes a page at the URL below',
              // isReferencedBySettings
              //   ? 'The top menu is linking to this page'
              //   : "The top menu isn't linking to this page. It can still be accessed if the visitor knows the URL.",
            } satisfies DocumentLocationsState
          case 'equipmentCategory':
            return {
              locations: docs
                ?.filter((doc) => doc._type === 'equipmentCategory')
                ?.map((doc) => {
                  const href = resolveHref(doc._type, doc?.slug?.current)
                  const obj = {
                    title: doc?.title || 'Untitled',
                    href: href!,
                  }
                  return obj
                })
                .filter((doc) => doc.href !== undefined),
              tone: 'positive', //isReferencedBySettings ? 'positive' : 'critical',
              message:
                'This document publishes a page at the URL below. It is also referenced by other pages such as inventory and model pages.',
            } satisfies DocumentLocationsState
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
