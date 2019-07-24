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

const cache = {
  // id: 'AWv8etigQK-DHWzALZKO'
  // id: 'AWv8ewD3uEtVTpuO-UEI'
  id: 'AWv8etigQK-DHWzALZKO'
}

/************
Routing Strategy
************/

// valid object template
const template = {
  // "id": "AWv8etigQK-DHWzALZKO",
  // "auxiliaryDataType": "RESOURCES",
  "type": "routing-strategy",
  "attributes": {
    "mediaFileIds__sa": [
      "AWX8rlE7_1uTFjV88RNr",
      "AWX8rlE7_1uTFjV88RNr"
    ],
    "legacyJscriptId__l": 1004751,
    // "_lmts__l": 1563309037727,
    "jscriptId__s": "AWtmnszFhW2lRXH-xYYF",
    "startTimestamp__l": 1563249600000,
    "saturday__i": 1,
    "legacyVirtualTeamId__l": 1012293,
    "name__s": "RS_dCloud_0325",
    "thursday__i": 1,
    "strategyStatus__s": "active",
    "status__i": 1,
    "script__s": "<call-distribution-script name=\"RS_dCloud_2020\" scriptid=\"1563309037656\" status=\"active\" start-date=\"1563235200000\" end-date=\"1752624000000\" execution-start-time-of-day=\"18000000\" execution-end-time-of-day=\"18000000\" repetition=\"daily\" xmlns=\"http://cha.transerainc.com/gen/cds\">\n  <day-of-week>sunday</day-of-week>\n  <day-of-week>monday</day-of-week>\n  <day-of-week>tuesday</day-of-week>\n  <day-of-week>wednesday</day-of-week>\n  <day-of-week>thursday</day-of-week>\n  <day-of-week>friday</day-of-week>\n  <day-of-week>saturday</day-of-week>\n  <vdn enterprise-id=\"1000148\" enterprise-name=\"dCloud\" id=\"1012293\" vteam-id=\"1012293\" vteam-name=\"Q_dCloud_2020\" uri=\"\" maximum-time-in-queue=\"9999\" is-monitoring-permitted=\"true\" is-queuing-permitted=\"true\" is-recording-permitted=\"true\" is-retransfer-permitted=\"false\" overflow-uri=\"\" algorithm=\"longest-waiting-agent-based\" num-ring-no-answer-retries=\"3\" num-teams-to-try-for-other-failures=\"3\">\n    <ivr-url park-url=\"http://localhost/dCloud/defaultmusic_on_hold.wav\" requeue-url=\"http://localhost:8000/dCloud/\"/>\n    <load-balance>\n      <cycle number=\"1\">\n        <agent-group id=\"1004427\" name=\"T_dCloud_2020\" display-name=\"T_dCloud_2020\" enterprise-id=\"1000148\" enterprise-name=\"dCloud\" site-id=\"1000350\" site-name=\"Site-1\" site-display-name=\"Site-1\" capacity=\"0\" status=\"active\" uri=\"0\" priority=\"0\"/>\n      </cycle>\n    </load-balance>\n  </vdn>\n  <call-flow-params>\n    <param name=\"MIQ2\" value=\"defaultmusic_on_hold.wav\" valueDataType=\"string\" qualifier=\"mediaFile\" description=\"(mediaFile, A valid media file.)\"/>\n  </call-flow-params>\n</call-distribution-script>",
    // "tid": "1000148",
    "endDate__l": 1752624000000,
    "daily__i": 1,
    "tuesday__i": 1,
    "virtualTeamId__s": "AWwlRZnHQK-DHWzALbtD",
    "defaultFlag__i": 0,
    "monday__i": 1,
    "grs__i": 0,
    "startDate__l": 1563235200000,
    "currentStatus__i": 0,
    "friday__i": 1,
    // "cstts": 1563309037727,
    "endTimestamp__l": 1752724800000,
    "wednesday__i": 1,
    "sunday__i": 1,
    "startTime__l": 18000000,
    "endTime__l": 18000000
  }
}

// describe('client.routingStrategy.create()', function () {
//   it('should create routing strategy', function (done) {
//     // build valid body
//     const body = [template]
//     // go
//     client.routingStrategy.create(body)
//     .then(response => {
//
//       // extract new object ID from response
//       cache.id = response[0].links[0].href.split('/').pop()
//
//       log(response, () => {
//         console.log('created routing strategy', 'Mocha Test Entry Point', ':', cache.id)
//       })
//
//       // success done
//       done()
//     })
//     .catch(e => {
//       // error / fail done
//       done(e)
//     })
//   })
// })

describe('client.routingStrategy.get()', function () {
  it('should get team by ID', function (done) {
    client.routingStrategy.get(cache.id)
    .then(response => {
      log(response, () => {
        console.log('found routing strategy', cache.id)
      })
      done()
    })
    .catch(e => {
      done(e)
    })
  })
})

describe('client.routingStrategy.list()', function () {
  it('should list routing strategies', function (done) {
    client.routingStrategy.list()
    .then(response => {
      log(response, () => {
        const summary = response.auxiliaryDataList.map(v => {
          return {
            id: v.id,
            name: v.attributes.name__s
          }
        })
        console.log('found', response.auxiliaryDataList.length, 'routing strategies:', summary)
      })
      done()
    })
    .catch(e => {
      done(e)
    })
  })
})

// describe('client.routingStrategy.modify()', function () {
//   it('should modify team by ID', function (done) {
//     // update a few elements of the template data
//     template.attributes.name__s = 'Mocha Test Entry Point - Modified'
//     template.attributes.description__s = 'Mocha Test Entry Point - Modified'
//     // build valid body
//     const body = [template]
//     // go
//     client.routingStrategy.modify(cache.id, body)
//     .then(response => {
//       // extract new object ID from response
//       cache.id = response[0].links[0].href.split('/').pop()
//
//       log(response, () => {
//         console.log('modified routing strategy', 'Mocha Test Entry Point', ':', cache.id)
//       })
//
//       done()
//     })
//     .catch(e => {
//       done(e)
//     })
//   })
// })
//
// describe('client.routingStrategy.disable()', function () {
//   it('should disable (soft-delete) routing strategy by ID', function (done) {
//     client.routingStrategy.disable(cache.id)
//     .then(response => {
//       log(response, () => {
//         console.log('successfully disabled routing strategy', cache.id)
//       })
//       done()
//     })
//     .catch(e => {
//       done(e)
//     })
//   })
// })
//
// describe('client.routingStrategy.delete()', function () {
//   it('should delete (hard-delete) routing strategy by ID', function (done) {
//     client.routingStrategy.delete(cache.id)
//     .then(response => {
//       log(response, () => {
//         console.log('successfully deleted routing strategy', cache.id)
//       })
//       done()
//     })
//     .catch(e => {
//       done(e)
//     })
//   })
// })
