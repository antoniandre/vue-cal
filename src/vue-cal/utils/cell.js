/**
 * Cell Utils.
 *
 * Waiting for VS Code to support JavaScript private fields.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Class_fields
 * Meantime keep `_` for private.
 */

const minutesInADay = 24 * 60

export default class CellUtils {
  _vuecal = null

  constructor (vuecal) {
    this._vuecal = vuecal
  }

  /**
   * Select a cell and go to narrower view on double click or single click according to vuecalProps option.
   *
   * @param {Boolean} force Force switching to narrower view.
   * @param {Date} date The selected cell date at the exact time where it was clicked (through cursor coords).
   * @param {Integer} split The selected cell split if any.
   */
  selectCell = (force = false, date, split) => {
    // Cell-click event returns a date and time at cursor position.
    this._vuecal.$emit('cell-click', split ? { date, split } : date)

    // Switch to narrower view.
    if (this._vuecal.clickToNavigate || force) this._vuecal.switchToNarrowerView()

    // Handle double click manually for touch devices.
    else if (this._vuecal.dblclickToNavigate && 'ontouchstart' in window) {
      this._vuecal.domEvents.dblTapACell.taps++

      setTimeout(() => (this._vuecal.domEvents.dblTapACell.taps = 0), this._vuecal.domEvents.dblTapACell.timeout)

      if (this._vuecal.domEvents.dblTapACell.taps >= 2) {
        this._vuecal.domEvents.dblTapACell.taps = 0
        this._vuecal.switchToNarrowerView()
        this._vuecal.$emit('cell-dblclick', split ? { date, split } : date)
      }
    }
  }

  /**
   * Select a cell and go to narrower view on enter.
   *
   * @param {Boolean} force Force switching to narrower view.
   * @param {Date} date The selected cell date at the exact time where it was clicked (through cursor coords).
   * @param {Integer} split The selected cell split if any.
   */
  keyPressEnterCell = (date, split) => {
    // Cell-key-press-enter event returns a date and time at cursor position.
    this._vuecal.$emit('cell-keypress-enter', split ? { date, split } : date)

    // Switch to narrower view.
    this._vuecal.switchToNarrowerView()
  }

  /**
   * Get the coordinates of the mouse cursor from the cells wrapper referential (`ref="cells"`).
   *
   * @todo Cache bounding box & update it on resize.
   * @param {Object} e the native DOM event object.
   * @return {Object} containing { x: {Number}, y: {Number} }
   */
  getPosition = e => {
    const { left, top } = this._vuecal.$refs.cells.getBoundingClientRect()
    const { clientX, clientY } = 'ontouchstart' in window && e.touches ? e.touches[0] : e
    return { x: clientX - left, y: clientY - top }
  }

  /**
   * Get the number of minutes from the top to the mouse cursor.
   * Returns a constrained time between 0 and 24 * 60.
   *
   * @param {Object} e the native DOM event object.
   * @return {Object} containing { minutes: {Number}, cursorCoords: { x: {Number}, y: {Number} } }
   */
  minutesAtCursor = e => {
    let minutes = 0
    let cursorCoords = { x: 0, y: 0 }
    const { timeStep, timeCellHeight, timeFrom } = this._vuecal.$props

    if (typeof e === 'number') minutes = e
    else if (typeof e === 'object') {
      cursorCoords = this.getPosition(e)
      minutes = Math.round(cursorCoords.y * timeStep / parseInt(timeCellHeight) + timeFrom)
    }

    return { minutes: Math.max(Math.min(minutes, minutesInADay), 0), cursorCoords }
  }
}
