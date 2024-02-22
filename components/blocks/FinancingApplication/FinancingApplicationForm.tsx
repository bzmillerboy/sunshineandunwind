'use client'

import React from 'react'
import { MdCheck } from 'react-icons/md'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import RequestFinancingFormStep1 from './RequestFinancingFormStep1'

const steps = ['Register', 'Application', 'Submit']

interface FinancingApplicationFormProps {
  successContent?: React.ReactNode
  headingContent?: React.ReactNode
  handleClose?: () => void
  modalMode?: boolean
}

export default function FinancingApplicationForm({
  successContent,
  headingContent,
  handleClose,
  modalMode,
}: FinancingApplicationFormProps) {
  const [activeStep, setActiveStep] = React.useState(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <div className="max-w-3xl m-auto">
      {headingContent}
      <Steps steps={steps} activeStep={activeStep} />
      {activeStep === 0 && (
        <div className="max-w-3xl mx-auto">
          <RequestFinancingFormStep1
            activeStep={activeStep}
            steps={steps}
            handleBack={() => handleBack()}
            handleNext={() => handleNext()}
          />
        </div>
      )}
      {activeStep === 1 && (
        <div className="max-w-3xl mx-auto">
          <div className="text-center">{successContent}</div>
          {modalMode && (
            <div className="flex justify-end">
              <Button variant="ghost" onClick={handleClose && handleClose}>
                Close
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function Steps({ steps, activeStep }: any) {
  return (
    <div className="max-w-3xl m-auto mb-8">
      <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
        {steps.map((label: any, index: any) => (
          <li
            key={label}
            className={`flex  items-center text-neutral-400 dark:text-neutral-400 ${
              index !== 2 &&
              "md:w-full sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
            }`}
          >
            <span
              className={cn(
                "flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500",
                activeStep === index && 'text-brandyellow',
                index === steps.length && 'text-brandyellow',
              )}
            >
              <span className="me-2">
                {activeStep === index + 1 ? (
                  <span
                    className={cn(
                      'flex items-center justify-center w-6 h-6 text-sm border border-neutral-300 rounded-full shrink-0 dark:border-neutral-300',
                      activeStep === index && 'border-brandyellow',
                    )}
                  >
                    <MdCheck />
                  </span>
                ) : (
                  <span
                    className={cn(
                      'flex items-center justify-center w-6 h-6 text-sm border border-neutral-300 rounded-full shrink-0 dark:border-neutral-300',
                      activeStep === index && 'border-brandyellow',
                    )}
                  >
                    {index + 1}
                  </span>
                )}
              </span>

              {label}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
