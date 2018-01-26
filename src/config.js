'use strict';
/* eslint-env node, es6 */

/** @module */

const path = require('path')
const _ = require(path.resolve(__dirname, './lodashEx'))

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
 * Config for displayed columns
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
    value: rec => _.get(rec, 'Trip', 'TBD'),
    length: 8
  },
  {
    title: 'TRACK#',
    value: rec => _.get(rec, 'Track', 'TBD'),
    length: 8
  },
  {
    title: 'STATUS',
    value: rec => _.get(rec, 'Status', 'TBD'),
    length: 14
  }
]

module.exports = {DATA_URL, TARGET_ORIGIN, DISPLAY_COLUMNS}
