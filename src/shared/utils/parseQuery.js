import drop from 'ramda/src/drop'
import fromPairs from 'ramda/src/fromPairs'
import identity from 'ramda/src/identity'
import ifElse from 'ramda/src/ifElse'
import map from 'ramda/src/map'
import pipe from 'ramda/src/pipe'
import split from 'ramda/src/split'
import startsWith from 'ramda/src/startsWith'

export const formatQuery =
  ifElse(
    startsWith('?'),
    drop(1),
    identity
  )

export const parseQuery =
  pipe(
    formatQuery,
    split('&'),
    map(split('=')),
    fromPairs
  )
