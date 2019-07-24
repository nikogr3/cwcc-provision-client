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

/***********
Team
***********/

describe('client.team.create()', function () {
  it('should create team', function (done) {
    // build valid body
    const body = [
      {
        "type": "team",
        "attributes": {
          "priority__i": 0,
          "multimediaProfileId__s": "AWX8rlIDVEprkAUKEc2L",
          "siteId__s": "AWX8rlYT_1uTFjV88ROM",
          "capacity__l": 0,
          "name__s": "T_mocha_test_1",
          "teamType__i": 1,
          "teamDn__s": "0",
          "teamStatus__s": "In Service",
          "status__i": 1,
          "skillProfileId__s": null
        }
      }
    ]
    // go
    client.team.create(body)
    .then(response => {

      // example response:
      //   {
      //     "code": 200,
      //     "details": null,
      //     "links": [
      //         {
      //             "rel": null,
      //             "method": null,
      //             "href": "/auxiliary-data/resources/team/AV9XQ63OKvTyRq5FvmnK"
      //         }
      //     ],
      //     "internal": false
      // }

      // extract new object ID from response
      cache.id = response[0].links[0].href.split('/').pop()

      log(response, () => {
        console.log('created team', 'T_mocha_test_1', ':', cache.id)
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

describe('client.team.get()', function () {
  it('should get team by ID', function (done) {
    client.team.get(cache.id)
    .then(response => {
      log(response, () => {
        console.log('found team', cache.id)
      })
      done()
    })
    .catch(e => {
      done(e)
    })
  })
})

describe('client.team.list()', function () {
  it('should list teams', function (done) {
    client.team.list()
    .then(response => {
      log(response, () => {
        const summary = response.auxiliaryDataList.map(v => {
          return {
            id: v.id,
            name: v.attributes.name__s
          }
        })
        console.log('found', response.auxiliaryDataList.length, 'Teams:', summary)
      })
      done()
    })
    .catch(e => {
      done(e)
    })
  })
})

describe('client.team.modify()', function () {
  it('should modify team by ID', function (done) {
    client.team.modify(cache.id, [
      {
        "id": cache.id,
        "type": "team",
        "attributes": {
          "priority__i": 3,
          "multimediaProfileId__s": "AWX8rlIDVEprkAUKEc2L",
          "siteId__s": "AWX8rlYT_1uTFjV88ROM",
          "capacity__l": 0,
          "name__s": "T_mocha_test_1",
          "teamType__i": 1,
          "teamDn__s": "0",
          "teamStatus__s": "In Service",
          "status__i": 1,
          "skillProfileId__s": ""
        }
      }
    ])
    .then(response => {
      // extract new object ID from response
      cache.id = response[0].links[0].href.split('/').pop()

      log(response, () => {
        console.log('modified team', 'T_mocha_test_1', ':', cache.id)
      })

      done()
    })
    .catch(e => {
      done(e)
    })
  })
})

describe('client.team.delete()', function () {
  it('should delete team by ID', function (done) {
    client.team.delete(cache.id)
    .then(response => {
      log(response, () => {
        console.log('successfully deleted team', cache.id)
      })
      done()
    })
    .catch(e => {
      done(e)
    })
  })
})
