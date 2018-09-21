import contains from 'ramda/src/contains'
import either from 'ramda/src/either'
import KeyCode from 'keycode-js'

const enterKey = {
  keys: ['Enter'],
  keyCode: KeyCode.KEY_RETURN,
}

const escapeKey = {
  keys: ['Escape', 'Esc'],
  keyCode: KeyCode.KEY_ESCAPE,
}

const spaceBarKey = {
  keys: [' '],
  keyCode: KeyCode.KEY_SPACE,
}

const isKey = ({ keyCode, keys }) => ev =>
  ev.keyCode ? ev.keyCode === keyCode : contains(ev.key, keys)

export const isEnterKey = isKey(enterKey)
export const isEscapeKey = isKey(escapeKey)
export const isSpaceBarKey = isKey(spaceBarKey)
export const isEnterOrSpaceBarKey = either(isEnterKey, isSpaceBarKey)
