import { IRates } from '../App'

interface ICurrencySelector {
  rates: IRates
  selectedCurrency: string
  onChange: (currency: string) => void
}

const CurrencySelector = ({ rates, selectedCurrency, onChange }: ICurrencySelector): JSX.Element => {
  return (
    <select value={selectedCurrency} onChange={(e) => onChange(e.target.value)}>
      {Object.values(rates).map((rate) => (
        <option key={rate.CharCode} value={rate.CharCode}>
          {rate.CharCode}
        </option>
        
      ))}
    </select>
  )
}

export default CurrencySelector
