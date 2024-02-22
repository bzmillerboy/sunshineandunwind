'use client'
import { Modal } from 'flowbite-react'
import { useRef, useState } from 'react'

import RequestDemoForm from '@/components/blocks/RequestDemo/RequestDemoForm'
import ContentBlock from '@/components/shared/ContentBlock'
import { Button } from '@/components/ui/button'
import { cleanEncodedMetadata, linkTypeToVariant } from '@/lib/utils'

export default function RequestDemo({ linkType }) {
  const [openModal, setOpenModal] = useState(false)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const handleClose = () => {
    setOpenModal(false)
  }

  return (
    <>
      <Button
        variant={linkTypeToVariant[cleanEncodedMetadata(linkType)]}
        data-modal-target="default-modal"
        data-modal-toggle="default-modal"
        onClick={() => setOpenModal(true)}
      >
        Request A Demo
      </Button>
      <Modal
        show={openModal}
        dismissible
        size="xl"
        popup
        onClose={() => setOpenModal(false)}
        initialFocus={emailInputRef}
        className="ring-0"
      >
        <div className="p-4 overflow-auto">
          <Modal.Header></Modal.Header>
          <Modal.Body>
            <ContentBlock slug={'request-demo-form'} />
            <RequestDemoForm
              handleClose={handleClose}
              successContent={'successContent'}
              modalMode={true}
            />
          </Modal.Body>
        </div>
      </Modal>
    </>
  )
}
