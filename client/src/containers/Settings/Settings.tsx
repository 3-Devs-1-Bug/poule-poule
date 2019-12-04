import React, { FC } from 'react'
import classnames from 'classnames'

import Radio from '../../components/Radio'

import './Settings.scss'

const difficulties = [
  { value: 'easy', label: 'Facile' },
  { value: 'medium', label: 'Intermédiaire' },
  { value: 'hard', label: 'Difficile' }
]

export interface SettingsObject {
  difficulty: string
  duration: number
  speed: number
}

export interface SettingsProps {
  settings: SettingsObject
  className?: string
}

const Settings: FC<SettingsProps> = ({ settings, className }) => {
  const classes = classnames(className, 'Settings')

  return (
    <div className={classes}>
      <h2>Paramètres de la partie</h2>
      <fieldset className='Settings__Setting Settings__Setting--Difficulty'>
        <legend>Niveau de difficulté</legend>
        {difficulties.map(d => (
          <Radio
            key={d.value}
            label={d.label}
            checked={d.value === settings.difficulty}
          />
        ))}
      </fieldset>

      <div className='Settings__Setting Settings__Setting--Duration'>
        <label htmlFor='duration'>Durée de la partie :</label>
        <select name='duration' id='duration'>
          <option value='3'>3</option>
          <option value='5'>5</option>
          <option value='10'>10</option>
        </select>
        <span>manches de jeu.</span>
      </div>

      <div className='Settings__Setting Settings__Setting--Speed'>
        <label htmlFor='speed'>Vitesse de la partie</label>
        <select name='speed' id='speed'>
          <option value='1'>1</option>
          <option value='1.5'>1.5</option>
          <option value='2'>2</option>
        </select>
        <span>secondes entre chaque carte.</span>
      </div>
    </div>
  )
}

export default Settings
