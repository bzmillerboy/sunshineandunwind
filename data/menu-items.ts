export const menuItems: {
  slug: string
  title: string
  blockSlug: string
  hasMegaMenu: boolean
  mobileOnly?: boolean
  icon?: JSX.Element
}[] = [
  {
    slug: '/equipment',
    title: 'Equipment',
    blockSlug: 'nav-equipment',
    hasMegaMenu: true,
  },
  {
    slug: '/rentals',
    title: 'Rentals',
    blockSlug: 'nav-rental',
    hasMegaMenu: false,
  },
  {
    slug: '/attachments',
    title: 'Attachments',
    blockSlug: 'nav-attachments',
    hasMegaMenu: false,
    mobileOnly: true,
  },
  {
    slug: '/brands',
    title: 'Brands',
    blockSlug: 'nav-brands',
    hasMegaMenu: true,
  },
  {
    slug: '/services',
    title: 'Service',
    blockSlug: 'nav-parts-service',
    hasMegaMenu: true,
  },
  {
    slug: '/financing',
    title: 'Financing',
    blockSlug: 'nav-financing',
    hasMegaMenu: false,
  },
  {
    slug: '/media',
    title: 'Media',
    blockSlug: 'nav-media',
    hasMegaMenu: true,
  },
  {
    slug: '/search',
    title: 'Search',
    blockSlug: 'nav-search',
    hasMegaMenu: false,
  },
]
