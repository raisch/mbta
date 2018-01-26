const assert = require('assert')
const path = require('path')
const _ = require(path.resolve(__dirname, '../src/lodashEx')) // lodash with mixins

describe('lodashEx', function() {
  describe('#isNonEmptyString()', function () {
    it('should return false for an empty string', function () {
      assert(!_.isNonEmptyString(''))
    })
    it('should return false for a non-string',function () {
      assert(!_.isNonEmptyString(1))
    })
    it('should return true for a non-empty string', function () {
      assert(_.isNonEmptyString('foo'))
    })
  })

  describe('#isNonEmptyArray()', function() {
    it('should return false for an empty array', function () {
      assert(!_.isNonEmptyArray([]))
    })
    it('should return false for a non-array',function () {
      assert(!_.isNonEmptyArray(1))
    })
    it('should return true for a non-empty array', function () {
      assert(_.isNonEmptyArray([1]))
    })
  })

  describe('#is24HourTimeString()', function() {
    it('should return false for a non-string', function () {
      assert(!_.is24HourTimeString(''))
    })
    it('should return false for an empty string', function () {
      assert(!_.is24HourTimeString(''))
    })
    it('should return false for "foo"', function () {
      assert(!_.is24HourTimeString('foo'))
    })
    it('should return true for an 24-hour time string with hours and minutes', function () {
      assert(_.is24HourTimeString('13:00'))
    })
    it('should return true for an 24-hour time string with hours, minutes and seconds', function () {
      assert(_.is24HourTimeString('13:00:00'))
    })
  })

  describe('#isUrl', function() {
    it('should return false for a non-string', function () {
      assert(!_.isUrl(1))
    })
    it('should return false for an empty string',function () {
      assert(!_.isUrl(''))
    })
    it('should return false for a non-Url', function () {
      assert(!_.isUrl('foo'))
    })
    it('should return true for an http Url',function () {
      assert(_.isUrl('http://path'))
    })
    it('should return true for an https Url',function () {
      assert(_.isUrl('https://path'))
    })
  })
})
