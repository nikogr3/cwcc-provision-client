const Client = require('../src')
const config = require('./config')
const client = new Client(config)

const cache = {
  id: 'AWwf-QKHMYa8Mtuzy-kr'
}

/***********
User
***********/

// be careful when testing this - users can only be soft-deleted

// describe('client.user.create()', function () {
//   it('should create user', function (done) {
//     // build valid body
//     const body = {
//         "type": "user",
//         "attributes": {
//           "lastName__s": "Test",
//           "historicalReportsEnabled__i": 1,
//           "multimediaProfileId__s": "0",
//           "mobile__s": "",
//           "externalId__s": "",
//           "work__s": "",
//           "roleId__s": null,
//           "status__i": 1,
//           "city__s": "RTP",
//           "invalidAttempts__i": 0,
//           "login__s": "mocha_test_1@dcloud.cisco.com",
//           "profileId__s": "AV9TQ286bXnF5AsE1jY5",
//           "street__s": "",
//           "postalCode__s": "27709",
//           "agentProfileId__s": "AV9TQCAJKvTyRq5FvmYa",
//           "locked__i": 0,
//           "timezone__s": null,
//           "country__s": "USA",
//           "siteId__s": "AWX8rlYT_1uTFjV88ROM",
//           "email__s": "mocha_test_1@dcloud.cisco.com",
//           "state__s": "NC",
//           "extMultimediaProfileId__s": "0",
//           "firstName__s": "Mocha",
//           "password__s": "test12345",
//           "defaultDn__s": "",
//           "changePassword__i": 0,
//           "callCenterEnabled__i": 1,
//           "teamIds__sa": [
//             "AWarN054_1uTFjV88j7R"
//           ],
//           "skillProfileId__s": "0"
//         },
//         "login": "mocha_test_1@dcloud.cisco.com",
//         "emailAddress": "mocha_test_1@dcloud.cisco.com",
//         "password": "test12345",
//         "firstName": "Mocha",
//         "lastName": "Test"
//       }
//     // go
//     client.user.create(body)
//     .then(response => {
//
//       console.log(JSON.stringify(response, null, 2))
//
//       // extract new object ID from response
//       // cache.id = response[0].links[0].href.split('/').pop()
//       // log
//       // console.log('created user', 'T_mocha_test_1', ':', cache.id)
//       // success done
//       done()
//     })
//     .catch(e => {
//       // error / fail done
//       done(e)
//     })
//   })
// })

describe('client.user.get()', function () {
  it('should get user by ID', function (done) {
    client.user.get(cache.id)
    .then(response => {
      // console.log(JSON.stringify(response, null, 2))
      console.log('found user', cache.id, ':', response)
      done()
    })
    .catch(e => {
      done(e)
    })
  })
})

describe('client.user.getByLogin()', function () {
  it('should get user by login name', function (done) {
    client.user.getByLogin('mocha_test_1@dcloud.cisco.com')
    .then(response => {
      // console.log(JSON.stringify(response, null, 2))
      console.log('found user', 'mocha_test_1@dcloud.cisco.com', ':', response)
      done()
    })
    .catch(e => {
      done(e)
    })
  })
})

describe('client.user.list()', function () {
  it('should list users', function (done) {
    client.user.list()
    .then(response => {
      // console.log(JSON.stringify(response, null, 2))
      const summary = response.details.users.map(v => {
        return {
          id: v.id,
          login: v.login,
          emailAddress: v.emailAddress,
          lastName: v.attributes.lastName__s,
          firstName: v.attributes.firstName__s
        }
      })
      console.log('found', response.details.users, 'users:', summary)
      done()
    })
    .catch(e => {
      done(e)
    })
  })
})

describe('client.user.disable()', function () {
  it('should disable user by ID', function (done) {
    client.user.disable(cache.id)
    .then(response => {
      console.log('successfully disabled user', cache.id)
      done()
    })
    .catch(e => {
      done(e)
    })
  })
})
