import React, { Component, ChangeEvent } from 'react'

import Radio from '../../components/Radio'
import { Settings as SettingsType } from '../../types/Settings'
import { Difficulty } from '../../types/Difficulty'
import './Settings.scss'

const difficulties = [
  { value: Difficulty.EASY, label: 'Facile' },
  { value: Difficulty.MEDIUM, label: 'Intermédiaire' },
  { value: Difficulty.HARD, label: 'Difficile' }
]

export interface SettingsProps {
  settings: SettingsType
  className?: string
}

export interface SettingsState {
  difficulty: string
  roundsToWin: string
  cardSpeed: string
}

class Settings extends Component<SettingsProps, SettingsState> {
  state: SettingsState = {
    difficulty: this.props.settings.difficulty,
    roundsToWin: this.props.settings.roundsToWin.toString(),
    cardSpeed: this.props.settings.cardSpeed.toString()
  }

  handleDifficultyChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      difficulty: e.target.value
    })
  }

  handleRoundsToWinChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      roundsToWin: e.target.value
    })
  }

  handleCardSpeedChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      cardSpeed: e.target.value
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
          <label htmlFor='roundsToWin'>Durée de la partie :</label>
          <input
            type='number'
            id='roundsToWin'
            value={this.state.roundsToWin}
            onChange={this.handleRoundsToWinChange}
          />
          <span>manches de jeu.</span>
        </div>

        <div className='Settings__Field'>
          <label htmlFor='cardSpeed'>Vitesse de la partie</label>
          <input
            type='number'
            id='cardSpeed'
            value={this.state.cardSpeed}
            onChange={this.handleCardSpeedChange}
          />
          <span>secondes entre chaque carte.</span>
        </div>
      </div>
    )
  }
}

export default Settings
