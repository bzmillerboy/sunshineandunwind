import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa'

import { CustomPortableText } from '@/components/shared/CustomPortableText'
import type { CompanyInfoPayload, ContentBlockPayload } from '@/types'

interface FooterProps {
  companyInfo?: CompanyInfoPayload | null
  content?: ContentBlockPayload[] | null
}
export default function Footer(props: FooterProps) {
  const { companyInfo, content } = props

  const socialLinks = [
    {
      href: companyInfo?.socialLinkFacebook,
      icon: <FaFacebookF />,
      key: 'facebook',
    },
    {
      href: companyInfo?.socialLinkLinkedin,
      icon: <FaLinkedinIn />,
      key: 'linkedin',
    },
    {
      href: companyInfo?.socialLinkYoutube,
      icon: <FaYoutube />,
      key: 'youtube',
    },
    {
      href: companyInfo?.socialLinkInstagram,
      icon: <FaInstagram />,
      key: 'instagram',
    },
  ]

  function MegaMenuContent(slug: string) {
    return content?.find((c) => c.slug === slug)?.body
  }

  return (
    <footer className="bg-black text-white py-10 px-3 mt-12 dark group footer">
      <div
        className={`grid grid-cols-1 lg:grid-cols-4 justify-between gap-4 container mb-16`}
      >
        <div>
          <CustomPortableText
            value={MegaMenuContent('footer-column-one') || []}
          />
        </div>
        <div>
          <CustomPortableText
            value={MegaMenuContent('footer-column-two') || []}
          />
        </div>
        <div>
          <CustomPortableText
            value={MegaMenuContent('footer-column-three') || []}
          />
        </div>
        <div>
          <CustomPortableText
            value={MegaMenuContent('footer-column-four') || []}
          />
        </div>
      </div>

      <ul className="text-center">
        {socialLinks.map(({ href, icon, key }) => (
          <li className="inline-block p-4 text-xl" key={key}>
            <a href={href} target="_blank" rel="noopener noreferrer">
              {icon}
            </a>
          </li>
        ))}
      </ul>

      <div className="text-center">
        © {new Date().getFullYear()}, {companyInfo?.name || 'Company Name'}
      </div>
    </footer>
  )
}
