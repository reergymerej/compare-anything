import React from 'react';
import './App.css';

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

type RatingProps = {
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

type State = {
  'Wave Height': number,
  'Texture': number,
  'Water Temp': number,
}

function App() {
  const [state, setState] = React.useState<State>({
    'Wave Height': 0,
    'Texture': 0,
    'Water Temp': 0,
  })
  const handleChange: RatingProps['onChange'] = (name, value) => {
    setState({
      ...state,
      [name]: value,
    })
  }
  console.log(state)
  const ratings = Object.keys(state) as Array<keyof State>
  return (
    <div className="App">
      {ratings.map(rating => (
        <Rating
          key={rating}
          name={rating}
          onChange={handleChange}
          value={state[rating]}
        />
     ))}
    </div>
  );
}

export default App;
