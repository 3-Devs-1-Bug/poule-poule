import React, { FC } from 'react'
import classnames from 'classnames'

import './Settings.scss'

export interface SettingsProps {
  className?: string
}

const Settings: FC<SettingsProps> = ({ className }) => {
  const classes = classnames(className, 'Settings')

  return (
    <div className={classes}>
      <h2>Paramètres de la partie</h2>
      <fieldset className='Settings__Setting Settings__Setting--Difficulty'>
        <legend>Niveau de difficulté</legend>
        <label htmlFor='easy'>Facile</label>
        <input type='radio' name='difficulty' id='easy' value='easy' />
        <label htmlFor='medium'>Intermédiaire</label>
        <input type='radio' name='difficulty' id='medium' value='medium' />
        <label htmlFor='hard'>Difficile</label>
        <input type='radio' name='difficulty' id='hard' value='hard' />
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
