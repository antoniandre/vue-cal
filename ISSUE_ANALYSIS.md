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

### 2. Issue #72: Non-Numeric Schedule IDs Fail (strings/UUIDs)
**Status:** LEGITIMATE BUG
**Severity:** HIGH
**Impact:** Blocks production use for users needing UUIDs

#### Problem
Schedule IDs must be integers. Using strings or UUIDs causes:
- Event creation fails
- Drag/drop events disappear
- This worked in v4 - regression in v5

#### Root Cause
Code uses numeric operations (like `~~` for integer conversion or direct additions) instead of string-safe operations on schedule IDs.

Key file: `src/vue-cal/core/events.js` line 174
```javascript
const eventSchedule = config.schedules?.length ? ~~(at?.schedule || this.schedule) : null
```

The `~~` operator forces numeric conversion, breaking string IDs.

#### Fix Required
1. Remove numeric type restrictions on schedule IDs
2. Replace `~~` and numeric operators with string-safe comparisons
3. Search for all places where scheduleId is used with numeric operations

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

### 4. Issue #75: Schedule ID Zero Not Attached to Event
**Status:** LEGITIMATE BUG
**Severity:** MEDIUM
**Impact:** Can't use schedule ID 0

#### Problem
When a schedule has `id: 0`, created events don't have the `schedule` field set. This is due to falsy check: `if (scheduleId)` treats 0 as false.

#### Root Cause
Falsy comparison instead of explicit undefined check.

#### Example Problematic Pattern
```javascript
if (scheduleId) { /* ... */ }  // ❌ 0 is falsy
```

Should be:
```javascript
if (scheduleId !== undefined) { /* ... */ }  // ✅ Explicit check
```

#### Fix Required
Search for falsy checks on `schedule` or `scheduleId` and replace with `!== undefined` checks.

**Search terms:**
- `if (.*schedule[^:]`
- `if (!.*schedule`
- `?.*schedule :`

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

### 6. Issue #67: Forward Navigation Broken (Week + Sunday Start + Hide Weekends)
**Status:** LEGITIMATE BUG
**Severity:** MEDIUM
**Impact:** Specific edge case blocks navigation

#### Problem
In Week view with BOTH:
- `startWeekOnSunday: true`
- `hideWeekends: true`

The forward arrow doesn't advance the calendar. Backward works fine.

#### Root Cause
Date calculation for week navigation has off-by-one error when both flags are true.

Key file: `src/vue-cal/core/view.js` - Week navigation logic

#### Fix Required
Review the `next()` or `navigate()` function for week view when handling Sunday start + hide weekends combination.

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
2. **#72** - Remove numeric type restrictions on schedule IDs (1-2 hours)
3. **#120** - Fix overlap prevention logic (2-3 hours)

### Sprint 2 (Next Week)
4. **#75** - Replace falsy checks with explicit undefined checks (30 min)
5. **#74** - Add event callbacks to click&hold path (1 hour)
6. **#67** - Fix week navigation edge case (1-2 hours)

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
2. **#72**: Test with UUID schedule IDs (provide StackBlitz repro)
3. **#120**: Test drag/drop on desktop and Android Chrome
4. **#75**: Test with schedule id: 0
5. **#74**: Test click&hold event creation
6. **#67**: Test week navigation with both flags true
7. **#121**: Verify schedule object in slot props

---

## Notes on v4 Regressions
Several bugs are regressions from v4:
- Schedule string IDs worked in v4
- Event creation callbacks worked in v4
- This suggests core event handling was refactored - ensure backward compatibility

Recommendation: Add regression tests for v4 features to prevent future issues.
