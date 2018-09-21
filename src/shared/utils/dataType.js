import both from 'ramda/src/both'
import compose from 'ramda/src/compose'
import is from 'ramda/src/is'
import not from 'ramda/src/not'

const notNaN = compose(not, isNaN)
export const isNumber = both(notNaN, is(Number))
export const toNumber = val => isNumber(val) ? val : Number(val)
