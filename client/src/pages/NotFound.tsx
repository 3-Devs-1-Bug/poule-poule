import React, { FC } from 'react'
import { RouteComponentProps, Link } from '@reach/router'

export interface NotFoundProps extends RouteComponentProps {}

const NotFound: FC<NotFoundProps> = () => (
  <>
    <h2>Page Not Found</h2>
    <Link to='/'>Go to homepage</Link>
  </>
)

export default NotFound
