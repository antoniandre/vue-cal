/**
 * Select a cell and go to narrower view on double click or single click according to vuecal option.
 *
 * @param {Boolean} force Force switching to narrower view.
 * @param {Object} vuecal The vuecal instance.
 * @param {Date} date The selected cell date at the exact time where it was clicked (through cursor coords).
 * @param {Integer} split The selected cell split if any.
 */
export const selectCell = (force = false, vuecal, date, split) => {
  // Cell-click event returns a date and time at cursor position.
  vuecal.$emit('cell-click', split ? { date, split } : date)

  // Switch to narrower view.
  if (vuecal.clickToNavigate || force) vuecal.switchToNarrowerView()

  // Handle double click manually for touch devices.
  else if (vuecal.dblclickToNavigate && 'ontouchstart' in window) {
    vuecal.domEvents.dblTapACell.taps++

    setTimeout(() => (vuecal.domEvents.dblTapACell.taps = 0), vuecal.domEvents.dblTapACell.timeout)

    if (vuecal.domEvents.dblTapACell.taps >= 2) {
      vuecal.domEvents.dblTapACell.taps = 0
      vuecal.switchToNarrowerView()
      vuecal.$emit('cell-dblclick', split ? { date, split } : date)
    }
  }
}

/**
 * Select a cell and go to narrower view on enter.
 *
 * @param {Boolean} force Force switching to narrower view.
 * @param {Object} vuecal The vuecal instance.
 * @param {Date} date The selected cell date at the exact time where it was clicked (through cursor coords).
 * @param {Integer} split The selected cell split if any.
 */
export const keyPressEnterCell = (vuecal, date, split) => {
  // Cell-key-press-enter event returns a date and time at cursor position.
  vuecal.$emit('cell-keypress-enter', split ? { date, split } : date)

  // Switch to narrower view.
  vuecal.switchToNarrowerView()
}
