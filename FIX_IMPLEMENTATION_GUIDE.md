# Vue Cal Issue Fixes - Ready to Apply

### Fix #3: Issue #120 - Fix Drag/Drop Overlap Prevention

**Files to Modify:**
- `src/vue-cal/modules/drag-and-drop.js` (overlap validation)

**Current Logic Issue:**
Blocks ANY action if event exists in cell, should check actual time boundaries.

**What to Check:**
1. Overlap detection during drag starts
2. Validation before drop is allowed
3. Android Chrome specific handling (may need touch event review)

**Test Case:**
https://antoniandre.github.io/vue-cal/examples/calendar-events--interactions
- With "overlap prevention" disabled, verify can drop above/below events
- Test on Android Chrome (user reports ALL drops fail there)
- Test edge case: event 09:00-10:00, try to drop 10:00-11:00 (should work)

---

### Fix #5: Issue #74 - Event Callbacks from Click&Hold

**Files to Modify:**
- `src/vue-cal/components/cell.vue` - `createEventIfAllowed` function (line 655)

**Current Issue:**
```javascript
// Cell component has this listener
const cellEventListeners = computed(() => ({
  // ... other listeners
  // But click&hold path doesn't go through createEventIfAllowed properly
}))
```

**What's Working:**
- Drag event creation → emits @event-create ✅

**What's Broken:**
- Click&hold → @cell-hold fires but not @event-create ❌

**Fix Strategy:**
1. Ensure both paths call `createEventIfAllowed`
2. Verify `createEventIfAllowed` emits to parent via callbacks
3. Check config.eventListeners.event.create is called in both paths

**Test Case:**
1. Enable `editable-events` with create: true
2. Click and hold on empty cell (don't drag)
3. Should trigger @event-create callback
4. Should show creation dialog if listener is set

---

### Fix #6: Issue #67 - Week Navigation Edge Case

**Files to Modify:**
- `src/vue-cal/core/view.js` - `next()` or `navigate()` function

**Current Issue:**
Forward button broken when BOTH:
- `startWeekOnSunday: true`
- `hideWeekends: true`

**Working:**
- Backward button ✅
- Today button ✅

**What to Check:**
The week navigation calculation probably adds 7 days, but with hidden weekends, the offset is wrong.

**Likely Code Pattern:**
```javascript
// In next() for week view
const nextDate = dateUtils.addDays(viewDate, 7)
// This doesn't account for Sunday start + hide weekends offset
```

**Test Case:**
1. Open https://antoniandre.github.io/vue-cal/examples/view#ex--hide-elements
2. Switch to Week view
3. Enable "Start Week On Sunday"
4. Enable "Hide Weekends"
5. Click forward arrow → should move forward (currently doesn't)

---

### Fix #7: Issue #121 - Add Schedule Context to Slots

**Files to Modify:**
- `src/vue-cal/components/cell.vue` - Slot definitions (lines 23-28, 54-56)

**Current Slot Props:**
```javascript
<slot name="cell-content" :cell="cellInfo")
```

**Should Be:**
```javascript
<slot name="cell-content" :cell="cellInfo" :schedule="scheduleInfo")
```

Where `scheduleInfo` includes:
```javascript
{
  id: schedule.id,
  events: cellEventsPerSchedule[schedule.id]
}
```

**Implementation:**
1. In cell component setup, create `scheduleInfo` computed
2. Pass to cell-content slot for each schedule
3. Also update schedule-heading slot to include `cell` data

**Test Case:**
1. Set up calendar with schedules
2. Use custom #cell-content slot
3. Verify slot receives both `cell` and `schedule` props
4. Confirm `schedule.events` contains only events in that schedule

---

## Testing Strategy

### Phase 1 (After each fix)
- [ ] No linter errors
- [ ] No TypeScript errors
- [ ] Component still mounts

### Phase 2 (Integration)
- [ ] Existing tests pass
- [ ] Add tests for the specific bug fix
- [ ] Test with provided StackBlitz reproductions

### Phase 3 (Regression)
- [ ] v4 features still work (schedule IDs, callbacks)
- [ ] Mobile/Android Chrome works (DnD)
- [ ] All existing examples work

---

## Files Summary

### Changed Files (Ready for Commit)
- ✅ `src/vue-cal/components/index.vue` - event-create emit

### Files to Change (Next)
- `src/vue-cal/core/events.js` - Multiple fixes
- `src/vue-cal/modules/drag-and-drop.js` - Overlap algorithm
- `src/vue-cal/components/cell.vue` - Multiple fixes
- `src/vue-cal/core/view.js` - Week navigation

### Documentation Files (Already Created)
- `ISSUES_SUMMARY.md` - Executive summary
- `ISSUE_ANALYSIS.md` - Technical details
- This file - Implementation guide

---

## Quick Reference

**Issue Status Dashboard:**

| Issue | Title | Status | Est. Time | Priority |
|-------|-------|--------|-----------|----------|
| #122 | event-create emit | ✅ DONE | 5m | P0 |
| #72 | String schedule IDs | 📋 READY | 1-2h | P0 |
| #120 | DnD overlap | 📋 READY | 2-3h | P0 |
| #75 | Schedule id:0 | 📋 READY | 30m | P1 |
| #74 | Click&hold callbacks | 📋 READY | 1h | P1 |
| #67 | Week nav edge case | 📋 READY | 1-2h | P1 |
| #121 | Slot schedule data | 📋 READY | 2-3h | P2 |

**Total Development Time Estimate:**
- Phase 1 (P0): ~3.5-4 hours
- Phase 2 (P1): ~2-3 hours
- Phase 3 (P2): 2-3 hours
- **Total: ~8-10 hours of development**

---

## Related Links

- Canvas Dashboard: `issue-analysis.canvas.tsx`
- Full Analysis: `ISSUE_ANALYSIS.md`
- Summary Report: `ISSUES_SUMMARY.md`
- GitHub Issues: https://github.com/antoniandre/vue-cal/issues/
