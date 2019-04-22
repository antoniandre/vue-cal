export const selectCell = (force = false, date, vuecal) => {
  vuecal.$emit('cell-click', date)

  if (vuecal.view.selectedDate.toString() !== date.toString()) {
    vuecal.view.selectedDate = date
    vuecal.$emit('cell-focus', date)
  }

  // Switch to narrower view.
  if (vuecal.clickToNavigate || force) vuecal.switchToNarrowerView()

  // Handle double click manually for touch devices.
  else if (vuecal.dblClickToNavigate && 'ontouchstart' in window) {
    vuecal.domEvents.dblTapACell.taps++

    setTimeout(() => (vuecal.domEvents.dblTapACell.taps = 0), vuecal.domEvents.dblTapACell.timeout)

    if (vuecal.domEvents.dblTapACell.taps >= 2) {
      vuecal.domEvents.dblTapACell.taps = 0
      vuecal.switchToNarrowerView()
    }
  }
}
