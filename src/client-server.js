import server from 'socket-request-server'
import client from 'socket-request-client'
import ecdh from 'crypto-ecdh';

export default (async () => {
  const users = {}

  const pair = ecdh()
  const connection = await client('ws://localhost:5555', 'login')


  const shake = await connection.request({
    url: 'handshake',
    params: {
      public: pair.public
    }
  })
  console.log(shake);
  pair.derive(shake)

  console.log('secure connection established');

  return server({ port: 4444, protocol: 'login' }, {
    login: async (params, response) => {
      let value = await pair.encrypt(JSON.stringify({ user: params.user, password: params.password }))
      value = value.toString()

      let user = await connection.request({
        url: 'login',
        params: {
          public: pair.public,
          value
        }
      })
      user = await pair.decrypt(user)

      response.send(user)
    },
    card: async (params, response) => {
      let value = await pair.encrypt(String(params.value))
      value = value.toString()
      
      let card = await connection.request({
        url: 'card',
        params: {
          public: pair.public,
          value
        }
      })
      card = await pair.decrypt(card)

      response.send(card)
    }
  })
})()
