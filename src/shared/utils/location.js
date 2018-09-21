import contains from 'ramda/src/contains'
import filter from 'ramda/src/filter'
import pathOr from 'ramda/src/pathOr'

const hasLocation = ({ types }) =>
  contains('locality', types) || contains('administrative_area_level_1', types)

export const processLocation = response => {
  const results = pathOr([], ['data', 'results', 0, 'address_components'], response)
  const addressParts = filter(hasLocation, results)
  const city = pathOr(null, [0, 'long_name'], addressParts)
  const state = pathOr(null, [1, 'short_name'], addressParts)

  if (!city || !state) {
    return false
  }

  return { city, state }
}
