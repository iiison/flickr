# flickr
--

How to setup:

##First time setup
You need to have Node.js and Gulp installed


### Installing on Ubuntu

```bash
$ sudo apt-get update
$ sudo apt-get install nodejs
$ sudo npm install -g gulp
```
### Installing on Mac OS X

This instruction uses HomeBrew package manager. Refer
[this article](http://thechangelog.com/install-node-js-with-homebrew-on-os-x/)
for details.

```bash
$ brew install node
$ sudo npm install -g gulp
```


### Preparing the repo

```bash
$ git clone https://github.com/iiison/flickr.git
$ cd flickr
$ npm install
```

### Running mock server

```bash
$ npm i http-server
$ http-server .
```

http-server should echo server address, copy that URL in your address bar,
Now you should be able to see everything up and running.