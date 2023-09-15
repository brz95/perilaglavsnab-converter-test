interface ICurrencyInput {
  value: string
  onChange: (value: string) => void
}

const CurrencyInput = ({ value, onChange }: ICurrencyInput): JSX.Element => {
  return <input type="number" className="input" value={value} onChange={(e) => onChange(e.target.value)} />
}

export default CurrencyInput
