import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import {
  getPublicEventId,
  incomingEventChanged,
  sanitizeEventPartial,
  syncEventsFromProp
} from '../src/vue-cal/core/events-sync.js'

describe('events-sync', () => {
  it('getPublicEventId', () => {
    assert.equal(getPublicEventId({ id: 1 }), '1')
    assert.equal(getPublicEventId({ id: '' }), null)
    assert.equal(getPublicEventId({}), null)
  })

  it('sanitizeEventPartial strips _', () => {
    const clean = sanitizeEventPartial({ title: 'A', _: { id: 9 }, _foo: 1 })
    assert.deepEqual(clean, { title: 'A' })
  })

  it('syncEventsFromProp merges by id', () => {
    const a = { id: 1, title: 'One', start: 1, end: 2, _: { id: 10 } }
    const b = { id: 2, title: 'Two', start: 1, end: 2, _: { id: 20 } }
    const target = [a, b]
    const incoming = [
      { id: 1, title: 'One' },
      { id: 2, title: 'Two updated' }
    ]
    const r = syncEventsFromProp(target, incoming, {})
    assert.equal(r.mode, 'merge')
    assert.equal(target.length, 2)
    assert.equal(target[0], a)
    assert.equal(target[1], b)
    assert.equal(b.title, 'Two updated')
    assert.equal(b._.id, 20)
  })

  it('merge skips unchanged events in changed list', () => {
    const a = { id: 1, title: 'One', start: new Date(1000), end: new Date(2000), _: { id: 10 } }
    const target = [a]
    const r = syncEventsFromProp(target, [{ id: 1, title: 'One', start: new Date(1000), end: new Date(2000) }], {})
    assert.equal(r.changed.length, 0)
    assert.equal(a._.id, 10)
  })

  it('incomingEventChanged detects title', () => {
    assert.equal(incomingEventChanged({ title: 'A' }, { title: 'B' }), true)
    assert.equal(incomingEventChanged({ title: 'A' }, { title: 'A' }), false)
  })

  it('incomingEventChanged treats id 1 and "1" as equal', () => {
    assert.equal(incomingEventChanged({ id: 1, title: 'A' }, { id: '1', title: 'A' }), false)
  })

  it('merge noop when list unchanged', () => {
    const a = { id: '1', title: 'One', start: new Date(1000), end: new Date(2000), _: { id: 10 } }
    const target = [a]
    const r = syncEventsFromProp(target, [{ id: '1', title: 'One', start: new Date(1000), end: new Date(2000) }], {})
    assert.equal(r.mode, 'noop')
    assert.equal(r.changed.length, 0)
    assert.equal(target[0], a)
  })

  it('syncEventsFromProp removes missing ids from snapshot', () => {
    const target = [
      { id: 1, title: 'One', start: 1, end: 2, _: { id: 1 } },
      { id: 2, title: 'Two', start: 1, end: 2, _: { id: 2 } }
    ]
    const r = syncEventsFromProp(target, [{ id: 1, title: 'One' }], {})
    assert.equal(r.mode, 'merge')
    assert.equal(r.removed.length, 1)
    assert.equal(target.length, 1)
    assert.equal(target[0].id, 1)
  })

  it('empty target populates on first sync', () => {
    const target = []
    syncEventsFromProp(target, [{ id: 1, title: 'A', start: new Date(), end: new Date() }], {})
    assert.equal(target.length, 1)
    assert.equal(target[0].title, 'A')
  })

})
