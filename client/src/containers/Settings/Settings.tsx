import React, { Component, ChangeEvent } from 'react'

import Radio from '../../components/Radio'
import { Settings as SettingsType } from '../../types/Settings'
import { Difficulties } from '../../types/Difficulties'
import './Settings.scss'

const difficulties = [
  { value: Difficulties.EASY, label: 'Facile' },
  { value: Difficulties.MEDIUM, label: 'Intermédiaire' },
  { value: Difficulties.HARD, label: 'Difficile' }
]
const durations = [3, 5, 10]
const speeds = [1.5, 2, 2.5]

export interface SettingsProps {
  settings: SettingsType
  className?: string
}

export interface SettingsState {
  difficulty: string
  duration: number
  speed: number
}

class Settings extends Component<SettingsProps, SettingsState> {
  state: SettingsState = {
    difficulty: this.props.settings.difficulty,
    duration: this.props.settings.roundsToWin,
    speed: this.props.settings.cardSpeed
  }

  handleDifficultyChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      difficulty: e.target.value
    })
  }

  handleDurationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      duration: parseFloat(e.target.value)
    })
  }

  handleSpeedChange = (e: ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      speed: parseFloat(e.target.value)
    })
  }

  render() {
    return (
      <div className='Settings'>
        <h2>Paramètres de la partie</h2>
        <fieldset className='Settings__Setting Settings__Setting--Difficulty'>
          <legend>Niveau de difficulté</legend>
          {difficulties.map(({ value, label }) => (
            <Radio
              key={value}
              label={label}
              value={value}
              checked={value === this.state.difficulty}
              onChange={this.handleDifficultyChange}
              name='difficulty'
            />
          ))}
        </fieldset>

        <div className='Settings__Setting Settings__Setting--Duration'>
          <label htmlFor='duration'>Durée de la partie :</label>
          <select
            name='duration'
            id='duration'
            value={this.state.duration}
            onChange={this.handleDurationChange}
          >
            {durations.map(duration => (
              <option key={duration} value={duration}>
                {duration}
              </option>
            ))}
          </select>
          <span>manches de jeu.</span>
        </div>

        <div className='Settings__Setting Settings__Setting--Speed'>
          <label htmlFor='speed'>Vitesse de la partie</label>
          <select
            name='speed'
            id='speed'
            value={this.state.speed}
            onChange={this.handleSpeedChange}
          >
            {speeds.map(speed => (
              <option key={speed} value={speed}>
                {speed}
              </option>
            ))}
          </select>
          <span>secondes entre chaque carte.</span>
        </div>
      </div>
    )
  }
}

export default Settings
