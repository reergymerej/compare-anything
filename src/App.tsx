import React from 'react';
import './App.css';
import Rating, {RatingProps} from './Rating';

type State = {
  'Wave Height': number,
  'Texture': number,
  'Water Temp': number,
}

const initialState: State = {
  'Wave Height': 0,
  'Texture': 0,
  'Water Temp': 0,
}

type WeightProps = {
  name: string,
  value: number,
  max: number,
  onChange: (name: string, value: number) => void,
}
const Weight: React.FC<WeightProps> = ({
  name,
  max,
  value,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange(name, parseInt(event.target.value))
  return (
    <div className="Weight">
      <label>{name}</label>
      <input
        type="range"
        min="1"
        max={max}
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

function App() {
  const [state, setState] = React.useState<State>(initialState)
  const [weights, setWeight] = React.useState<State>(initialState)
  const handleChange: RatingProps['onChange'] = (name, value) => {
    setState({
      ...state,
      [name]: value,
    })
  }
  const handleWeightChange: WeightProps['onChange'] = (name, value) => {
    setWeight({
      ...weights,
      [name]: value,
    })
  }
  const ratings = Object.keys(state).sort() as Array<keyof State>
  const score = ratings.reduce((acc, key) => {
    const value = state[key]
    const weight = weights[key]
    return acc + (value * weight)
  }, 0)
  const MAX_RATING = 2
  const MAX_WEIGHT = 15
  const potential = ratings.reduce((acc, key) => {
    const weight = weights[key]
    return acc + weight * MAX_RATING
  }, 0)
  const finalScore = Math.round((score/potential) * 100)
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
      {ratings.map(rating => (
        <Weight
          max={MAX_WEIGHT}
          key={rating}
          name={rating}
          onChange={handleWeightChange}
          value={weights[rating]}
        />
      ))}
      <hr />
      <div>
        <span className="score">{finalScore}</span>
        {score} / {potential}
      </div>
    </div>
  );
}

export default App;
