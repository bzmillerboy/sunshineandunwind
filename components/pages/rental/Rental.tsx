import Link from 'next/link'
import { MdShoppingCart } from 'react-icons/md'
import { MdChevronRight } from 'react-icons/md'

import RentalAdditionalSizes from '@/components/pages/rental/RentalAdditionalSizes'
import RentalComparableModels from '@/components/pages/rental/RentalComparableModels'
import RentalOptions from '@/components/pages/rental/RentalOptions'
import AddToCartButton from '@/components/shared/AddToCartButton'
import ContentBlock from '@/components/shared/ContentBlock'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import Img from '@/components/shared/Img'
import { H2, H5, Label, P } from '@/components/shared/Typography'
import type { RentalPayload } from '@/types'

export interface RentalProps {
  data: RentalPayload | null
}

export default function Rental({ data }: RentalProps) {
  // Default to an empty object to allow previews on non-existent documents
  const {
    _id,
    title,
    slug,
    equipmentCategories,
    mainImage,
    highlights,
    description,
    comparableModels,
  } = data ?? {}

  const cartItem = {
    _id: _id,
    title: `${title} ${equipmentCategories?.title}`,
    subCategoryTitle: equipmentCategories?.title,
    options: [],
    quantity: 1,
    // stockNumber: stockNumber,
    // price: price,
    cartType: 'rental',
    image: mainImage,
  }

  return (
    <main>
      <section className="container inventory grid grid-cols-1 gap-0 lg:grid-cols-12 mb-12">
        <div className="col-span-5 block lg:hidden">
          <Label className="mb-0 capitalize">
            <Link href="/rentals">Rental</Link>
            <MdChevronRight className="inline-block" />
            <Link href={`/rentals/${equipmentCategories?.slug}`}>
              {equipmentCategories?.title?.toLowerCase()}
            </Link>
          </Label>
          <H2 className="">
            {title} {equipmentCategories?.title}
          </H2>
        </div>
        <div className="col-span-5">
          <Img image={mainImage} alt={title} className="w-full px-10" />
        </div>
        <div className="col-span-7">
          <div className="md:mx-20 mt-10">
            <div className="hidden lg:block">
              <Label className="mb-0 capitalize">
                <Link href="/rentals">Rental</Link>
                <MdChevronRight className="inline-block" />
                <Link href={`/rentals/${equipmentCategories?.slug}`}>
                  {equipmentCategories?.title?.toLowerCase()}
                </Link>
              </Label>
              <H2 className="">
                {title} {equipmentCategories?.title}
              </H2>
            </div>
            <CustomPortableText value={highlights || []} />
            <RentalOptions categorySlug={equipmentCategories?.slug} />
            <AddToCartButton
              cartItem={cartItem}
              variant="outline"
              className="mr-3"
              cartType="rental"
            >
              <MdShoppingCart className="h-6 w-6 mr-2" />
              Request a Quote
            </AddToCartButton>
          </div>
        </div>
      </section>
      {comparableModels && (
        <section className="container text-center m-auto mb-12">
          <H5>- Comparable Models -</H5>
          <ContentBlock
            slug={'rental-comparable-models-description'}
            key="0"
            baseParagraphClasses="m-auto max-w-3xl"
          />
          <RentalComparableModels comparableModels={comparableModels} />
        </section>
      )}
      {description && (
        <section className="container max-w-5xl text-center m-auto  mb-12">
          <H5>- Description -</H5>
          <CustomPortableText value={description || []} />
        </section>
      )}
      {/* TODO: Add a specs section under the new specs content model */}
      {/* <section className="container max-w-5xl text-center m-auto  mb-12">
        <H5>- Specifications -</H5>
        <>list of specs</>
      </section> */}
      <ContentBlock slug={'rental-about-newman-tractor'} key="1" />

      <section className="container text-center m-auto mb-12">
        <RentalAdditionalSizes
          categorySlug={equipmentCategories?.slug}
          currentSize={slug}
        />
      </section>
      {/* <section className="container max-w-5xl text-center m-auto  mb-12">
        <H5>- Related Equipment -</H5>
        <>list of related equipment</>
      </section> */}
      <ContentBlock slug={'rental-contact-us'} key="2" />
    </main>
  )
}
