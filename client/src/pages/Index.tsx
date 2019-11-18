import React, { FC } from 'react'
import { RouteComponentProps } from '@reach/router'

import Button from '../components/Button'

export interface IndexProps extends RouteComponentProps {}

const Index: FC<IndexProps> = () => (
  <>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, temporibus
      voluptatum pariatur, deserunt voluptas natus impedit tempore deleniti
      officia facilis cum expedita, vero illum debitis magnam. Enim, inventore!
      Reprehenderit, nulla.
    </p>

    <Button>I'm a normal button</Button>
    <Button primary>I'm a primary button</Button>
  </>
)

export default Index
