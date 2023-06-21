
const express = require('express')
var cors = require('cors')
const jose = require('jose')

const app = express()
const port = 4000

const JWKS = jose.createRemoteJWKSet(new URL('http://localhost:8080/realms/master/protocol/openid-connect/certs'))


app.use(cors())

app.use(async (req, res, next) => {
    console.log('Time:', Date.now())
    let authHeader =  req.headers['authorization'];

    if(authHeader === undefined ) {
        res.send('Not Authorized to Access')
    } else {

        try {
        let jwt = authHeader.substring(7);
        const { payload, protectedHeader } = await jose.jwtVerify(jwt, JWKS)
        console.log('verification is successful username:', payload['preferred_username'])
        next()
        } catch(e){
            console.error('Error in JWT validation',e);
            req.send('Invalid Token')
        }
    }
  })


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
