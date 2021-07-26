import React from 'react';

type RadioProps = {
  name: string,
  value: string,
  checked: boolean,
  onChange: (value: string) => void,
}
const Radio: React.FC<RadioProps> = ({
  name,
  checked,
  value,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked === true) {
      onChange(value)
    }
  }
  return (
    <input
      checked={checked}
      type="radio"
      name={name}
      value={value}
      onChange={handleChange}
    />
  )
}

type RadioGroupProps = {
  values: number[]
  value: number,
  name: string,
  onChange: (value: number) => void,
}
const RadioGroup: React.FC<RadioGroupProps> = ({
  values,
  value,
  onChange,
  name,
}) => {
  const handleChange = (value: string) => onChange(parseInt(value))
  return (
    <>
      {values.map(thisValue => (
        <Radio
          key={thisValue}
          value={thisValue + ''}
          checked={thisValue === value}
          name={name}
          onChange={handleChange}
        />
      ))}
    </>
  )
}

export type RatingProps = {
  name: string,
  value: number,
  onChange: (name: string, value: number) => void,
}
const Rating: React.FC<RatingProps> = ({
  name,
  value,
  onChange,
}) => {
  const handleChange = (value: number) => onChange(name, value)
  return (
    <div className="Rating">
      <label>{name}</label>
      <RadioGroup
        values={[0, 1, 2]}
        onChange={handleChange}
        value={value}
        name={name}
      />
    </div>
  )
}

export default Rating
