import React, { FC } from 'react'
import { RouteComponentProps, Link } from '@reach/router'
import { Helmet } from 'react-helmet'

export interface NotFoundProps extends RouteComponentProps {}

const NotFound: FC<NotFoundProps> = () => (
  <>
    <Helmet>
      <title>Page introuvable</title>
    </Helmet>
    <p>
      La page que vous recherchez n'existe pas ou a été supprimée. Si vous
      cherchiez à rejoindre une partie, vérifiez bien son numéro.
    </p>
    <br />
    <p>
      Vous pouvez <Link to='/'>retourner à la page d'accueil</Link>.
    </p>
  </>
)

export default NotFound
