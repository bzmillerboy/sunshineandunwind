import FinancingApplicationForm from './FinancingApplicationForm'

interface FinancingApplicationProps {
  successContent?: React.ReactNode
}

export default function FinancingApplication({
  successContent,
}: FinancingApplicationProps) {
  return <FinancingApplicationForm successContent={successContent} />
}
