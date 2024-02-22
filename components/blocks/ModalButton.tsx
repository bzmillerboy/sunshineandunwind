'use client'
import { Modal } from 'flowbite-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { cleanEncodedMetadata, linkTypeToVariant } from '@/lib/utils'

interface ModalButtonProps {
  content?: React.ReactNode
  buttonText?: string
  linkType?: string
  size?: string
}

export default function ModalButton({
  content,
  buttonText,
  linkType,
  size,
}: ModalButtonProps) {
  const [openModal, setOpenModal] = useState(false)

  return (
    <div>
      <Button
        variant={linkTypeToVariant[cleanEncodedMetadata(linkType)]}
        onClick={() => setOpenModal(true)}
      >
        {buttonText}
      </Button>
      <Modal
        show={openModal}
        dismissible
        size={size}
        popup
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header />
        <Modal.Body>{content}</Modal.Body>
      </Modal>
    </div>
  )
}
