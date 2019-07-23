# cwcc-provision-client
This is a JavaScript library for performing REST operations against the Cisco Webex Contact Center platform (formerly known as CJP, purchased from Broadsoft). Tested against the R10 version/release.

# Usage
Check the test folder for examples of how to use this library. Here is an example:
```js
// import this library
const Client = require('cwcc-provision-client')
// this is the login name for administration on the tenant
const fromAddress = 'admin@mytenant.com'
// this is the API token you get from https://portal.ccone.net/portal/home.html
const apiKey = 'your+token+here'
// your tenant ID
const tenantId = '1000000'
// base REST URL for production
const baseUrl = 'https://rest.ccone.net/aws'
// base REST URL for sandbox
// const baseUrl = 'https://rest-sbxa.ccone.net/aws/api/'

// construct usable client object
const client = new Client({
  fromAddress,
  apiKey,
  tenantId,
  baseUrl
})

// get list of teams
client.team.list()
.then(response => {
  // log entire response
  // console.log(JSON.stringify(response, null, 2))

  // build summary of the response
  const summary = response.auxiliaryDataList.map(v => {
    return {
      id: v.id,
      name: v.attributes.name__s
    }
  })
  console.log('found', response.auxiliaryDataList.length, 'Teams:', summary)
})
.catch(e => {
  console.log('error listing Teams:', e.message)
})
```
