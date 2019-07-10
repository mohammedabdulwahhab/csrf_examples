'use strict'
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

// We need cookies and body params
app.use(cookieParser())
app.use(bodyParser())

// Middleware function to authenticate into the webserver
function is_authenticated(req, res, next) {
  console.log('Came here')
  // Check cookies to determine if logged in
  if (req.cookies['session'] == 'secret_token_placed_here'){
    next()
  }
  else{
    res.redirect('/auth')
  }
}


app.get('/auth', (req, res) => {
  console.log('Authenticating', req.query.username, req.query.password)
  // User has valid login
  if (req.query.username == 'username' && req.query.password == 'password'){
      // Add cookie certifying user has authenticated
      res.cookie('session', 'secret_token_placed_here', {
        maxAge: 1000 * 60 * 15, // would expire after 15 minutes
        httpOnly: false, // The cookie only accessible by the web server/not javascript
        signed: false // Indicates if the cookie should be signed
      })

      res.redirect('/')
  }
  // Login was bad
  else {
    res.set('Content-Type', 'text/html');
    res.status(200).send('Click <a href="/auth?username=username&password=password">here to login</a>')
  }
})

const hash = require('crypto-js').SHA256

function generate_csrf_token_from(session){
  return hash(session).toString()
}

app.get('/', is_authenticated, (req, res, next) => {
  console.log('Logged into banking website')
  res.set('Content-Type', 'text/html');
  // Send csrf token in hidden input
  let csrf_token = generate_csrf_token_from(req.cookies['session'])
  res.status(200).send("<h3>Welcome to your bank!</h3><form action='/transfer' method='post'><input id='POST-name' placeholder='recipient' name='recipient'><input id='POST-amount' placeholder='$20' name='amount'><input id='POST-csrf' value='" + csrf_token + "' name='csrf_token' type='hidden'><input type='submit' value='Save'></form>")
})

app.post('/transfer', is_authenticated, (req, res) => {
  // if csrf token in form doesn'tvalidate - FUCK EVERYTHING UP
  if (req.body.csrf_token != generate_csrf_token_from(req.cookies['session'])){
    res.status(403).send('Bad request!')
    return
  }

  console.log('Transferring money to', req.body.recipient, req.body.amount)
  res.set('Content-Type', 'text/html');
  res.status(200).send('<h3>Success! Go back to <a href="/">home</a></h3>')
})


app.listen(port, () => console.log(`Bank app listening on port ${port}!`))
