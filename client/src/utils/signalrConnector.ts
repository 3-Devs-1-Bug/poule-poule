import * as SignalR from '@microsoft/signalr'
import { HubConnection } from '@microsoft/signalr'

const API_URL: string = 'https://localhost:5001'

const connectToGameHub = (
  gameId: number,
  onStart: any = null
): HubConnection => {
  const connection = new SignalR.HubConnectionBuilder()
    .withUrl(`${API_URL}/gameHub?gameId=${gameId}`)
    .withAutomaticReconnect()
    .configureLogging(SignalR.LogLevel.Debug)
    .build()

  return connection
}

export default connectToGameHub
