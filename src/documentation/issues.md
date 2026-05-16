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
| #120 | DnD overlap | 📋 READY | 2-3h | P0 |
| #74 | Click&hold callbacks | 📋 READY | 1h | P1 |
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





# Vue Cal Issues Analysis & Fixes Guide

## Summary
Reviewed all 22 open GitHub issues for vue-cal. Found:
- **7 Bug Reports** - 6 are legitimate bugs requiring fixes
- **15 Feature Requests** - Mix of reasonable enhancements and architectural improvements

---

## CRITICAL BUGS (High Priority)

### 1. Issue #122: @event-create Event Not Firing
**Status:** LEGITIMATE BUG
**Severity:** HIGH
**Impact:** Core event creation callback system broken

#### Problem
The `@event-create` event is not emitted when events are created, even though:
- It's defined in the API documentation
- It's used in examples
- The listener infrastructure exists

#### Root Cause
The `event-create` event is NOT included in the `defineEmits` of the root VueCal component (`src/vue-cal/components/index.vue`).

#### Current Code
```typescript
// src/vue-cal/components/index.vue - Line 99-111
const emit = defineEmits([
  'ready',
  'view-change',
  'update:view',
  'update:selectedDate',
  'update:viewDate',
  'update:events',
  'event-delete',
  'event-created',
  'event-dropped',
  'event-drag-start',
  'event-drag-end'
])
```

Notice: `'event-create'` is missing!

#### Fix Required
Add `'event-create'` to the emit definitions in `src/vue-cal/components/index.vue`

---

### 3. Issue #120: Drag/Drop Overlap Prevention Blocks Valid Actions
**Status:** LEGITIMATE BUG
**Severity:** HIGH
**Impact:** UX-breaking - can't place events logically

#### Problem
When overlap prevention is enabled, users cannot:
- Drop events above/below existing events (even when space allows)
- Resize events into available space
- This blocks scheduling workflows on Android Chrome entirely

#### Root Cause
Overlap detection algorithm checks if ANY event exists in cell instead of checking actual overlap boundaries.

Key file: `src/vue-cal/modules/drag-and-drop.js` (overlap validation logic)

#### Fix Required
Review the overlap prevention logic to:
1. Check actual position/time boundaries instead of just cell existence
2. Allow placement when mathematically there's no overlap
3. Test on Android Chrome for drag/drop regression

---

### 5. Issue #74: Event Creation Callbacks Missing from Click&Hold
**Status:** LEGITIMATE BUG
**Severity:** MEDIUM
**Impact:** Alternative event creation method lacks callbacks

#### Problem
When creating events via click&hold (vs. click-drag), the `@event-create` and `@event-created` callbacks don't fire.

#### Root Cause
The click&hold path in cell event handling doesn't emit the same events as the drag path.

Key file: `src/vue-cal/components/cell.vue` - `createEventIfAllowed` function

#### Fix Required
Ensure both event creation paths (drag and click&hold) emit the same events.

---

### 7. Issue #121: #cell-content Slot Missing Schedule Context
**Status:** LEGITIMATE FEATURE GAP
**Severity:** MEDIUM
**Impact:** Users can't identify which schedule sub-cell is rendering

#### Problem
The `#cell-content` slot renders once per schedule but receives no data to identify which schedule or its events.

#### Requested Enhancement
Add `schedule` object to slot props containing:
```javascript
{
  id: scheduleId,
  events: [...events in this schedule]
}
```

Also recommended: add `cell` data to `#schedule-heading` slot for context.

#### Fix Required
Modify cell component slot props to include schedule context when schedules are enabled.

---

## FEATURE REQUESTS (Lower Priority)

| # | Title | Type | Difficulty |
|---|-------|------|-----------|
| 119 | Tailwind utility class theming via props | Enhancement | Medium |
| 118 | Use Temporal API instead of Date | Architecture | High |
| 114 | Time zone support | Feature | High |
| 113 | Mobile screen optimization | UX | Medium |
| 111 | Horizontal schedules | Architecture | High |
| 110 | Multi-week drag & drop | Feature | High |
| 106 | Week number field display | UX | Low |
| 98 | Hybrid event view | View Type | High |
| 97 | TypeScript emit types | Quality | Low |
| 89 | Timeline header for schedules | View Type | Medium |
| 79 | Event count limit + "n more" | UX | Low |
| 77 | Header click event/slot | Extensibility | Low |
| 47 | Top resize handle | UX | Low |
| 30 | Disabled day labels | UX | Low |

---

## Recommended Fix Priority

### Sprint 1 (This Week)
1. **#122** - Add `event-create` to emit (5 min fix)
3. **#120** - Fix overlap prevention logic (2-3 hours)

### Sprint 2 (Next Week)
5. **#74** - Add event callbacks to click&hold path (1 hour)

### Sprint 3 (Following Week)
7. **#121** - Add schedule context to cell-content slot (2-3 hours)

---

## Implementation Notes

### File Locations to Modify

1. **src/vue-cal/components/index.vue** - Line 99-111
   - Add `'event-create'` to emit definitions

2. **src/vue-cal/core/events.js** - Line 174+
   - Fix numeric operations on schedule IDs

3. **src/vue-cal/modules/drag-and-drop.js**
   - Fix overlap detection algorithm

4. **src/vue-cal/components/cell.vue** - Line 655-681
   - Ensure event callbacks fire in all creation paths

5. **src/vue-cal/core/view.js**
   - Fix week navigation calculation for edge case

6. **src/vue-cal/components/cell.vue** - Slot definitions
   - Add schedule context to slots

### Testing Strategy
1. **#122**: Verify @event-create fires in playground
3. **#120**: Test drag/drop on desktop and Android Chrome
5. **#74**: Test click&hold event creation
7. **#121**: Verify schedule object in slot props

---

## Notes on v4 Regressions
Several bugs are regressions from v4:
- Schedule string IDs worked in v4
- Event creation callbacks worked in v4
- This suggests core event handling was refactored - ensure backward compatibility

Recommendation: Add regression tests for v4 features to prevent future issues.



# Vue Cal GitHub Issues - Complete Analysis & Remediation Plan

## Executive Summary

I've reviewed all **22 open GitHub issues** for the vue-cal project. Here's what I found:

- **6 Legitimate Bugs** requiring fixes (HIGH priority)
- **1 Feature Gap** (missing slot data)
- **15 Feature Requests** (reasonable enhancements)

All issues are legitimate - no spam or fake problems.

---

## Detailed Issue Assessment

### CRITICAL BUGS (Fix Immediately)

#### 🔴 #120: Drag/Drop Overlap Prevention Blocks Valid Actions
- **Author:** Soundvessel | **Date:** Apr 11, 2026
- **Status:** NEEDS FIX
- **Impact:** Complete UX break on Android Chrome; desktop users can't logically place events
- **Why Legitimate:** Well-documented with video repro; affects multiple views (day, days, week)
- **Root Cause:** Overlap algorithm checks if ANY event exists vs. checking actual time boundaries
- **Scenarios Blocked:**
  1. Can't drop event above/below existing event when space allows
  2. ALL drops blocked on Android Chrome entirely
- **Additional Note:** External event DnD works on Android (narrows bug location)
- **Fix Difficulty:** 2-3 hours (requires algorithmic review)

#### 🟠 #74: Event Callbacks Missing from Click&Hold
- **Author:** grauerwf | **Date:** Jul 15, 2025
- **Status:** NEEDS FIX
- **Impact:** Alternative event creation method lacks event emission
- **Why Legitimate:** Code path inconsistency - drag creation works, hold doesn't
- **What Works:** `@cell-hold` fires correctly
- **What's Broken:** `@event-create` and `@event-created` don't fire
- **Fix Difficulty:** 1 hour

---

### FEATURE GAPS (Medium Priority)

#### 🟡 #121: #cell-content Slot Lacks Schedule Identifying Data
- **Author:** Soundvessel | **Date:** Apr 17, 2026
- **Status:** NEEDS FIX
- **Why Legitimate:** UX issue - slot renders per schedule but no way to identify which one
- **Requested Data:**
  ```javascript
  slot props should include:
  {
    schedule: {
      id: scheduleId,
      events: [events in this schedule]
    }
  }
  ```
- **Additional Request:** Add `cell` data to `#schedule-heading` slot too
- **Fix Difficulty:** 2-3 hours (requires API addition)
- **User Impact:** Users with custom cell content components can't distinguish schedules

---

## Feature Requests Summary (15 Items)

All feature requests are reasonable and well-articulated. None are spam.

### High-Value Features
1. **#119** - Tailwind utility class theming (users want CSS utility support)
2. **#114** - Time zone support (enterprise feature)
3. **#113** - Mobile optimization (practical need)

### Architecture Changes
4. **#118** - Temporal API + polyfills (forward-thinking, reduces bugs)
5. **#111** - Horizontal schedules (significant view variant)
6. **#110** - Multi-week drag & drop (complex feature)
7. **#98** - Hybrid event view (UI variation)

### UX Enhancements
8. **#115** - Current time badge (low-effort, nice-to-have)
9. **#106** - Week number field (useful for planners)
10. **#89** - Timeline header for schedules (view variant)
11. **#79** - Event count limit + "n more" (month view enhancement)
12. **#77** - Header click event/slot (extensibility)
13. **#47** - Top resize handle (UX improvement)
14. **#30** - Disabled day labels (UX enhancement)

### Code Quality
15. **#97** - TypeScript event types (documentation quality)

---

## Priority Remediation Plan

### Phase 1: Critical Bugs (Next Sprint)
| Issue | Est. Time | Blocker |
|-------|-----------|---------|
| #122 | ✅ DONE | Event creation system |
| #120 | 2-3h | Mobile/Desktop DnD |

### Phase 2: Important Bugs (Following Sprint)
| Issue | Est. Time | Impact |
|-------|-----------|--------|
| #74  | 1h | Event callback consistency |

### Phase 3: Features (When Capacity Allows)
| Issue | Est. Time | Value |
|-------|-----------|-------|
| #121 | 2-3h | Schedule UX |
| #114 | High | Enterprise need |
| #119 | Medium | Modern styling |

---

## Files to Modify for Full Fix

### Immediate (Phase 1)
1. ✅ `src/vue-cal/components/index.vue` - Add event-create emit
2. `src/vue-cal/core/events.js` - Fix numeric schedule ID issues
3. `src/vue-cal/modules/drag-and-drop.js` - Fix overlap algorithm

### Short-term (Phase 2)
4. `src/vue-cal/components/cell.vue` - Multiple fixes:
   - Fix falsy checks on schedule ID (line 174)
   - Ensure callbacks fire in click&hold path
   - Add schedule context to slots
5. `src/vue-cal/core/view.js` - Fix week navigation

### Quality
6. `src/types/vue-cal.ts` - Add event-create to type definitions

---

## Key Insights & Patterns

### V4 Regressions Detected
Multiple bugs are regressions from v4:
- String schedule IDs worked
- Event callbacks worked
- Suggests core event handling was refactored with breaking changes

**Recommendation:** Add regression tests before v5.0.0 release.

### Common Bug Patterns Found
1. **Falsy checks instead of explicit checks** - Issue #75
   - Pattern: `if (scheduleId)` → should be `if (scheduleId !== undefined)`
2. **Numeric type enforcement** - Issue #72
   - Pattern: `~~id` forces integer conversion → should accept strings
3. **Missing event emissions** - Issue #122
   - Pattern: Event listener infrastructure exists but emit definition missing
4. **Code path inconsistencies** - Issue #74
   - Pattern: Drag path ≠ Click&Hold path (should emit same events)

### User Base Observations
- Users are sophisticated: UUIDs, schedules, mobile, TypeScript types
- Production-ready needs: timezone support, mobile, extensibility
- Expected features: Tailwind support, modern APIs

---

## Documentation Status

All issues are:
- ✅ Well-articulated with clear descriptions
- ✅ Properly categorized (bug vs feature)
- ✅ Include reproduction links/steps where applicable
- ✅ Show genuine use cases and requirements

**No spam detected.** All 22 issues represent real user needs.

---

## Recommendations

### For Release v5.0.0
1. Apply Phase 1 fixes before release
2. Mark Phase 2 fixes as "Patch incoming"
3. Add regression tests for v4→v5 compatibility

### For Long-term
1. Implement comprehensive test suite for event callbacks
2. Add TypeScript strict mode checks (catches falsy/type issues)
3. Consider feature request roadmap for #114 (timezone) and #119 (Tailwind)
4. Document breaking changes from v4 explicitly


---





describe('Alignment Checks', () => {
  it('should align all-day label with all-day bar', () => {
    cy.get('.vuecal__all-day-label').then($label => {
      cy.get('.vuecal__all-day').then($bar => {
        const labelRect = $label[0].getBoundingClientRect()
        const barRect = $bar[0].getBoundingClientRect()

        // Top alignment should be within 2px
        expect(Math.abs(labelRect.top - barRect.top)).to.be.lessThan(2)
      })
    })
  })

  it('should align time column with body', () => {
    cy.get('.vuecal__time-column').then($timeCol => {
      cy.get('.vuecal__body').then($body => {
        const timeColRect = $timeCol[0].getBoundingClientRect()
        const bodyRect = $body[0].getBoundingClientRect()

        // Should be positioned correctly
        expect(timeColRect.left).to.be.lessThan(bodyRect.left)
      })
    })
  })

  it('should have equal width schedule columns', () => {
    cy.get('.vuecal__schedule--heading').then($schedules => {
      const widths = []
      $schedules.each((i, el) => {
        widths.push(el.getBoundingClientRect().width)
      })

      // All widths should be equal (within 2px tolerance)
      if (widths.length > 1) {
        const firstWidth = widths[0]
        widths.forEach(width => {
          expect(Math.abs(width - firstWidth)).to.be.lessThan(3)
        })
      }
    })
  })
})
