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
const roundsToWin = [3, 5, 10]
const cardSpeeds = [1.5, 2, 2.5]

export interface SettingsProps {
  settings: SettingsType
  className?: string
}

export interface SettingsState {
  difficulty: string
  roundsToWin: number
  cardSpeed: number
}

class Settings extends Component<SettingsProps, SettingsState> {
  state: SettingsState = {
    difficulty: this.props.settings.difficulty,
    roundsToWin: this.props.settings.roundsToWin,
    cardSpeed: this.props.settings.cardSpeed
  }

  handleDifficultyChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      difficulty: e.target.value
    })
  }

  handleRoundsToWinChange = (e: ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      roundsToWin: parseFloat(e.target.value)
    })
  }

  handleCardSpeedChange = (e: ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      cardSpeed: parseFloat(e.target.value)
    })
  }

  render() {
    return (
      <div className='Settings'>
        <h2>Paramètres de la partie</h2>
        <fieldset className='Settings__Field'>
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

        <div className='Settings__Field'>
          <label htmlFor='duration'>Durée de la partie :</label>
          <select
            name='duration'
            id='duration'
            value={this.state.roundsToWin}
            onChange={this.handleRoundsToWinChange}
          >
            {roundsToWin.map(round => (
              <option key={round} value={round}>
                {round}
              </option>
            ))}
          </select>
          <span>manches de jeu.</span>
        </div>

        <div className='Settings__Field'>
          <label htmlFor='speed'>Vitesse de la partie</label>
          <select
            name='speed'
            id='speed'
            value={this.state.cardSpeed}
            onChange={this.handleCardSpeedChange}
          >
            {cardSpeeds.map(speed => (
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
