'use strict';
/* eslint-env node, es6 */

const _ = require('lodash')

/**
 * Returns true if str is a string with a non-zero length.
 * @param  {string}  str - string to check
 * @return {Boolean}
 * @constant
 */
const isNonEmptyString = str => _.isString(str) && !_.isEmpty(str)
 /**
  * Returns true if ary is an array with a non-zero length.
  * @param  {array}  ary - array to check
  * @return {Boolean}
  * @constant
  */
 const isNonEmptyArray = ary => _.isArray(ary) && !_.isEmpty(ary)

 /**
  * Returns true if str is a 24-hour time as 00:00 or 00:00:00
  * @param  {string} str - string to check
  * @return {Boolean}
  */
  const is24HourTimeString = str => _.isString(str) && str.match(/^\d{2}:\d{2}(?::\d{2})?$/)

 /**
  * Return true if str is a string and matches a (naive) RegExp.
  * @param  {string}  str - string to check
  * @return {Boolean}
  * @constant
  */
 const isUrl = str => _.isString(str) && str.match(/^https?:\/\/.+$/)

// returns lodash with custom extensions
module.exports = _.mixin({
  isNonEmptyString,
  isNonEmptyArray,
  is24HourTimeString,
  isUrl
})
