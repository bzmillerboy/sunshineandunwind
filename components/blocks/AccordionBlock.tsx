import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cleanEncodedMetadata, cn } from '@/lib/utils'

import { CustomPortableText } from '../shared/CustomPortableText'

export interface AccordionProps {
  heading: string
  body: any
  size?: 'small' | 'medium' | 'large'
}

export default function AccordionBlock({
  heading,
  body,
  size,
}: AccordionProps) {
  // console.log('AccordionBlock size:', size)

  const sizeClasses = {
    small: 'py-2',
    medium: 'py-4',
    large: 'py-6',
  }

  return (
    <Accordion
      type="single"
      collapsible
      className="accordion last-of-type:mb-4 w-full"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger
          size={sizeClasses[cleanEncodedMetadata(size) || 'medium']}
        >
          {heading}
        </AccordionTrigger>
        <AccordionContent>
          <CustomPortableText
            value={body || []}
            baseParagraphClasses="[&:not(:only-child)]:mb-0 ml-2"
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
