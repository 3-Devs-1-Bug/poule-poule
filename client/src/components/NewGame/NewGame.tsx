import React, { FC } from 'react'
import classnames from 'classnames'

import './NewGame.scss'

import Button from '../Button/Button'

export interface NewGameProps {
  clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
}

const NewGame: FC<NewGameProps> = ({ clickHandler, className }) => {
  const classes = classnames(className, 'NewGame')
  return (
    <div className={classes}>
      <h2>Nouvelle partie</h2>
      <p className='NewGame__Description'>
        Crée une nouvelle partie avec tes paramètres favoris puis invite tes
        amis.
      </p>
      <Button className='NewGame__Button' onClick={clickHandler}>
        Créer une partie
      </Button>
    </div>
  )
}

export default NewGame
