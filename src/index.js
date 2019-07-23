// const request = require('request-promise-native')
const crypto = require('crypto')
const Crud = require('./crud')
const urls = require('./urls')
const request = require('request-promise-native')

module.exports = class {
  constructor ({
    fromAddress,
    apiKey,
    tenantId,
    // use default production base URL if none specified
    baseUrl = 'https://rest.ccone.net/aws'
  }) {
    // validate constructor input
    if (!fromAddress || !apiKey || !tenantId) {
      throw Error('fromAddress, apiKey, and tenantId are required parameters for this constructor.')
    }
    // copy parameters to local class properties
    this.fromAddress = fromAddress
    this.apiKey = apiKey
    this.tenantId = tenantId
    this.baseUrl = baseUrl

    // REST URLs list
    this.urls = urls

    // HMAC hash the admin username using the API token as key
    // and return as base64
    this.authKey = crypto.createHmac('sha1', apiKey)
    .update(fromAddress)
    .digest('base64')

    // build REST request base options
    // this.options = {
    //   baseUrl: this.baseUrl,
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'From': this.fromAddress,
    //     'Authorization': `${this.authKey}; tenantId=${this.tenantId}`
    //   },
    //   json: true
    // }

    // Teams
    this.team = new Crud(this, 'team')
    // Users
    this.user = new Crud(this, 'user')
    // add helper function to get user by login name
    this.user.getByLogin = function (login) {
      const options = this.baseOptions()
      options.url = 'api/auxiliary-data/user-data/user'
      options.qs = {login__s: login}
      return request(options)
    }

    // function getUser (username) {
    //   const url = '/api/auxiliary-data/user-data/user?login__s=' + username
    //   return request(buildOptions({url}))
    // }

  }

  // add URL path to base request options, assign to new object, return it
  // buildOptions (params) {
  //   return Object.assign({}, this.options, params)
  // }

  // REST request base options
  baseOptions () {
    return {
      baseUrl: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'From': this.fromAddress,
        'Authorization': `${this.authKey}; tenantId=${this.tenantId}`
      },
      json: true
    }
  }
}
