const qrcode = require('qrcode-terminal')
const { Client } = require('whatsapp-web.js')
const client = new Client()
const texts = require('./texts.js')

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true })
})

client.on('ready', () => {
  console.log('Client is ready!')
})

let simplifyCommandExecuted = false
let firstCommandExecuted = false
let messageExecuted = 0

client.on('message', (message) => {
  if (message.body === 'join') {
    simplifyCommandExecuted = true
    message.reply(texts.welcomeMessage).catch(handleError)
  } else if (simplifyCommandExecuted) {
    if (message.body === '1') {
      message
        .reply(texts.quoteOptionsMessage + '\n' + texts.products)
        .catch(handleError)
      firstCommandExecuted = true
      messageExecuted = parseInt(message.body)
      simplifyCommandExecuted = false
    } else if (message.body === '2') {
      message
        .reply(texts.supportOptionsMessage + '\n' + texts.products)
        .catch(handleError)
      firstCommandExecuted = true
      messageExecuted = parseInt(message.body)
      simplifyCommandExecuted = false
    } else if (message.body === '3') {
      message.reply(texts.aboutUsMessage).catch(handleError)
      simplifyCommandExecuted = true
    }
  } else if (firstCommandExecuted) {
    if (messageExecuted === 1) {
      if (
        message.body === '1' ||
        message.body === '2' ||
        message.body === '3' ||
        message.body === '4'
      ) {
        message.reply(texts.needMessage).catch(handleError)
      }
    } else if (messageExecuted === 2) {
      if (
        message.body === '1' ||
        message.body === '2' ||
        message.body === '3' ||
        message.body === '4'
      ) {
        message.reply(texts.problemMessage).catch(handleError)
      }
    }
  }
})

function handleError(error) {
  console.error(error)
}

client.initialize()
