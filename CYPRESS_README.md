# Vue Cal - Cypress E2E Testing

## 🎯 Quick Start

### Run Tests
```bash
# Start dev server (in one terminal)
npm run dev

# Run Cypress (in another terminal)
npm run test:e2e          # Interactive mode
npm run test:e2e:headless # Headless mode
```

---

### Test Coverage
- ✅ **42/42 props** tested (100%)
- ✅ All alignments verified
- ✅ Responsive testing (mobile, tablet, desktop)
- ✅ View switching (Month, Week, Day)
- ✅ Event management (add, clear, load)
- ✅ All display modes (dark, horizontal, sm, xs)

---

## 🎯 Tests (68 tests total)
1. **`comprehensive-props-test.cy.js`** (44 tests)
   - Tests ALL 42 props via `/test-comprehensive` page
   - Includes alignment checks
   - Includes responsive testing (mobile, tablet, desktop)
   - Wait times: 300ms (800ms for Vue transitions)
2. **`smoke-test.cy.js`** (24 tests)
   - Quick validation tests
   - Tests the `/test` page
   - Basic functionality checks

---

## 🎨 Test View Page

### URL: `/test-comprehensive`
Interactive test page with UI controls for **all 42 props**:
- View selection (Month, Week, Day, etc.)
- Basic props (todayButton, titleBar, viewsBar, etc.)
- Display props (theme, dark, sm, xs, horizontal, etc.)
- Time props (timeFrom, timeTo, timeStep, twelveHour, etc.)
- Event props (allDayEvents, multidayEvents, stackEvents, etc.)
- Weekday props (hideWeekends, hideWeekdays, disableDays, etc.)
- Schedules and special hours
- Event management buttons (add, clear, load samples)

---

## ⏱️ Wait Times

- **Standard**: 300ms for prop changes
- **View Changes**: 800ms (Vue transitions)
- **Initial Load**: 2000ms (Vue Cal setup)

---

## 📝 Custom Cypress Commands

Located in `cypress/support/commands.js`:

- `cy.waitForVueCal()` - Wait for calendar ready
- `cy.checkAlignment()` - Verify element alignment
- `cy.dragAndDrop()` - Drag and drop events
- `cy.touchDrag()` - Touch dragging
- `cy.checkEventBounds()` - Verify event position/size
- `cy.getCellByDate()` - Get cell by date
- `cy.createEventByDrag()` - Create event by dragging
- `cy.isInViewport()` - Check visibility

___

## 📞 Troubleshooting

### Tests fail with "element not found"
- Increase timeout or add `cy.wait(300)` after actions

### Cypress can't connect to dev server
- Make sure `npm run dev` is running on `http://localhost:5173`
- Try interactive mode: `npm run test:e2e` instead of headless
