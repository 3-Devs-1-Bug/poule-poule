import * as SignalR from '@microsoft/signalr'
import { HubConnection } from '@microsoft/signalr'

const connectToGameHub = (
  gameId: number,
  onStart: any = null
): HubConnection => {
  const connection = new SignalR.HubConnectionBuilder()
    .withUrl(`${process.env.REACT_APP_API_URL}/gameHub?gameId=${gameId}`)
    .withAutomaticReconnect()
    .configureLogging(SignalR.LogLevel.Debug)
    .build()

  return connection
}

export default connectToGameHub
