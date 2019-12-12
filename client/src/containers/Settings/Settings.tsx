import React, { Component, ChangeEvent } from 'react'
import classnames from 'classnames'

import Radio from '../../components/Radio'
import { Settings as SettingsType } from '../../types/Settings'
import { Difficulty } from '../../types/Difficulty'

import './Settings.scss'

const difficulties = [
  { value: Difficulty.EASY, label: 'Facile' },
  { value: Difficulty.MEDIUM, label: 'Intermédiaire' },
  { value: Difficulty.HARD, label: 'Difficile' }
]

type SettingsProps = SettingsType & {
  className?: string
  updateSettings: (settings: SettingsType) => void
}

interface SettingsState {
  difficulty: string
  roundsToWin: string
  cardSpeed: string
}

class Settings extends Component<SettingsProps, SettingsState> {
  state: SettingsState = {
    difficulty: this.props.difficulty.toString(),
    roundsToWin: this.props.roundsToWin.toString(),
    cardSpeed: this.props.cardSpeed.toString()
  }

  handleDifficultyChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      difficulty: e.target.value
    })
    const { roundsToWin, cardSpeed } = this.props
    const settings: SettingsType = {
      difficulty: Difficulty[e.target.value as keyof typeof Difficulty],
      roundsToWin,
      cardSpeed
    }
    this.props.updateSettings(settings)
  }

  handleRoundsToWinChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      roundsToWin: e.target.value
    })
    const { difficulty, cardSpeed } = this.props
    const settings: SettingsType = {
      difficulty,
      roundsToWin: Number(e.target.value),
      cardSpeed
    }
    this.props.updateSettings(settings)
  }

  handleCardSpeedChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      cardSpeed: e.target.value
    })
    const { difficulty, roundsToWin } = this.props
    const settings: SettingsType = {
      difficulty,
      roundsToWin,
      cardSpeed: Number(e.target.value)
    }
    this.props.updateSettings(settings)
  }

  render() {
    const classes = classnames(this.props.className, 'Settings')
    return (
      <div className={classes}>
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
