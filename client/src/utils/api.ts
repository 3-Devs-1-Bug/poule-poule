export interface CreateRoomResponse {
  roomId: string
  userId: string
}

export const createRoom = (): Promise<CreateRoomResponse> => {
  return new Promise(resolve => {
    // mocked API call taking 1000ms...
    setTimeout(
      () => resolve({ roomId: 'room-123456790', userId: 'user-123467890' }),
      1000
    )
  })
}
