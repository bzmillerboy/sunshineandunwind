'use client'
import { Modal } from 'flowbite-react'
import { useRef, useState } from 'react'
import { MdAttachMoney } from 'react-icons/md'

import FinancingApplicationForm from '@/components/blocks/FinancingApplication/FinancingApplicationForm'
import { Button } from '@/components/ui/button'

export default function FinancingApplicationModal({
  headingContent,
  successContent,
}) {
  const [openModal, setOpenModal] = useState(false)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const handleClose = () => {
    setOpenModal(false)
  }

  return (
    <>
      <Button
        variant="outline"
        data-modal-target="default-modal"
        data-modal-toggle="default-modal"
        onClick={() => setOpenModal(true)}
      >
        <MdAttachMoney className="h-6 w-6 mr-2" />
        Apply For Financing
      </Button>
      <Modal
        show={openModal}
        dismissible
        size="4xl"
        popup
        onClose={() => setOpenModal(false)}
        initialFocus={emailInputRef}
      >
        <Modal.Header />
        <Modal.Body>
          <FinancingApplicationForm
            handleClose={handleClose}
            headingContent={headingContent}
            successContent={successContent}
            modalMode={true}
          />
        </Modal.Body>
      </Modal>
    </>
  )
}
