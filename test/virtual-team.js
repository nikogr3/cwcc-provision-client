const Client = require('../src')
const config = require('./config')
const client = new Client(config)

// set log levels from config
const veryVerbose = config.logLevel === 'veryVerbose'
const verbose = config.logLevel === 'verbose'
const quiet = config.logLevel === 'quiet'

function log (response, normal) {
  if (veryVerbose) {
    console.log(JSON.stringify(response, null, 2))
  } else if (verbose) {
    console.log(response)
  } else if (quiet) {
    //
  } else {
    // normal
    normal()
  }
}

const cache = {}

/************
Virtual Team
************/

// valid object template
const template = {
  "type": "virtual-team",
  "attributes": {
    "outdialPrimaryDidUrl__s": null,
    "primaryPingUrl__s": "",
    "overflowUri__s": "",
    "isDedicated__i": 1,
    "serviceLevelThreshold__i": 3,
    "name__s": "Mocha Test Entry Point",
    "externalId__s": null,
    "recordingPauseDuration__i": 10,
    "channelType__i": 4,
    "status__i": 1,
    "longitude__d": 0,
    "ivrParkUrl__s": null,
    "outdialBackupDidUrl__s": null,
    "pauseResumeEnabled__i": null,
    "latitude__d": 0,
    "maxTimeInQueue__l": 0,
    "areaCodesToBlock__s": "",
    "permitRecording__i": null,
    "billingGroup__s": "0",
    "blockedAreaCodeReconsiderOnError__i": null,
    "acdDescription__s": "",
    "checkCallStatus__i": null,
    "backupPingUrl__s": "",
    "metricsDataPrecedence__sa": "",
    "ivrDnList__s": "",
    "mapGroup__s": "0",
    "vendorId__s": "",
    "timezone__s": "",
    "tollFreeNumber__s": null,
    "label__s": "",
    "permitMonitoring__i": null,
    "acdType__s": "seratel",
    "dnTimeout__i": 60,
    "type__i": 0,
    "maximumActiveCalls__i": 0,
    "ivrRequeueUrl__s": "http://localhost:8000/dCloud/",
    "ccOneQueue__i": 1,
    "callFlowScriptUrl__s": "http://localhost:8000/dCloud/",
    "permitParking__i": null,
    "ccxmlParentDocUrl__s": null,
    "checkAgentAvailability__i": null,
    "maximumDnRetries__i": 3,
    "recordAllCalls__i": null,
    "permitRetransfer__i": null,
    "description__s": "Mocha Test Entry Point",
    "dn__s": null,
    "blockAreaCodes__i": 0
  }
}

describe('client.virtualTeam.create()', function () {
  it('should create virtual team (queue)', function (done) {
    // build valid body
    const body = [template]
    // go
    client.virtualTeam.create(body)
    .then(response => {

      // extract new object ID from response
      cache.id = response[0].links[0].href.split('/').pop()

      log(response, () => {
        console.log('created virtual team', 'Mocha Test Entry Point', ':', cache.id)
      })

      // success done
      done()
    })
    .catch(e => {
      // error / fail done
      done(e)
    })
  })
})

describe('client.virtualTeam.get()', function () {
  it('should get team by ID', function (done) {
    client.virtualTeam.get(cache.id)
    .then(response => {
      log(response, () => {
        console.log('found virtual team', cache.id)
      })
      done()
    })
    .catch(e => {
      done(e)
    })
  })
})

describe('client.virtualTeam.list()', function () {
  it('should list virtual teams', function (done) {
    client.virtualTeam.list()
    .then(response => {
      log(response, () => {
        const summary = response.auxiliaryDataList.map(v => {
          return {
            id: v.id,
            name: v.attributes.name__s
          }
        })
        console.log('found', response.auxiliaryDataList.length, 'Virtual Teams (Queues):', summary)
      })
      done()
    })
    .catch(e => {
      done(e)
    })
  })
})

describe('client.virtualTeam.modify()', function () {
  it('should modify team by ID', function (done) {
    // update a few elements of the template data
    template.attributes.name__s = 'Mocha Test Entry Point - Modified'
    template.attributes.description__s = 'Mocha Test Entry Point - Modified'
    // build valid body
    const body = [template]
    // go
    client.virtualTeam.modify(cache.id, body)
    .then(response => {
      // extract new object ID from response
      cache.id = response[0].links[0].href.split('/').pop()

      log(response, () => {
        console.log('modified virtual team', 'Mocha Test Entry Point', ':', cache.id)
      })

      done()
    })
    .catch(e => {
      done(e)
    })
  })
})

describe('client.virtualTeam.disable()', function () {
  it('should disable (soft-delete) virtual team by ID', function (done) {
    client.virtualTeam.disable(cache.id)
    .then(response => {
      log(response, () => {
        console.log('successfully disabled virtual team', cache.id)
      })
      done()
    })
    .catch(e => {
      done(e)
    })
  })
})

describe('client.virtualTeam.delete()', function () {
  it('should delete (hard-delete) virtual team by ID', function (done) {
    client.virtualTeam.delete(cache.id)
    .then(response => {
      log(response, () => {
        console.log('successfully deleted virtual team', cache.id)
      })
      done()
    })
    .catch(e => {
      done(e)
    })
  })
})
