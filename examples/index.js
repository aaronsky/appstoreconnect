const { readFileSync } = require('fs')
const path = require('path')
const { env } = require('process')
const { v1: asc } = require('../dist')

let privateKey
if (env.ASC_PRIVATE_KEY) {
    privateKey = env.ASC_PRIVATE_KEY
} else if (env.ASC_PRIVATE_KEY_PATH) {
    privateKey = readFileSync(path.normalize(env.ASC_PRIVATE_KEY_PATH))
} else {
    privateKey = ''
}
const kid = env.ASC_KEY_ID || ''
const issuerId = env.ASC_ISSUER_ID || ''

const token = asc.token(privateKey, issuerId, kid)
const api = asc(token)
asc.testflight
    .listBuilds(api, {})
    .then(c => {
        console.log(JSON.stringify(c))
    })
    .catch(e => {
        console.error(e)
    })
