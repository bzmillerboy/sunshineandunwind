'use client'

import { Alert } from 'flowbite-react'
import { MdShoppingCart } from 'react-icons/md'

import FinancingApplicationModal from '@/components/blocks/FinancingApplication/FinancingApplicationModal'
import AddToCartButton from '@/components/shared/AddToCartButton'
import ContentBlock from '@/components/shared/ContentBlock'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import Gallery from '@/components/shared/Gallery'
import { H2, H5, Label, P } from '@/components/shared/Typography'
import {
  cleanEncodedMetadata,
  currencyFormatter,
  formatDate,
  priceSetter,
  titleDisplay,
} from '@/lib/utils'
import {} from '@/lib/utils'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import type { InventoryPayload } from '@/types'

import EmailInventoryForm from './EmailInventoryForm'
import RelatedAttachments from './RelatedAttachments'

export interface InventoryProps {
  data: InventoryPayload | null
}

export function Inventory({ data }: InventoryProps) {
  // Default to an empty object to allow previews on non-existent documents
  const {
    _id,
    title,
    slug,
    equipmentMake,
    equipmentCategories,
    mainImage,
    imageGallery,
    hoursPhoto,
    photoDate,
    videoURL,
    descriptionBlock,
    specification,
    stockNumber,
    price,
    closeout,
    condition,
    year,
    model,
    hoursCurrent,
    mileage,
    location,
    status,
    deliveryDate,
    movementDate,
  } = data ?? {}

  const titleCompiled = titleDisplay(
    equipmentCategories?.categoryType,
    equipmentMake?.name,
    year,
    model,
    title,
  )
  const priceValue = priceSetter(
    price,
    equipmentMake?.name,
    equipmentCategories?.title,
    condition,
  )

  const cartItem = {
    _id: _id,
    title: titleCompiled,
    subCategoryTitle: equipmentCategories?.title,
    options: [],
    quantity: 1,
    stockNumber: stockNumber,
    price: price,
    cartType: 'quote',
    image: mainImage,
  }

  const specs =
    cleanEncodedMetadata(specification) &&
    JSON.parse(cleanEncodedMetadata(specification))
      .filter((spec) => spec.SpecificationDescription !== '')
      .map((spec) => {
        return {
          label: spec.Parameter.toLocaleLowerCase(),
          value: spec.SpecificationDescription.toLocaleLowerCase(),
        }
      })
  const galleryPhotoDate = () => {
    const date = photoDate ? `Date: ${formatDate(photoDate)}` : ''
    const separator = photoDate && hoursPhoto ? ' | ' : ''
    const hours = hoursPhoto ? `Hours: ${hoursPhoto}` : ''

    return date + separator + hours
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: titleCompiled,
    image: urlForOpenGraphImage(mainImage),
    description: `For sale and available now at Newman Tractor, this ${titleCompiled} ${equipmentCategories?.title} is ready to work. Priced to move so get it while it lasts.`,
    brand: {
      '@type': 'Brand',
      name: equipmentMake?.name,
    },
    sku: stockNumber,
    productID: stockNumber,
    url: `https://newmantractor.com/equipment/${equipmentCategories?.slug}/${slug}`,
    fb_product_category: 177,
    google_product_category: 1795,
    offers: {
      '@type': 'Offer',
      price: priceValue,
      priceCurrency: 'USD',
      itemCondition:
        condition === 'used'
          ? 'https://schema.org/UsedCondition'
          : 'https://schema.org/NewCondition',
      availability:
        status === 'sold'
          ? 'https://schema.org/SoldOut'
          : 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Newman Tractor',
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="inventory grid grid-cols-1 gap-0 lg:grid-cols-12">
        <div className="col-span-6">
          <div className="mx-4 mt-4 block lg:hidden">
            <Title
              status={status}
              condition={condition}
              titleCompiled={titleCompiled}
              equipmentCategories={equipmentCategories}
              stockNumber={stockNumber}
            />
          </div>
          <Gallery
            images={imageGallery?.images}
            mainImage={mainImage}
            photoDate={galleryPhotoDate()}
            title={cleanEncodedMetadata(titleCompiled)}
            equipmentCategories={equipmentCategories}
          />
        </div>
        <div className="col-span-6">
          <div className="mx-4 mt-4 lg:mx-20 lg:mt-10">
            <div className="hidden lg:block">
              <Title
                status={status}
                condition={condition}
                titleCompiled={titleCompiled}
                equipmentCategories={equipmentCategories}
                stockNumber={stockNumber}
              />
            </div>
            {priceValue && (
              <div>
                <Label>Price:</Label>
                {status !== 'sold' && <H5>{currencyFormatter(priceValue)}</H5>}
                {status === 'sold' && (
                  <H5>
                    <svg
                      width="67"
                      height="42"
                      viewBox="0 0 67 42"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="3.7793"
                        y="15.8296"
                        width="58"
                        height="21"
                        transform="rotate(-11.6254 3.7793 15.8296)"
                        fill="white"
                      />
                      <path
                        d="M22.5755 17.3916C22.1578 17.1711 21.6899 17.0628 21.2178 17.0773C20.7526 17.051 20.2897 17.1605 19.8857 17.3927C19.4816 17.6248 19.1539 17.9695 18.9424 18.3848C18.7088 18.8217 18.5878 19.3099 18.5904 19.8053C18.5904 20.3459 18.7161 20.811 18.9424 21.2385C19.1535 21.6434 19.4764 21.9794 19.8727 22.2065C20.29 22.4309 20.7565 22.5484 21.2304 22.5484C21.7043 22.5484 22.1707 22.4309 22.5881 22.2065C22.9843 21.9794 23.3072 21.6434 23.5184 21.2385C23.7447 20.8236 23.8704 20.3459 23.8704 19.8053C23.8704 19.2648 23.7447 18.7996 23.5184 18.3848C23.2991 17.9824 22.9784 17.6443 22.5881 17.4042L22.5755 17.3916ZM42.0989 17.1402H40.4018V22.4453H42.0989C42.8474 22.4851 43.5821 22.2327 44.1481 21.7413C44.6509 21.2636 44.8772 20.6225 44.8772 19.7928C44.8772 18.963 44.6509 18.347 44.1481 17.8693C43.6452 17.3665 42.9664 17.1402 42.0989 17.1402Z"
                        fill="#FF3D3F"
                      />
                      <path
                        d="M66.2524 28.9269V12.4834C66.2524 11.1383 65.6238 9.89371 64.5176 9.11429L52.8387 0.766857C52.1372 0.268388 51.2981 0.000395906 50.4376 0L8.0467 0C5.88163 0.0331016 3.81821 0.924181 2.30965 2.47752C0.801097 4.03087 -0.0292526 6.11946 0.000981865 8.28457L0.000981865 33.1257C-0.0156547 34.1988 0.179271 35.2647 0.574625 36.2625C0.96998 37.2603 1.55802 38.1704 2.30516 38.9409C3.0523 39.7114 3.9439 40.3271 4.92904 40.753C5.91419 41.1789 6.97357 41.4065 8.0467 41.4229H50.4376C51.2952 41.4162 52.1296 41.1439 52.8261 40.6434L64.5176 32.296C65.0543 31.9133 65.4918 31.4079 65.7936 30.8218C66.0953 30.2357 66.2527 29.586 66.2524 28.9269ZM14.2444 23.1314C13.9176 23.6343 13.4147 24.0114 12.7736 24.288C12.145 24.552 11.3907 24.7029 10.4981 24.7029C9.73127 24.7029 8.98955 24.6023 8.28555 24.3886C7.58155 24.1874 6.97813 23.8857 6.53813 23.5463C6.43755 23.4834 6.39984 23.3326 6.4627 23.2069L7.17927 21.56C7.22955 21.4971 7.29241 21.4343 7.36784 21.4091C7.45584 21.384 7.53127 21.4091 7.59412 21.4469C7.97127 21.7234 8.42384 21.9497 8.93927 22.1383C9.4547 22.3017 9.99527 22.3897 10.5107 22.3897C10.9269 22.4168 11.343 22.3345 11.7176 22.1509C12.0067 21.9623 12.0318 21.7737 12.0318 21.648C12.0318 21.5223 11.9816 21.4091 11.8558 21.3086C11.7176 21.1829 11.529 21.0823 11.3027 20.9943C11.0387 20.9063 10.6741 20.8057 10.2216 20.7051C9.50498 20.5417 8.9267 20.3531 8.44898 20.1897C7.94613 20.0011 7.5187 19.6869 7.1667 19.272C6.79151 18.788 6.59998 18.1867 6.62612 17.5749C6.61072 16.963 6.78819 16.3618 7.13339 15.8564C7.47859 15.3511 7.97403 14.9671 8.54955 14.7589C9.17813 14.4949 9.93241 14.344 10.825 14.344C11.4284 14.344 12.0318 14.432 12.6227 14.5703C13.1843 14.7022 13.7197 14.9274 14.2067 15.2366C14.3073 15.2994 14.3701 15.4503 14.3073 15.576L13.641 17.248C13.6284 17.3109 13.5656 17.3737 13.4776 17.3863C13.3896 17.4366 13.3141 17.4114 13.2513 17.3737C12.4467 16.9211 11.617 16.6697 10.8124 16.6697C10.2718 16.6697 9.85698 16.7451 9.6307 16.9211C9.53554 16.9789 9.45673 17.0601 9.40173 17.1569C9.34673 17.2537 9.31736 17.363 9.31641 17.4743C9.31641 17.6251 9.35413 17.8011 9.64327 17.952C10.1176 18.1475 10.6104 18.2949 11.1141 18.392C11.7189 18.5228 12.3151 18.6908 12.8993 18.8949C13.4021 19.096 13.8044 19.3977 14.1816 19.8C14.5336 20.2274 14.7221 20.7931 14.7221 21.4971C14.7221 22.088 14.5587 22.6286 14.2444 23.1314ZM26.1118 22.176C25.6287 22.9782 24.9381 23.6351 24.1128 24.0776C23.2876 24.5201 22.3582 24.7318 21.4227 24.6903C20.4729 24.7049 19.5347 24.4801 18.6947 24.0366C17.8934 23.6067 17.2275 22.9626 16.7713 22.176C16.2931 21.3797 16.0491 20.4647 16.0673 19.536C16.0523 18.6174 16.2893 17.7122 16.7525 16.9188C17.2157 16.1254 17.8874 15.474 18.6947 15.0354C19.5292 14.5736 20.469 14.3354 21.4227 14.344C22.3892 14.3289 23.3428 14.5673 24.1884 15.0354C24.9966 15.4697 25.6694 16.1184 26.1329 16.9102C26.5964 17.7019 26.8327 18.6061 26.8158 19.5234C26.8293 20.4515 26.5857 21.3653 26.1118 22.1634V22.176ZM36.257 24.2629C36.257 24.4137 36.1313 24.5394 35.9804 24.5394H29.1541C29.0033 24.5394 28.8776 24.4137 28.8776 24.2629V14.8091C28.8776 14.6331 29.0033 14.52 29.1541 14.52H31.3038C31.4673 14.52 31.593 14.6457 31.593 14.8091V22.2011H35.993C36.1187 22.2011 36.2444 22.3269 36.2444 22.4903L36.257 24.2629ZM47.1438 22.1509C46.6887 22.9103 46.0315 23.5284 45.2456 23.936C44.4158 24.3257 43.4856 24.5394 42.4296 24.5394H38.2056C38.0296 24.5394 37.9038 24.4137 37.9038 24.2629V14.8091C37.9038 14.6331 38.0296 14.52 38.2056 14.52H42.4296C43.4856 14.52 44.4158 14.7211 45.2456 15.136C46.0545 15.544 46.7296 16.1753 47.1908 16.9551C47.652 17.7349 47.88 18.6306 47.8478 19.536C47.8478 20.5166 47.5964 21.4091 47.1438 22.1509ZM57.9678 24.7657C56.8698 24.7624 55.8178 24.3238 55.0425 23.5462C54.2672 22.7685 53.8318 21.7152 53.8318 20.6171C53.8352 19.5191 54.2737 18.4671 55.0514 17.6918C55.829 16.9165 56.8823 16.4811 57.9804 16.4811C59.0785 16.4845 60.1305 16.923 60.9058 17.7007C61.6811 18.4783 62.1164 19.5316 62.1164 20.6297C62.1131 21.7278 61.6745 22.7798 60.8969 23.5551C60.1192 24.3304 59.0659 24.7657 57.9678 24.7657Z"
                        fill="#FF3D3F"
                      />
                    </svg>
                  </H5>
                )}
              </div>
            )}
            {year && equipmentCategories?.categoryType !== 'attachment' && (
              <div>
                <Label>Year:</Label>
                <P>{year}</P>
              </div>
            )}
            {model && (
              <div>
                <Label>Model:</Label>
                <P>{model}</P>
              </div>
            )}
            {(hoursCurrent || hoursCurrent === 0) && (
              <div>
                <Label>Hours:</Label>
                <P>{hoursCurrent}</P>
              </div>
            )}
            {equipmentMake && (
              <div>
                <Label>Make:</Label>
                <P>{equipmentMake?.name}</P>
              </div>
            )}
            {(mileage || mileage === 0) && (
              <div>
                <Label>Mileage:</Label>
                <P>{mileage}</P>
              </div>
            )}

            <div>
              {descriptionBlock && (
                <>
                  <Label>Description:</Label>
                  <CustomPortableText value={descriptionBlock} />
                </>
              )}
            </div>

            <div>
              {!descriptionBlock && specs.length < 1 && (
                <>
                  <Label>Description:</Label>
                  <P>Please contact us for further details.</P>
                </>
              )}
            </div>

            {specs && specs.length > 0 && (
              <>
                <Label>Specifications:</Label>
                <table className="w-full mb-10">
                  <tbody className="[&>*:nth-child(odd)]:bg-gray-100">
                    {specs.map((spec) => {
                      return (
                        <tr key={spec.label}>
                          <th className="text-left p-2 border-t border-gray-200 text-gray-600 font-medium align-top capitalize">
                            {spec.label}
                          </th>
                          <td className="text-left p-2 border-t border-gray-200 text-gray-600 align-top capitalize">
                            {spec.value}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </>
            )}
            {status !== 'sold' && (
              <div>
                <AddToCartButton
                  cartItem={cartItem}
                  variant="primary"
                  className="mr-3"
                  cartType="quote"
                >
                  <MdShoppingCart className="h-6 w-6 mr-2" />
                  Request a Quote
                </AddToCartButton>
                <FinancingApplicationModal
                  headingContent={
                    <ContentBlock slug={'apply-financing-form'} />
                  }
                  successContent={
                    <ContentBlock
                      slug={'apply-financing-contact-submit-success'}
                    />
                  }
                />
                <EmailInventoryForm data={data} />
              </div>
            )}
          </div>
        </div>
      </main>
      <div>
        <RelatedAttachments
          relatedAttachments={equipmentCategories?.relatedAttachments}
        />
      </div>
    </>
  )
}

export default Inventory

function Title({
  status,
  condition,
  titleCompiled,
  equipmentCategories,
  stockNumber,
}) {
  return (
    <>
      {status === 'sold' && (
        <Alert color="failure">
          <span className="font-medium">Sold:</span> This item has sold and is
          no longer available.
        </Alert>
      )}
      <Label className="mb-0 capitalize">{condition}</Label>
      <H2 className="mb-0">{titleCompiled}</H2>
      <div className="mb-4">
        <Label>
          {(equipmentCategories && equipmentCategories?.title) || 'Equipment'}
          {stockNumber && ' | '} {stockNumber}
        </Label>
      </div>
    </>
  )
}
