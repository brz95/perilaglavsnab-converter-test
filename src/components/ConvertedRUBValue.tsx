import React from 'react'

interface IConvertedRUBValue {
  valueInRUB: number | undefined
  onRUBChange: (value: number) => void
}

const ConvertedRUBValue = ({ valueInRUB, onRUBChange }: IConvertedRUBValue): JSX.Element => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value)
    if (!isNaN(newValue)) {
      onRUBChange(newValue)
    } else {
      onRUBChange(0)
    }
  }

  return (
    <div className='rub-container'>
      <input
        type="number"
        className="input-rub"
        value={valueInRUB === 0 ? '' : valueInRUB}
        onChange={handleInputChange}
      />
      <p className='rub'>₽</p>
    </div>
  )
}

export default ConvertedRUBValue
