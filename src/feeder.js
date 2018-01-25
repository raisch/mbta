'use strict'
/* eslint-env node, es6 */

/** @module */
const fs = require('fs')
const path = require('path')
const assert = require('assert')
const _ = require('lodash')
const dateFormat = require('dateformat')
const axios = require('axios')
const parser = require('csv-parse')

require(path.resolve(__dirname, './mixins')) // extends lodash - side-effect!

/**
 * Url from which to retrieve data.
 * @type {String}
 */
const DATA_URL = 'http://developer.mbta.com/lib/gtrtfs/Departures.csv'

/**
 * Origin used to filter records for a specific station.
 * @type {TripOrigin}
 */
const TARGET_ORIGIN = 'North Station'

/**
 * Columns config for display
 * @type {Array}
 */
const DISPLAY_COLUMNS = [
  {
    title: 'TIME',
    value: rec => _.get(rec, 'ScheduledTime', 'TBD'),
    length: 10
  },
  {
    title: 'DESTINATION',
    value: rec => _.get(rec, 'Destination', 'TBD'),
    length: 20
  },
  {
    title: 'TRIP#',
    value: (rec) => _.get(rec, 'Trip', 'TBD'),
    length: 8
  },
  {
    title: 'TRACK#',
    value: (rec) => _.get(rec, 'Track', 'TBD'),
    length: 8
  },
  {
    title: 'STATUS',
    value: (rec) => _.get(rec, 'Status', 'TBD'),
    length: 14
  }
]

/**
 * Converts a numeric timestamp to a date.
 * @param  {Number} ts - milliseconds since January 1, 1970 (midnight UTC/GMT)
 * @return {Date}
 */
const timestampToDate = (ts) => new Date(Number(ts) * 1000)

/**
 * Iterate over an array of Trips and convert property names to camelCase and timestamp fields to strings.
 * @param  {Array.<Trip>} trips - current active trips
 * @param  {Array.<Fieldname>} fieldnames=('timeStamp'|'scheduledTime') - timestamp fieldnames
 * @return {Array.<Trip>}
 */
const convertTimestamps = (trips, fieldnames = ['TimeStamp', 'ScheduledTime']) => {
  return _.map(trips, trip => {
    fieldnames.forEach(name => {
      const ts = _.get(trip, name, 0)
      const date = timestampToDate(ts)
      const time = dateFormat(date, 'shortTime')
      // console.log({ts,date,time})
      _.set(trip, name, time) // side-effect
    })
    return trip
  })
}

/**
 * Filters trips by trip.origin
 * @param  {Array.<Trip>} trips
 * @param  {string} [origin=TARGET_ORIGIN]
 * @return {Array.<Trip>}
 */
const filterByOrigin = (trips, origin = TARGET_ORIGIN) => _.filter(trips, trip => _.get(trip, 'Origin') === origin)

/**
 * Normalize trip by providing a default for Track.
 * @param  {Trip} trip
 * @return {Trip}
 */
const normalizeTripTrack = trip => {
  let result = _.merge({}, trip)
  if (!_.get(result, 'Track', '')) {
    _.set(result, 'Track', 'TBD')
  }
  return result
}

/**
 * Converts a CSV to an array of Trip objects
 * @param  {string} csv - comma-separated values
 * @return {Array.<Trip>}
 * @async
 */
const csvToObject = (csv) => {
  assert(_.isNonEmptyString(csv), 'requires a csv:String')
  return new Promise(function (resolve, reject) {
    parser(csv, {auto_parse: true, columns: true}, (err, trips) => {
      if (err) {
        reject(err)
        return
      }
      resolve(trips.map(normalizeTripTrack))
    })
  })
}

/**
 * Retrieves data as csv from url.
 * @param  {Url} url [description]
 * @return {string}
 * @async
 */
async function getRemoteData (url) {
  assert(_.isUrl(url), 'requires a url:String')
  let result = {}
  result = await axios.get(url)
    .then(resp => _.get(resp, 'data', ''))
    .catch(console.error)
  // console.log({getRemoteData: result.split(/\r?\n/)})
  return result
}

/**
 * Retrieves csv, converts it to an Object, filters out records matching origin, and converts timestamps into local time strings.
 * @param  {Url} [url=DATA_URL]
 * @return {Array.<Trip>}
 * @async
 */
async function getTrips (url = DATA_URL) {
  assert(_.isUrl(url), 'requires a Url')
  let result = []
  result = await getRemoteData(url)
    .then(csvToObject)
    .then(filterByOrigin)
    .then(convertTimestamps)
  return result
}

module.exports = getTrips

let header = 'CARRIER   '
DISPLAY_COLUMNS.forEach(col => header += col.title.padEnd(col.length || 0, ' '))

const formatTrip = trip => {
  let res = 'MBTA      '
  DISPLAY_COLUMNS.forEach(col => {
    res += (''+col.value(trip)).padEnd(col.length || 0, ' ')
  })
  return res
}

/**
 * Gets current trips, formats and prints them.
 * @return {undefined}
 */
function run () {
  getTrips()
    .then(trips => {
      console.log(header)
      trips.forEach(trip => console.log(formatTrip(trip)))
    })
}

run()

  /**
   * A train trip.
   * @typedef {Object} Trip
   * @property {Timestamp} TimeStamp
   * @property {TripOrigin} Origin
   * @property {TripNumber} Trip
   * @property {TripDestination} Destination
   * @property {Timestamp} ScheduledTime
   * @property {Minutes} Lateness
   * @property {TrackNumber} Track
   * @property {TripStatus} Status
   */

   /**
    * @typedef {number} Timestamp
    */

    /**
     * @typedef {('North Station'|'South Station')} TripOrigin
     */

    /**
     * @typedef {string} TripDestination
     */

   /**
    * @typedef {number} TripNumber
    */

   /**
    * @typedef {number} Minutes
    */

   /**
    * @typedef {number} TrackNumber
    */

   /**
    * @typedef {string} TripStatus
    */

    /**
     * @typedef {string} Fieldname
     */
