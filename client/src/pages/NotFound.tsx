import React, { FC } from 'react'
import { RouteComponentProps, Link } from '@reach/router'
import { Helmet } from 'react-helmet'

export interface NotFoundProps extends RouteComponentProps {}

const NotFound: FC<NotFoundProps> = () => (
  <>
    <Helmet>
      <title>Erreur 404 : page non trouvée</title>
    </Helmet>
    <h2>Page Not Found</h2>
    <Link to='/'>Go to homepage</Link>
  </>
)

export default NotFound
