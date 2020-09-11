import client from './../node_modules/socket-request-client/src/index'

export default async () => {
  const connection = await client('ws://localhost:4444', 'login')
  
  const login = async () => await connection.request({
    url: 'login',
    params: { user: 'TESTUSER', password: 'TESTPASSWORD' }
  })
  
  return {
    login
  }
}