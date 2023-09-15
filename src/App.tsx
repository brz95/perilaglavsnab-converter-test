import { useState, useEffect } from 'react'
import CurrencyInput from './components/CurrencyInput'
import CurrencySelector from './components/CurrencySelector'
import ConvertedRUBValue from './components/ConvertedRUBValue'
import axios from 'axios'
import Loader from './components/Loader'
import ErrorComponent from './components/ErrorComponent'

type TCurrencyRate = {
  CharCode: string
  Value: number
}

export interface IRates {
  [key: string]: TCurrencyRate
}

interface IStatus {
  isLoading: boolean
  error: string | null
}

const App = (): JSX.Element => {
  const [rates, setRates] = useState<IRates>({})
  const [status, setStatus] = useState<IStatus>({ isLoading: true, error: null })
  const [selectedCurrency, setSelectedCurrency] = useState<string>(localStorage.getItem('currency') || 'USD')
  const [inputValue, setInputValue] = useState<string>('')

  useEffect(() => {
    axios
      .get('https://www.cbr-xml-daily.ru/daily_json.js')
      .then((response) => {
        setRates(response.data.Valute)
        setStatus((prevStatus) => ({ ...prevStatus, isLoading: false }))
      })
      .catch((err) => {
        setStatus({ isLoading: false, error: err.toString() })
      })
  }, [])

  useEffect(() => {
    localStorage.setItem('currency', selectedCurrency || '')
  }, [selectedCurrency])

  const selectedRate = selectedCurrency ? rates[selectedCurrency]?.Value : undefined
  const convertedValue = selectedRate && parseFloat(inputValue) ? selectedRate * parseFloat(inputValue) : 0
  const convertedValueResult = Math.round(convertedValue * 100) / 100

  const handleRUBChange = (newValueInRUB: number) => {
    if (selectedRate && newValueInRUB) {
      const converted = newValueInRUB / selectedRate
      const roundedValue = (converted * 100) / 100
      setInputValue(roundedValue.toString())
    } else {
      setInputValue('')
    }
  }

  if (status.error) {
    return <ErrorComponent error={status.error} />
  }

  return (
    <div className="app">
      <Loader loaderActive={status.isLoading} />
      {!status.isLoading && (
        <div className="content">
          <h1 className='title'>Конвертер валют</h1>
          <CurrencyInput value={inputValue} onChange={setInputValue} />
          <CurrencySelector rates={rates} selectedCurrency={selectedCurrency} onChange={setSelectedCurrency} />
          <ConvertedRUBValue valueInRUB={convertedValueResult} onRUBChange={handleRUBChange} />
        </div>
      )}
    </div>
  )
}

export default App
