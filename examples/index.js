const { v1: asc } = require('../dist')

const token = asc.token()
const api = asc(token)
asc.testflight
    .listBuilds(api, {})
    .then(c => {
        console.log('*** RECEIVED', c)
    })
    .catch(e => {
        console.error('*** ERROR', e)
    })
