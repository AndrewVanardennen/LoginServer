import server from 'socket-request-server'
import ecdh from 'crypto-ecdh';
import cards from './data/cards.js'

export default (async () => {
  const users = {}
  return server({ port: 5555, protocol: 'login' }, {
    handshake: (params, response) => {
      const pair = ecdh()
      const pubKey = pair.public

      pair.derive(params.public)
      users[params.public] = pair

      response.send(pubKey)
    },
    login: async (params, response) => {
      const pair = users[params.public]
      const result = await pair.decrypt(params.value)

      const enc = await pair.encrypt(result)
      response.send(enc.toString())
    },
    card: async (params, response) => {
      const pair = users[params.public]
      const result = await pair.decrypt(params.value)

      const enc = await pair.encrypt(JSON.stringify(cards[Number(result)]))

      response.send(enc.toString())
    }
  })
})()
