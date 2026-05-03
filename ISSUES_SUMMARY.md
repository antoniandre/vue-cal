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

#### 🔴 #72: Non-Numeric Schedule IDs Fail (UUIDs/Strings)
- **Author:** grauerwf | **Date:** Jul 15, 2025
- **Status:** NEEDS FIX
- **Impact:** Production blocker for users needing UUID-based schedules
- **Why Legitimate:** Was working in v4, real production requirement (backend UUIDs)
- **Root Cause:** Code forces numeric conversion with `~~` operator and numeric comparisons
- **Key File:** `src/vue-cal/core/events.js` line 174
- **Fix Difficulty:** 1-2 hours
- **User Comment:** "String as ids is essential for my case as backend using UUIDs"

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

#### 🟠 #75: Schedule ID Zero Not Attached to Event
- **Author:** grauerwf | **Date:** Jul 15, 2025
- **Status:** NEEDS FIX
- **Impact:** Can't use schedule id: 0 (falsy value bug)
- **Why Legitimate:** Classic falsy-check bug - `if (scheduleId)` treats 0 as false
- **Fix Difficulty:** 30 minutes
- **Simple Fix:** Replace falsy checks with `!== undefined` checks

#### 🟠 #74: Event Callbacks Missing from Click&Hold
- **Author:** grauerwf | **Date:** Jul 15, 2025
- **Status:** NEEDS FIX
- **Impact:** Alternative event creation method lacks event emission
- **Why Legitimate:** Code path inconsistency - drag creation works, hold doesn't
- **What Works:** `@cell-hold` fires correctly
- **What's Broken:** `@event-create` and `@event-created` don't fire
- **Fix Difficulty:** 1 hour

#### 🟠 #67: Forward Navigation Broken (Specific Config)
- **Author:** BlazeBiz | **Date:** Jun 25, 2025
- **Status:** NEEDS FIX
- **Impact:** Week view navigation fails with specific flag combination
- **Condition:** BOTH `hideWeekends: true` AND `startWeekOnSunday: true`
- **Symptoms:**
  - Forward button doesn't advance calendar
  - Backward button works fine ✅
  - Today button works fine ✅
- **Why Legitimate:** Specific edge case with clear repro steps
- **Fix Difficulty:** 1-2 hours (date calculation issue)

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
| #72  | 1-2h | Production UUID schedules |
| #120 | 2-3h | Mobile/Desktop DnD |

### Phase 2: Important Bugs (Following Sprint)
| Issue | Est. Time | Impact |
|-------|-----------|--------|
| #75  | 30m | Schedule id: 0 support |
| #74  | 1h | Event callback consistency |
| #67  | 1-2h | Navigation edge case |

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


## REPLIES

https://github.com/antoniandre/vue-cal/issues/115

Hi @adronitis, thanks for the idea, I'm reusing similar concept from the `time-at-cursor` https://antoniandre.github.io/vue-cal/examples/view#ex--hide-elements and the now-line component for the new prop `current-time-label`.
Also visible in the same exemple.

You can style it as wish on `.vuecal__current-time` (note that it does not receive pointer events with default styles).

Released in RC 41.
