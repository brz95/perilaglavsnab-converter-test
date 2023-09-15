interface ICurrencyInput {
  value: string
  onChange: (value: string) => void
}

const CurrencyInput = ({ value, onChange }: ICurrencyInput): JSX.Element => {
  return (
    <input
      type="number"
      className="input"
      inputMode="numeric"
      pattern="[0-9]*"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default CurrencyInput
