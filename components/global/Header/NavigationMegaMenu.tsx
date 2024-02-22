'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { IoMdSearch } from 'react-icons/io'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

export default function NavigationMegaMenu({
  menuItems,
  megaMenuComponents,
}: {
  menuItems: any
  megaMenuComponents: any
}) {
  const [value, setValue] = React.useState('')
  const pathName = usePathname()

  React.useEffect(() => {
    setValue('')
  }, [pathName])

  return (
    <NavigationMenu
      value={value}
      // value={'/equipment'}
      onValueChange={setValue}
      className="hidden lg:block"
    >
      <NavigationMenuList>
        {menuItems
          .filter((i) => !i.mobileOnly)
          .map((item, index) => {
            const megaMenuComponent =
              megaMenuComponents &&
              megaMenuComponents.find((c) => c.blockSlug === item.blockSlug)
                ?.component

            if (item.hasMegaMenu) {
              return (
                <NavigationMenuItem key={item.slug} value={item.slug}>
                  <Link href={item.slug} legacyBehavior passHref>
                    <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                  </Link>
                  <NavigationMenuContent>
                    {megaMenuComponent}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )
            } else {
              return (
                <NavigationMenuItem key={item.slug}>
                  <Link href={item.slug} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {item.title === 'Search' ? (
                        <IoMdSearch size={'1.3em'} />
                      ) : (
                        item.title
                      )}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )
            }
          })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
