const request = require('request-promise-native')

module.exports = class Crud {
  constructor (parent, type, suffix, suffix2) {
    this.parent = parent
    this.type = type
    this.suffix = suffix
    this.suffix2 = suffix2
    this.url = parent.urls[type]
    if (!this.url) throw Error('API URL for type ' + type + ' is not defined.')
  }

  /**
  * default options for REST request
  */
  baseOptions () {
    return this.parent.baseOptions()
  }

  /**
  * Creates an object
  * @param {String} body - the new object's body
  * @return {Promise} the request promise, which resolves to undefined when
  * successful
  */
  create (body) {
    // build base options for REST request
    const options = this.baseOptions()
    // get the REST URL path for this object type
    options.url = this.parent.urls[this.type]
    // set REST operation to POST
    options.method = 'POST'
    // attach data to request body
    options.body = body
    // return the request promise
    return request(options)
  }

  /**
  * Retrieve single object
  * @param {String} id - the object ID
  * @return {Promise} the request promise, which resolves to the object
  */
  get (id) {
    const options = this.baseOptions()
    options.url = this.parent.urls[this.type] + '/' + id
    return request(options)
  }

  /**
  * Lists objects
  * @param {Object} qs - query string
  * @return {Promise} a request-promise-native promise
  */
  list (qs) {
    // build base options for REST request
    const options = this.baseOptions()
    // get the REST URL path for this object type
    options.url = this.parent.urls[this.type]
    // attach query string, if provided
    options.qs = qs
    // return the request promise
    return request(options)
  }

  /**
  * Modifies an object
  * @param {String} id - the object ID (same as username)
  * @param {Object} data - the new data to replace existing data
  * @return {Promise} the request promise, which resolves to undefined when
  * successful
  */
  modify (id, data) {
    // build base options for REST request
    const options = this.baseOptions()
    // get the REST URL path for this object type
    options.url = this.parent.urls[this.type]
    // set REST operation to PUT
    options.method = 'PUT'
    // attach data to request body
    options.body = data
    // set ID of object to be updated in the body
    // options.body[0].id = id
    return request(options)
  }

  /**
  * Hard Deletes an object
  * @param {Integer} id - the ID of the object to delete
  * @return {Promise} the request promise, which resolves to undefined when
  * successful
  */
  delete (id) {
    // build base options for REST request
    const options = this.baseOptions()
    // get the REST URL path for this object type
    options.url = this.parent.urls[this.type] + '/' + id
    // set REST operation to DELETE
    options.method = 'DELETE'
    // return promise
    return request(options)
  }

  /**
  * Soft Deletes an object
  * @param {Integer} id - the ID of the object to delete
  * @return {Promise} the request promise, which resolves to undefined when
  * successful
  */
  disable (id) {
    // build base options for REST request
    const options = this.baseOptions()
    // get the REST URL path for this object type
    options.url = this.parent.urls[this.type]
    // set REST operation to PUT
    options.method = 'PUT'
    // get type string in dashed format
    const type = options.url.split('/').pop()
    // build REST body to soft-delete (disable) object
    if (type === 'users') {
      // users API has different format 🙄
      options.body = {
        id,
        type: 'user',
        attributes: {
          status__i: 0
        }
      }
    } else {
      options.body = [
        {
          id,
          type,
          attributes: {
            status__i: 0
          }
        }
      ]
    }
    // return promise
    return request(options)
  }
}
