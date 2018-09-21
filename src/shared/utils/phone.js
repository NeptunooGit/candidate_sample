import compose from 'ramda/src/compose'
import join from 'ramda/src/join'
import pipe from 'ramda/src/pipe'
import reduce from 'ramda/src/reduce'
import replace from 'ramda/src/replace'
import split from 'ramda/src/split'
import update from 'ramda/src/update'

const addIndex = (number, index) => ({ number, index: index + 1 })

const getIndex = (formatString, char, index) =>
  formatString.split(char, index).join(char).length

const replaceIndex = (formatString, char) => (formatList, digit) => {
  const { number, index } = digit
  const formatIndex = getIndex(formatString, char, index)

  return update(formatIndex, number, formatList)
}

export const formatPhone = (formatString, char = 'N') => number => {
  const formatList = split('', formatString)
  const numberList = split('', number).map(addIndex)
  const doReplace = replaceIndex(formatString, char)
  const doFormat = pipe(reduce(doReplace, formatList), join(''))

  return doFormat(numberList)
}

export const stripPhone = number => replace(/[^0-9]/g, '', number)

export const formatPhoneDefault =
  compose(formatPhone('(NNN) NNN-NNNN', 'N'), stripPhone)
