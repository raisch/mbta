'use strict';
/* eslint-env node, es6 */

// const assert = require('assert')
const _ = require('../src/lodashEx')
const task = require('../src/task')

const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const assert = chai.assert

console.log('TODO: expand test coverage')

describe('task', function () {
  describe('#timestampToDate()', function () {
    it('should fail with no arg', function () {
      const expected = 'Invalid Date'
      const actual = task.timestampToDate().toString()
      assert(expected === actual)
    })
    it('should return a result with numeric arg', function () {
      const expected = 'Wed Dec 31 1969 19:00:00 GMT-0500 (EST)'
      const actual = task.timestampToDate(0).toString()
      assert(expected === actual)
    })
    it('should return expected result', function () {
      const expected = 'Sat Jan 20 2018 17:18:20 GMT-0500 (EST)'
      const actual = task.timestampToDate(1516486700).toString()
      assert(expected === actual)
    })
  })

  describe('#convertTimestamps()', function () {
    let tasks
    beforeEach(function () {
      tasks = [{'TimeStamp': 1516486700, 'ScheduledTime': 1516486700}]
    })
    it('should return expected result', function () {
      const expected = '[{"TimeStamp":"5:18 PM","ScheduledTime":"5:18 PM"}]'
      const actual = JSON.stringify(task.convertTimestamps(tasks))
      assert(expected === actual)
    })
  })

  describe('#filterByOrigin()', function () {
    let tasks
    beforeEach(function () {
      tasks = [{'Origin': 'North Station'}, {'Origin': 'South Station'}]
    })
    it('should return expected result using defaults', function () {
      const expected = '[{"Origin":"North Station"}]'
      const actual = JSON.stringify(task.filterByOrigin(tasks))
      assert(expected === actual)
    })
    it('should return expected result using supplied origin', function () {
      const expected = '[{"Origin":"South Station"}]'
      const actual = JSON.stringify(task.filterByOrigin(tasks, 'South Station'))
      assert(expected === actual)
    })
  })

  describe('#normalizeTripTrack()', function () {
    it('should fail with no arg', function () {
      let trip
      try {
        trip = task.normalizeTripTrack()
      } catch (err) {
        return
      }
      throw new Error('should not happen')
    })
    it('should fail with bad arg', function () {
      let trip
      try {
        trip = task.normalizeTripTrack(10)
      } catch (err) {
        return
      }
      throw new Error('should not happen')
    })
    it('should use existing track number', function () {
      const expected = '{"Track":10}'
      const actual = JSON.stringify(task.normalizeTripTrack({Track: 10}))
      assert(expected === actual)
    })
    it('should fill-in non-existing track number', function () {
      const expected = '{"Track":"TBD"}'
      const actual = JSON.stringify(task.normalizeTripTrack({}))
      assert(expected === actual)
    })
  })

  describe('#csvToObject()', function () {
    let csv

    beforeEach(function() {
      csv = `TimeStamp,Origin,Trip,Destination,ScheduledTime,Lateness,Track,Status
        1516486700,"North Station","1109","Rockport",1516487400,0,,"On Time"
        1516486700,"North Station","1207","Haverhill",1516487700,0,,"On Time"
        1516486700,"North Station","1409","Wachusett",1516488300,0,,"On Time"
        1516486700,"North Station","1311","Lowell",1516489200,0,,"On Time"
        1516486700,"North Station","1159","Newburyport",1516493700,0,,"On Time"
        1516486700,"South Station","1055","Plymouth",1516486800,0,"11","All Aboard"
        1516486700,"South Station","1713","Forge Park / 495",1516486800,0,"3","All Aboard"
        1516486700,"South Station","1011","Middleboro/Lakeville",1516488000,0,,"On Time"
        1516486700,"South Station","1773","Readville",1516488600,0,,"On Time"
        1516486700,"South Station","1513","Worcester / Union Station",1516490400,0,,"On Time"
        1516486700,"South Station","1813","Providence",1516491900,0,,"On Time"
        1516486700,"South Station","1775","Readville",1516492200,0,,"On Time"
        1516486700,"South Station","1613","Needham Heights",1516493400,0,,"On Time"`.replace(/^\s+/mg, '')
    })

    it('should convert expected data', async function() {
      const expected = `[{"TimeStamp":1516486700,"Origin":"North Station","Trip":1109,"Destination":"Rockport","ScheduledTime":1516487400,"Lateness":0,"Track":"TBD","Status":"On Time"},{"TimeStamp":1516486700,"Origin":"North Station","Trip":1207,"Destination":"Haverhill","ScheduledTime":1516487700,"Lateness":0,"Track":"TBD","Status":"On Time"},{"TimeStamp":1516486700,"Origin":"North Station","Trip":1409,"Destination":"Wachusett","ScheduledTime":1516488300,"Lateness":0,"Track":"TBD","Status":"On Time"},{"TimeStamp":1516486700,"Origin":"North Station","Trip":1311,"Destination":"Lowell","ScheduledTime":1516489200,"Lateness":0,"Track":"TBD","Status":"On Time"},{"TimeStamp":1516486700,"Origin":"North Station","Trip":1159,"Destination":"Newburyport","ScheduledTime":1516493700,"Lateness":0,"Track":"TBD","Status":"On Time"},{"TimeStamp":1516486700,"Origin":"South Station","Trip":1055,"Destination":"Plymouth","ScheduledTime":1516486800,"Lateness":0,"Track":11,"Status":"All Aboard"},{"TimeStamp":1516486700,"Origin":"South Station","Trip":1713,"Destination":"Forge Park / 495","ScheduledTime":1516486800,"Lateness":0,"Track":3,"Status":"All Aboard"},{"TimeStamp":1516486700,"Origin":"South Station","Trip":1011,"Destination":"Middleboro/Lakeville","ScheduledTime":1516488000,"Lateness":0,"Track":"TBD","Status":"On Time"},{"TimeStamp":1516486700,"Origin":"South Station","Trip":1773,"Destination":"Readville","ScheduledTime":1516488600,"Lateness":0,"Track":"TBD","Status":"On Time"},{"TimeStamp":1516486700,"Origin":"South Station","Trip":1513,"Destination":"Worcester / Union Station","ScheduledTime":1516490400,"Lateness":0,"Track":"TBD","Status":"On Time"},{"TimeStamp":1516486700,"Origin":"South Station","Trip":1813,"Destination":"Providence","ScheduledTime":1516491900,"Lateness":0,"Track":"TBD","Status":"On Time"},{"TimeStamp":1516486700,"Origin":"South Station","Trip":1775,"Destination":"Readville","ScheduledTime":1516492200,"Lateness":0,"Track":"TBD","Status":"On Time"},{"TimeStamp":1516486700,"Origin":"South Station","Trip":1613,"Destination":"Needham Heights","ScheduledTime":1516493400,"Lateness":0,"Track":"TBD","Status":"On Time"}]`

      const res = await task.csvToObject(csv)
      const actual =JSON.stringify(res)
      assert(expected === actual)
    })
  })
})
