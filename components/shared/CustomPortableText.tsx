import { PortableText, PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { Image } from 'sanity'

import AccordionBlock from '@/components/blocks/AccordionBlock'
import BlogGrid from '@/components/blocks/BlogGrid'
import EmailSubscribe from '@/components/blocks/EmailSubscribe'
import EquipmentHighlight from '@/components/blocks/EquipmentHighlight'
import ExternalLink from '@/components/blocks/ExternalLink'
import Figure from '@/components/blocks/Figure'
import FinancingApplication from '@/components/blocks/FinancingApplication/FinancingApplication'
import FinancingApplicationForm from '@/components/blocks/FinancingApplication/FinancingApplicationForm'
import FiveColumn from '@/components/blocks/FiveColumn'
import FourColumn from '@/components/blocks/FourColumn'
import Hero from '@/components/blocks/Hero'
import HeroEquipment from '@/components/blocks/HeroEquipment'
import HeroVideo from '@/components/blocks/HeroVideo'
import HubspotForm from '@/components/blocks/HubspotForm'
import Iframe from '@/components/blocks/Iframe'
import InternalLink from '@/components/blocks/InternalLink'
import InventoryCategoryAttachmentsGrid from '@/components/blocks/InventoryCategoryAttachmentsGrid'
import InventoryCategoryGrid from '@/components/blocks/InventoryCategoryGrid'
// import InventoryGridLoader from '@/components/blocks/InventoryGrid/InventoryGridLoader'
import InventoryList from '@/components/blocks/InventoryList'
import ModalButton from '@/components/blocks/ModalButton'
import ModelGrid from '@/components/blocks/ModelGrid'
import OneColumn from '@/components/blocks/OneColumn'
import RentalGridLoader from '@/components/blocks/RentalGrid/RentalGridLoader'
import RequestDemo from '@/components/blocks/RequestDemo/RequestDemo'
import StaffGridLoader from '@/components/blocks/StaffGrid/StaffGridLoader'
import ThreeColumn from '@/components/blocks/ThreeColumn'
import TwoColumn from '@/components/blocks/TwoColumn'
import Video from '@/components/blocks/Video'
import VideoGrid from '@/components/blocks/VideoGrid'
import ContentBlock from '@/components/shared/ContentBlock'
import Table from '@/components/shared/Table'
import { cleanEncodedMetadata, cn } from '@/lib/utils'

import {
  Blockquote,
  GrayBackground,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Lead,
  List,
  NumberList,
  P,
  RomanList,
} from './Typography'

export function CustomPortableText({
  value,
  baseParagraphClasses,
}: {
  value: PortableTextBlock[]
  baseParagraphClasses?: string
}) {
  // console.log('CustomPortableText value:', value)

  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        // If the paragraphy is empty, don't render it.
        if (children && cleanEncodedMetadata(children[0]) === '') {
          return null
        }
        return <P className={baseParagraphClasses}>{children}</P>
      },
      h1: ({ children }) => {
        return <H1>{children}</H1>
      },
      h2: ({ children }) => {
        return <H2>{children}</H2>
      },
      h3: ({ children }) => {
        return <H3>{children}</H3>
      },
      h4: ({ children }) => {
        return <H4>{children}</H4>
      },
      h5: ({ children }) => {
        return <H5>{children}</H5>
      },
      h6: ({ children }) => {
        return <H6>{children}</H6>
      },
      blockquote: ({ children }) => {
        return <Blockquote>{children}</Blockquote>
      },
      lead: ({ children }) => {
        return <Lead>{children}</Lead>
      },
      grayBackground: ({ children }) => {
        return <GrayBackground>{children}</GrayBackground>
      },
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <a
            className="underline transition hover:opacity-50"
            href={value?.href}
            rel="noreferrer noopener"
          >
            {children}
          </a>
        )
      },
      highlight: ({ children }) => {
        return (
          <span className="bg-yellow-100 p-1 px-2 rounded-sm">{children}</span>
        )
      },
      alignCenter: ({ children }) => {
        return <span className="text-center block">{children}</span>
      },
      alignLeft: ({ children }) => {
        return <span className="text-left block">{children}</span>
      },
      alignRight: ({ children }) => {
        return <span className="text-right block">{children}</span>
      },
      internalLink: ({ value, children }) => {
        // console.log('internalLink value:', value, children)
        return (
          <InternalLink
            params={value.params}
            manualPath={value.manualPath}
            linkType={value.linkType}
            reference={value.reference?._ref}
          >
            {children}
          </InternalLink>
        )
      },
      externalLink: ({ value, children }) => {
        // console.log('externalLink value:', value, children)
        return (
          <ExternalLink
            href={value.href}
            linkType={value.linkType}
            blank={value.blank}
          >
            {children}
          </ExternalLink>
        )
      },
      requestDemo: ({ value }) => {
        // return <div>Request Demo Component</div>
        // console.log('requestDemo value:', value)
        return <RequestDemo linkType={value.linkType} />
      },
      financeApplication: ({ value }) => {
        return (
          <FinancingApplication
            successContent={
              <ContentBlock slug={'apply-financing-contact-submit-success'} />
            }
          />
        )
      },
    },
    list: {
      bullet: ({ children }) => (
        <List className={baseParagraphClasses}>{children}</List>
      ),
      number: ({ children }) => <NumberList>{children}</NumberList>,
      roman: ({ children }) => <RomanList>{children}</RomanList>,
    },
    listItem: {
      bullet: ({ children }) => <li>{children}</li>,
      number: ({ children }) => <li>{children}</li>,
      roman: ({ children }) => <li>{children}</li>,
    },
    types: {
      figure: ({
        value,
      }: {
        value: Image & {
          alt?: string
          caption?: string
          externalLink?: string
          noShadow?: boolean
          customClassName?: string
        }
      }) => {
        // console.log('figure value:', value)
        return (
          <Figure
            image={value}
            alt={value.alt}
            caption={value.caption}
            noShadow={value.noShadow}
            externalLink={value.externalLink}
            customClasses={value.customClassName}
          />
        )
      },
      video: ({ value }) => {
        return (
          <Video
            videoURL={value.videoURL}
            posterImage={value.posterImage}
            noShadow={value.noShadow}
          />
        )
      },
      slideshow: ({ value }) => {
        return <div>Slideshow Component</div>
      },
      hero: ({ value }) => {
        return (
          <>
            <Hero
              body={value.body}
              mainImage={value.mainImage}
              size={value.size}
              lightTheme={value.lightTheme}
              alignment={value.alignment}
            />
          </>
        )
      },
      heroEquipment: ({ value }) => {
        return (
          <HeroEquipment
            mainImage={value.mainImage}
            body={value.body}
            backgroundImage={value.backgroundImage}
          />
        )
      },
      heroVideo: ({ value }) => {
        // console.log('heroVideo value:', value)
        return (
          <HeroVideo
            body={value.body}
            posterImage={value.posterImage}
            size={value.size}
            videoSource={value.videoSource}
            videoSourceWebm={value.videoSourceWebm}
            videoSourceOgg={value.videoSourceOgg}
            lightTheme={value.lightTheme}
            alignment={value.alignment}
          />
        )
      },
      oneColumn: ({ value }) => (
        <OneColumn
          body={value.body}
          fullWidth={value.containerOption}
          customClasses={value.customClassName}
        />
      ),
      twoColumn: ({ value }) => (
        <TwoColumn
          bodyLeft={value.bodyLeft}
          bodyRight={value.bodyRight}
          fullWidth={value.containerOption}
          layout={value.layout}
          customClasses={value.customClassName}
        />
      ),
      threeColumn: ({ value }) => (
        <ThreeColumn
          bodyLeft={value.bodyLeft}
          bodyCenter={value.bodyCenter}
          bodyRight={value.bodyRight}
          fullWidth={value.containerOption}
          customClasses={value.customClassName}
        />
      ),
      fourColumn: ({ value }) => (
        <FourColumn
          bodyColOne={value.bodyColOne}
          bodyColTwo={value.bodyColTwo}
          bodyColThree={value.bodyColThree}
          bodyColFour={value.bodyColFour}
          fullWidth={value.containerOption}
          customClasses={value.customClassName}
        />
      ),
      fiveColumn: ({ value }) => (
        <FiveColumn
          bodyColOne={value.bodyColOne}
          bodyColTwo={value.bodyColTwo}
          bodyColThree={value.bodyColThree}
          bodyColFour={value.bodyColFour}
          bodyColFive={value.bodyColFive}
          fullWidth={value.containerOption}
          customClasses={value.customClassName}
        />
      ),

      equipmentGrid: ({ value }) => {
        // console.log('equipmentGrid value:', value)
        return (
          <ModelGrid
            categoryId={value?.equipmentCategory?._ref}
            makeId={value?.equipmentMake?._ref}
          />
        )
      },

      inventoryCategoryGrid: ({ value }) => {
        // console.log('inventoryCategoryGrid value:', value)
        return <InventoryCategoryGrid categoryType={value.categoryType} />
      },
      inventoryCategoryAttachmentGrid: ({ value }) => {
        // console.log('inventoryCategoryAttachmentGrid value:', value)
        return (
          <InventoryCategoryAttachmentsGrid
            categoryRef={value.equipmentCategory._ref}
          />
        )
      },
      inventoryGrid: ({ value }) => {
        return null
      },
      inventoryList: ({ value }) => {
        return (
          <InventoryList
            displayLimit={value.displayLimit}
            categoryId={value?.equipmentCategory?._ref}
          />
        )
      },
      videoGrid: ({ value }) => {
        // console.log('videoGrid value:', value)
        return (
          <VideoGrid
            compact={value.sizeOption}
            displayLimit={value.displayLimit}
          />
        )
      },
      blogGrid: ({ value }) => {
        // console.log('videoGrid value:', value)
        return (
          <BlogGrid
            compact={value.sizeOption}
            displayLimit={value.displayLimit}
          />
        )
      },
      equipmentHighlight: ({ value }) => {
        // console.log('equipmentHighlight value:', value)
        return (
          <EquipmentHighlight
            color={value.color?.hex}
            logo={value.logo}
            tagline={value.tagline}
            body={value.body}
          />
        )
      },
      iFrame: ({ value }) => {
        // console.log('iFrame value:', value)
        return <Iframe url={value.url} />
      },
      jobListings: ({ value }) => {
        return <div>Job Listings Component</div>
      },
      hubSpotForm: ({ value }) => {
        // console.log('hubSpotForm value:', value)
        return <HubspotForm formId={value.formId} />
      },
      staffGrid: ({ value }) => {
        // console.log('staffGrid value:', value)
        return <StaffGridLoader locationId={value.Location?._ref} />
      },
      emailSubscribe: ({ value }) => {
        return <EmailSubscribe formId={value.formId} />
      },
      tableBlock: ({ value }) => {
        return (
          <Table
            firstRowIsHeading={value.firstRowIsHeading}
            fullWidth={value.fullWidth}
            table={value.table}
          />
        )
      },
      rentalHighlights: ({ value }) => {
        return <div>Rental Highlights Component</div>
      },
      compareModelsBanner: ({ value }) => {
        return <div>Compare Models Banner Component</div>
      },
      financeApplicationForm: ({ value }) => {
        return (
          <FinancingApplicationForm
            successContent={
              <ContentBlock slug={'apply-financing-contact-submit-success'} />
            }
          />
        )
      },
      modal: ({ value }) => {
        // console.log('modal value:', value)
        return (
          <ModalButton
            content={<CustomPortableText value={value.body} />}
            buttonText={value.buttonText}
            linkType={value.linkType}
            size={value.modalSize}
          />
        )
      },
      phoneNumber: ({ value }) => {
        return <>Phone Number Component</>
      },
      rentalGrid: ({ value }) => {
        // console.log('rentalGrid value:', value)
        return <RentalGridLoader categoryId={value?.equipmentCategory?._ref} />
      },
      accordion: ({ value }) => {
        // console.log('accordion value:', value)
        return (
          <AccordionBlock
            size={value.size}
            heading={value.heading}
            body={value.body}
          />
        )
      },
    },
  }

  return <PortableText components={components} value={value} />
}
