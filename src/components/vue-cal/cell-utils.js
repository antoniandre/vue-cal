/**
 * Select a cell and go to narrower view on double click or single click according to vuecal option.
 *
 * @param {Boolean} force Force switching to narrower view.
 * @param {Date} date The selected cell date at the exact time where it was clicked (through cursor coords).
 * @param {Object} vuecal The vuecal instance.
 * @param {Object} e The associated DOM event.
 */
export const selectCell = (force = false, date, vuecal) => {
  // Cell-click event returns a date and time at cursor position.
  vuecal.$emit('cell-click', date)

  // Switch to narrower view.
  if (vuecal.clickToNavigate || force) vuecal.switchToNarrowerView()

  // Handle double click manually for touch devices.
  else if (vuecal.dblclickToNavigate && 'ontouchstart' in window) {
    vuecal.domEvents.dblTapACell.taps++

    setTimeout(() => (vuecal.domEvents.dblTapACell.taps = 0), vuecal.domEvents.dblTapACell.timeout)

    if (vuecal.domEvents.dblTapACell.taps >= 2) {
      vuecal.domEvents.dblTapACell.taps = 0
      vuecal.switchToNarrowerView()
      vuecal.$emit('cell-dblclick', date)
    }
  }
}
