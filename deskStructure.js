import { EditIcon, EyeIcon } from '@sanity/icons'
import { GiMineTruck } from 'react-icons/gi'
import {
  MdAssignmentAdd,
  MdBusiness,
  MdFilePresent,
  MdOutlineNoPhotography,
  MdOutlinePeopleAlt,
  MdOutlinePhotoLibrary,
  MdOutlinePlayCircleOutline,
  MdPhotoSizeSelectLarge,
  MdSettings,
  MdShoppingCart,
} from 'react-icons/md'

const hiddenTypes = [
  'category',
  'models',
  'equipmentMake',
  'equipmentCategory',
  'equipmentSubCategory',
  'equipmentOptions',
  'ecommerceProduct',
  'ecommerceCategory',
  'ecommerceProductVariant',
  'inventory',
  'companyInfo',
  'person',
  'post',
  'siteSettings',
  'page',
  'videoPost',
  'staff',
  'department',
  'location',
  // 'equipmentJobCategory',
  'equipmentComparableModel',
  'specifications',
  'post',
  'videoPost',
  'media.tag',
]

export const customStructure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Media Content')
        .icon(MdOutlinePlayCircleOutline)
        .child(
          S.list()
            .title('Media Content')
            .items([
              S.listItem()
                .title('Videos')
                .schemaType('videoPost')
                .child(S.documentTypeList('videoPost').title('Video Content')),
              S.listItem()
                .title('Blog Post')
                .schemaType('post')
                .child(S.documentTypeList('post').title('Blog Post')),
              S.listItem()
                .title('Content Categories')
                .schemaType('category')
                .child(
                  S.documentTypeList('category').title('Content Categories'),
                ),
            ]),
        ),
      S.listItem()
        .title('Pages')
        .schemaType('page')
        .child(
          S.documentTypeList('page')
            .title('Pages')
            .child((documentId) =>
              S.document().documentId(documentId).schemaType('page'),
            ),
        ),
      S.listItem()
        .title('Staff')
        .icon(MdOutlinePeopleAlt)
        .child(
          S.list()
            .title('Staff')
            .items([
              S.listItem()
                .title('Staff')
                .schemaType('staff')
                .child(S.documentTypeList('staff').title('Staff')),
              S.listItem()
                .title('Department')
                .schemaType('department')
                .child(S.documentTypeList('department').title('Departments')),
            ]),
        ),
      S.listItem()
        .title('Locations')
        .schemaType('location')
        .child(S.documentTypeList('location')),
      S.listItem()
        .title('Store')
        .icon(MdShoppingCart)
        .child(
          S.list()
            .title('Store')
            .items([
              S.listItem()
                .title('Product')
                .schemaType('ecommerceProduct')
                .child(S.documentTypeList('ecommerceProduct').title('Product')),
              S.listItem()
                .title('Category')
                .schemaType('ecommerceCategory')
                .child(
                  S.documentTypeList('ecommerceCategory').title('Category'),
                ),
              S.listItem()
                .title('Vendor')
                .schemaType('equipmentMake')
                .child(S.documentTypeList('equipmentMake').title('Vendor')),
              S.listItem()
                .title('Product Variant')
                .schemaType('ecommerceProductVariant')
                .child(
                  S.documentTypeList('ecommerceProductVariant').title(
                    'Product Variant',
                  ),
                ),
            ]),
        ),
      S.listItem()
        .title('Equipment')
        .icon(GiMineTruck)
        .child(
          S.list()
            .title('Equipment')
            .items([
              S.listItem()
                .title('Models')
                .icon(GiMineTruck)
                .child(
                  S.list()
                    .title('Models')
                    .items([
                      S.listItem()
                        .title('View All Models')
                        .schemaType('models')
                        .child(
                          S.documentTypeList('models').title('All Models'),
                        ),
                      S.listItem()
                        .title('Has Page Published')
                        .schemaType('models')
                        .child(
                          S.documentList()
                            .title('Has Page Published')
                            .filter(
                              '_type == "models" && defined(body[]._key) ',
                            ),
                        ),
                      S.listItem()
                        .title('No Page Published')
                        .schemaType('models')
                        .child(
                          S.documentList()
                            .title('No Page Published')
                            .filter(
                              '_type == "models" && !defined(body[]._key) ',
                            ),
                        ),
                      S.listItem()
                        .title('Attachments')
                        .schemaType('models')
                        .child(
                          S.documentList()
                            .title('Attachments')
                            .filter(
                              ' _type == "models" && equipmentCategories->categoryType == "attachment" ',
                            ),
                        ),
                      S.listItem()
                        .title('Models')
                        .schemaType('models')
                        .child(
                          S.documentList()
                            .title('Models')
                            .filter(
                              ' _type == "models" && equipmentCategories->categoryType == "model" ',
                            ),
                        ),
                    ]),
                ),

              S.listItem()
                .title('Inventory')
                .schemaType('inventory')
                .child(
                  S.documentTypeList('inventory').title('Equipment Inventory'),
                ),
              S.listItem()
                .title('Makes')
                .schemaType('equipmentMake')
                .child(
                  S.documentTypeList('equipmentMake').title('Equipment Makes'),
                ),

              S.listItem()
                .title('Categories')
                .schemaType('equipmentCategory')
                // .child(S.documentTypeList("equipmentCategory").title("Equipment Categories")),

                .child(
                  S.list()
                    .title('Categories')
                    .items([
                      S.listItem()
                        .title('View All Categories')
                        .schemaType('equipmentCategory')
                        .child(
                          S.documentTypeList('equipmentCategory').title(
                            'All Categories',
                          ),
                        ),
                      S.listItem()
                        .title('Attachments')
                        .schemaType('equipmentCategory')
                        .child(
                          S.documentList()
                            .title('Attachments Only')
                            .filter(
                              '_type == "equipmentCategory" && categoryType == "attachment"',
                            ),
                        ),
                      S.listItem()
                        .schemaType('equipmentCategory')
                        .title('Models')
                        .schemaType('equipmentCategory')
                        .child(
                          S.documentList()
                            .title('Models Only')
                            .filter(
                              '_type == "equipmentCategory" && categoryType == "model"',
                            ),
                        ),
                      S.listItem()
                        .schemaType('equipmentCategory')
                        .title('Job')
                        .schemaType('equipmentCategory')
                        .child(
                          S.documentList()
                            .title('Jobs Only')
                            .filter(
                              '_type == "equipmentCategory" && categoryType == "job"',
                            ),
                        ),
                    ]),
                ),
              S.listItem()
                .title('Rental Sizes')
                .schemaType('equipmentSubCategory')
                .child(
                  S.documentTypeList('equipmentSubCategory').title(
                    'Equipment Rental Sizes',
                  ),
                ),
              S.listItem()
                .title('Rental Options')
                .schemaType('equipmentOptions')
                .child(
                  S.documentTypeList('equipmentOptions').title(
                    'Equipment Rental Options',
                  ),
                ),
              S.listItem()
                .title('Comparable Models')
                .schemaType('equipmentComparableModel')
                .child(
                  S.documentTypeList('equipmentComparableModel').title(
                    'Comparable Rental Models',
                  ),
                ),
              S.listItem()
                .title('Reports')
                .child(
                  S.list()
                    .title('Reports')
                    .items([
                      S.listItem()
                        .title('Missing Photos')
                        .icon(MdOutlineNoPhotography)
                        .child(
                          S.list()
                            .title('Equipment')
                            .items([
                              S.listItem()
                                .title('Bartow')
                                .schemaType('inventory')
                                .child(() =>
                                  S.documentList()
                                    .title(`Needing Photos`)
                                    .filter(
                                      '_type == "inventory" && status == "stock" && !defined(mainImage) && !defined(imageGallery) && (!(deliveryDate > now()) || deliveryDate == "") && location->slug.current == "bartow" ',
                                    ),
                                ),
                              S.listItem()
                                .title('Warsaw')
                                .schemaType('inventory')
                                .child(() =>
                                  S.documentList()
                                    .title(`Needing Photos`)
                                    .filter(
                                      '_type == "inventory" && status == "stock" && !defined(mainImage) && !defined(imageGallery) && (!(deliveryDate > now()) || deliveryDate == "") && location->slug.current == "warsaw" ',
                                    ),
                                ),
                              S.listItem()
                                .title('Verona')
                                .schemaType('inventory')
                                .child(() =>
                                  S.documentList()
                                    .title(`Needing Photos`)
                                    .filter(
                                      '_type == "inventory" && status == "stock" && !defined(mainImage) && !defined(imageGallery) && (!(deliveryDate > now()) || deliveryDate == "") && location->slug.current == "verona" ',
                                    ),
                                ),
                              S.listItem()
                                .title('Richwood')
                                .schemaType('inventory')
                                .child(() =>
                                  S.documentList()
                                    .title(`Needing Photos`)
                                    .filter(
                                      '_type == "inventory" && status == "stock" && !defined(mainImage) && !defined(imageGallery) && (!(deliveryDate > now()) || deliveryDate == "") && location->slug.current == "richwood" ',
                                    ),
                                ),
                              S.listItem()
                                .title('Apopka')
                                .schemaType('inventory')
                                .child(() =>
                                  S.documentList()
                                    .title(`Needing Photos`)
                                    .filter(
                                      '_type == "inventory" && status == "stock" && !defined(mainImage) && !defined(imageGallery) && (!(deliveryDate > now()) || deliveryDate == "") && location->slug.current == "apopka" ',
                                    ),
                                ),
                              S.listItem()
                                .title('St. Clairsville')
                                .schemaType('inventory')
                                .child(() =>
                                  S.documentList()
                                    .title(`Needing Photos`)
                                    .filter(
                                      '_type == "inventory" && status == "stock" && !defined(mainImage) && !defined(imageGallery) && (!(deliveryDate > now()) || deliveryDate == "") && location->slug.current == "st-clairsville" ',
                                    ),
                                ),
                            ]),
                        ),

                      // S.listItem()
                      //   .title("Missing Photos")
                      //   .schemaType("inventory")
                      //   .child(
                      //     S.documentList()
                      //       .title("Needing Photos")
                      //       .filter(
                      //         '_type == "inventory" && !defined(mainImage) && !defined(imageGallery) '
                      //       )
                      //   ),
                      S.listItem()
                        .title('Hours Increased Since Photos')
                        .icon(MdPhotoSizeSelectLarge)
                        .schemaType('inventory')
                        .child(
                          S.documentList()
                            .title('Needing Photos')
                            .filter(
                              '_type == "inventory" && (hoursCurrent - hoursPhoto) >= 1000',
                            ),
                        ),
                      S.listItem()
                        .title('Old Photos')
                        .icon(MdOutlinePhotoLibrary)
                        .schemaType('inventory')
                        .child(
                          S.documentList()
                            .title('Needing Photos')
                            .filter(
                              '_type == "inventory" && defined(photoDate) && select(dateTime(photoDate + "T00:00:00.000Z")) <= (dateTime(now()) - 63072000)',
                            ),
                        ),
                      S.listItem()
                        .title('Missing photo date')
                        .icon(MdOutlinePhotoLibrary)
                        .schemaType('inventory')
                        .child(
                          S.documentList()
                            .title('Needing Photo Date')
                            .filter(
                              '_type == "inventory" && !defined(photoDate) && defined(imageGallery)',
                            ),
                        ),
                    ]),
                ),
              S.listItem()
                .title('Specifications')
                .icon(MdAssignmentAdd)
                .schemaType('specifications')
                .child(
                  S.documentTypeList('specifications').title('Specifications'),
                ),
            ]),
        ),
      S.divider(),

      ...S.documentTypeListItems().filter(
        (listItem) => !hiddenTypes.includes(listItem.getId()),
      ),
      S.divider(),
      S.listItem()
        .title('Site Settings')
        .icon(MdSettings)
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings'),
        ),
      S.listItem()
        .title('Company Info')
        .icon(MdBusiness)
        .child(
          S.editor()
            .id('companyInfo')
            .schemaType('companyInfo')
            .documentId('companyInfo'),
        ),
    ])
