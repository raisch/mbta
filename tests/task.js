const assert = require('assert')
const _ = require('../src/lodashEx')
const task = require('../src/task')

console.log('TODO: expand test coverage')

describe('task', function() {

  describe('#timestampToDate()', function() {
    it('should fail with no arg', function() {
      const expected = 'Invalid Date'
      const actual = task.timestampToDate().toString()
      assert(expected === actual)
    })
    it('should return a result with numeric arg', function() {
      const expected = 'Wed Dec 31 1969 19:00:00 GMT-0500 (EST)'
      const actual = task.timestampToDate(0).toString()
      assert(expected === actual)
    })
    it('should return expected result', function() {
      const expected = 'Sat Jan 20 2018 17:18:20 GMT-0500 (EST)'
      const actual = task.timestampToDate(1516486700).toString()
      assert(expected === actual)
    })
  })

  describe('#convertTimestamps()', function() {
    let tasks
    beforeEach(function() {
      tasks = [{'TimeStamp':1516486700, 'ScheduledTime':1516486700}]
    })
    it('should return expected result', function(){
      const expected = '[{"TimeStamp":"5:18 PM","ScheduledTime":"5:18 PM"}]'
      const actual = JSON.stringify(task.convertTimestamps(tasks))
      assert(expected === actual)
    })
  })

  describe('#filterByOrigin()', function() {
    let tasks
    beforeEach(function() {
      tasks = [{'Origin':'North Station'}, {'Origin':'South Station'}]
    })
    it('should return expected result using defaults', function(){
      const expected = '[{"Origin":"North Station"}]'
      const actual = JSON.stringify(task.filterByOrigin(tasks))
      assert(expected === actual)
    })
    it('should return expected result using supplied origin', function(){
      const expected = '[{"Origin":"South Station"}]'
      const actual = JSON.stringify(task.filterByOrigin(tasks,'South Station'))
      assert(expected === actual)
    })
  })

  describe('#normalizeTripTrack()', function() {
    it('should fail with no arg', function() {
      let trip
      try {
        trip = task.normalizeTripTrack()
      }
      catch (err) {
        return
      }
      throw new Error('should not happen')
    })
    it('should fail with bad arg', function() {
      let trip
      try {
        trip = task.normalizeTripTrack(10)
      }
      catch (err) {
        return
      }
      throw new Error('should not happen')
    })
    it('should use existing track number', function() {
      const expected = '{"Track":10}'
      const actual = JSON.stringify(task.normalizeTripTrack({Track: 10}))
      assert(expected === actual)
    })
    it('should fill-in non-existing track number', function() {
      const expected = '{"Track":"TBD"}'
      const actual = JSON.stringify(task.normalizeTripTrack({}))
      assert(expected === actual)
    })
  })
})
