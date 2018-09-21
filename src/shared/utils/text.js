import adjust from 'ramda/src/adjust'
import join from 'ramda/src/join'
import pipe from 'ramda/src/pipe'
import split from 'ramda/src/split'
import toUpper from 'ramda/src/toUpper'

export const toTitleCase =
  pipe(
    split(''),
    adjust(toUpper, 0),
    join('')
  )
