import React from 'react'
import PropTypes from 'prop-types'

import { coordsToIndex, indexToCoords } from './utils'
import { spawnConfigPropType } from './constants'

import styles from './Map.css'

// When not debugging, this can be React.PureComponent...
class Map extends React.Component {
  constructor (props) {
    super(props)

    const backgroundIds = [...Array(Math.pow(props.map.length, 2))].map(() => {
      let backgroundId = 'grass1.png'

      // Randomize grass tiles
      const bgLottery = Math.floor(Math.random() * 299)

      if (bgLottery < 1) {
        backgroundId = 'grass2.png'
      } else if (bgLottery < 2) {
        backgroundId = 'grass5.png'
      } else if (bgLottery < 79) {
        backgroundId = 'grass3.png'
      } else if (bgLottery < 159) {
        backgroundId = 'grass4.png'
      } else if (bgLottery < 229) {
        backgroundId = 'grass6.png'
      }

      return backgroundId
    })

    if (props.water) {
      props.water.forEach(({ spawn }) => {
        const index = coordsToIndex(spawn, props.map.length)
        backgroundIds[index] = 'water.gif'
      })
    }

    /**
     * @type {{backgroundIds: string[]}}
     */
    this.state = {
      backgroundIds
    }
  }

  render () {
    const { devMode, interior, map } = this.props

    return (
      <div
        className={styles.map}
        style={{
          height: map.length * 100,
          width: map.length * 100
        }}
      >
        {this.state.backgroundIds.map((backgroundId, dex) => {
          const { left, top } = indexToCoords(dex, map.length)

          return (
            <div
              className={styles.tile}
              key={`${dex}_${backgroundId}`}
              style={{
                background: `url('/static/${interior ? 'wood-floor.gif' : backgroundId}')`,
                color: devMode ? (map[top][left] === 0 ? 'red' : 'rgba(0, 0, 0, .2)') : null
              }}
            >
            {devMode ? `${top}x${left}, ${dex}` : null}
            </div>
          )
        })}
      </div>
    )
  }
}

Map.propTypes = {
  devMode: PropTypes.bool,
  interior: PropTypes.bool,
  map: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number)
  ).isRequired,
  water: PropTypes.arrayOf(spawnConfigPropType())
}
Map.defaultProps = {
  devMode: false,
  interior: false,
  water: undefined
}

export default Map
