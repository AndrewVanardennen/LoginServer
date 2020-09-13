import client from './../node_modules/socket-request-client/src/index'

export default async () => {
  const connection = await client('ws://localhost:4444', 'login')

  const login = async params => await connection.request({
    url: 'login',
    params
  })

  const card = async params => await connection.request({
    url: 'card',
    params
  })

  return {
    login, card
  }
}
