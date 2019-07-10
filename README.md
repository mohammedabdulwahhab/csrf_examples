# Overview
This repo simulates a CSRF attack against a simple bank webserver.


###
see [CSRF Guide in Gitbook](https://furkhan324.gitbook.io/workspace/dev/web/security/csrf-example)


## Usage
Simulate a CSRF attack against either variant of our simple bank server


### Insecure bank webserver

    $ git checkout e7d2b56e6640582d0256c686b13ac83fc6bbbbf9
    $ node bank.js
    $ node attacker.js # Attack succeeds


### Secure bank

    $ git checkout 0f13be88f7b66ab676e58ab63f0a4b10cadf27e1
    $ node bank.js
    $ node attacker.js # Attack fails
