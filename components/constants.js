import PropTypes from 'prop-types'

export const FACING = {
  'Bottom': 'down',
  'Left': 'left',
  'Right': 'right',
  'Top': 'up'
}

export const SPRITES = [
  'sprite',
  'peng',
  'lion'
]

export const NPCS = [
  { key: 'a', spawn: { top: 22, left: 16 }, spriteType: SPRITES[2] },
  { key: 'b', spawn: { top: 22, left: 36 }, spriteType: SPRITES[2] },
  { key: 'c', spawn: { top: 29, left: 14 }, spriteType: SPRITES[0] },
  { key: 'd', spawn: { top: 30, left: 10 }, spriteType: SPRITES[1] },
  { key: 'e', spawn: { top: 32, left: 33 }, spriteType: SPRITES[2] },
  { key: 'f', spawn: { top: 33, left: 34 }, spriteType: SPRITES[0] },
  { key: 'g', spawn: { top: 35, left: 34 }, spriteType: SPRITES[1] }
]

export const ROCKS = [
  { spawn: { top: 19, left: 20 } },
  { spawn: { top: 20, left: 18 } },
  { spawn: { top: 20, left: 22 } },
  { spawn: { top: 21, left: 19 } },
  { spawn: { top: 21, left: 22 } },
  { spawn: { top: 23, left: 20 } },
  { spawn: { top: 38, left: 38 } }
]

export const WATER = [
  { spawn: { left: 15, top: 13 } },
  { spawn: { left: 16, top: 13 } },
  { spawn: { left: 17, top: 13 } },
  { spawn: { left: 14, top: 14 } },
  { spawn: { left: 15, top: 14 } },
  { spawn: { left: 16, top: 14 } }
]

export const coordsPropType = PropTypes.shape({
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired
})

export const spawnConfigPropType = () => PropTypes.shape({
  key: PropTypes.string,
  spawn: PropTypes.shape(coordsPropType).isRequired,
  spriteType: PropTypes.string
})
