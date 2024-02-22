'use client'

import { HubspotProvider } from 'next-hubspot'

const Providers = ({ children }) => (
  <HubspotProvider>{children}</HubspotProvider>
)

export default Providers
