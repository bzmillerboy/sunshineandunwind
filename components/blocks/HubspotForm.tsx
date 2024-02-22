'use client'

import { useHubspotForm } from 'next-hubspot'

const HubspotForm = ({ formId }) => {
  const { loaded, error, formCreated } = useHubspotForm({
    portalId: '20095799',
    formId: formId,
    target: '#hubspot-form-wrapper',
  })

  return <div id="hubspot-form-wrapper" />
}

export default HubspotForm
