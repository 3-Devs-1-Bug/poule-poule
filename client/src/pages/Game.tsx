import React, { FC } from 'react'
import { RouteComponentProps } from '@reach/router'
import { useEffect, useState } from 'react'
import * as SignalR from '@microsoft/signalr'
import Button from '../components/Button'

export interface GameProps extends RouteComponentProps {
  id?: string
}

const Game: FC<GameProps> = (props: GameProps) => {
  const [hubConnection, setHubConnection] = useState()
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const connection = new SignalR.HubConnectionBuilder()
      .withUrl(process.env.REACT_APP_API_URL || '')
      .withAutomaticReconnect()
      .configureLogging(SignalR.LogLevel.Debug)
      .build()

    connection.start().catch(err => console.log(err))
    connection.on('ReceiveMessage', () => setCounter(count => count + 1))
    setHubConnection(connection)
  }, [])

  return (
    <>
      This is the game with id <em>{props.id}</em>.<br></br>
      If you open the app in multiple tabs, the counter should increment on
      every client.
      <div>
        <em>{counter}</em>
      </div>
      <Button primary onClick={() => hubConnection.invoke('SendMessage')}>
        Increment
      </Button>
    </>
  )
}

export default Game
