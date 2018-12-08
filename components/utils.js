/**
 * @typedef {Object} OpenWorldCoords
 * @property {number} left
 * @property {number} top
 */
/**
 * @typedef {Array<Array<number>>} OpenWorldMap
 * Map matrix (array of arrays).
 * TODO: What do the numbers represent?
 */

/**
 * Convert coordinate values to index.
 * @param {OpenWorldCoords} coords - The coordinates of the tile.
 * @param {number} size - The size of the current map.
 * @returns {number} - The index of the tile.
 */
export const coordsToIndex = (coords, size) => (coords.top * size) + coords.left

/**
 * Find an unblocked map tile.
 * @param {OpenWorldMap} map
 * @returns {OpenWorldCoords} - The coordinates of the unblocked position.
 */
export const findUnblockedTile = map => {
  let spawn = {}

  do {
    spawn = randomSpawn(map.length)
  } while (map[spawn.top][spawn.left] === 0)

  return spawn
}

/**
 * TODO: What does this function do?
 *  - I think it just flips the state of a single tile..? Potentially two?
 * @param {OpenWorldCoords} blockTiles
 * @param {OpenWorldCoords} clearTiles
 * @param {OpenWorldMap} map
 * @return {OpenWorldMap}
 */
export const flipTiles = (blockTiles, clearTiles, map) => {
  // Perhaps these args should be arrays...
  const nextMap = [...map]

  if (blockTiles) nextMap[blockTiles.top][blockTiles.left] = 0
  if (clearTiles) nextMap[clearTiles.top][clearTiles.left] = 1

  return nextMap
}

/**
 * Generate a map matrix for tracking tiles.
 * @param {number} mapSize - The size of the map.
 * @returns {Array<Array<number>>} - The map matrix (array of arrays).
 */
export const generateMap = mapSize => {
  let row = []
  let map = []

  for (let i = 0; i < mapSize; i++ ) {
    row[i] = 1
  }

  for (let i = 0; i < mapSize; i++ ) {
    map[i] = [...row]
  }

  return map
}

/**
 * Converts index values to coordinates.
 * @param {number} index - The index of the tile.
 * @param {number} size - The size of the current map.
 * @returns {OpenWorldCoords} - The coordinates of the tile.
 */
export const indexToOpenWorldCoords = (index, size) => ({
  top: Math.floor(index / size),
  left: index % size
})

/**
 * Find a random map tile.
 * @param {number} mapSize - The size of the map.
 * @returns {OpenWorldCoords} - Random coordinates within the current map.
 */
export const randomSpawn = mapSize => ({
  left: Math.floor(Math.random() * mapSize),
  top: Math.floor(Math.random() * mapSize)
})

/**
 * Shuffle an array.
 * @param {Array} array - An array to shuffle.
 * @returns {Array} - The shuffled array.
 */
export const shuffle = array => {
  let currentIndex = array.length, temporaryValue, randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}
