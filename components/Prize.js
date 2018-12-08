import React from 'react'
import PropTypes from 'prop-types'

import { findUnblockedTile } from './utils'

import styles from './Prize.css'

class Prize extends React.Component {
  constructor (props) {
    super(props)

    const initialPosition = findUnblockedTile(this.props.map)

    // TODO: This causes an issue where the prize will appear
    // briefly at the top left on reload.
    this.state = {
      left: initialPosition.left,
      top: initialPosition.top
    }

    props.flipTiles({
      left: initialPosition.left,
      top: initialPosition.top
    })

    this.onPrizeClickHandler = this.onPrizeClickHandler.bind(this)
  }

  onPrizeClickHandler () {
    const { left, top } = this.state

    this.props.updateScore()

    const nextPosition = findUnblockedTile(this.props.map)

    this.props.flipTiles(
      nextPosition,
      { left, top }
    )

    this.setState(nextPosition)
  }

  render () {
    const {
      left,
      top
    } = this.state

    return (
      <div
        className={styles.prize}
        onClick={this.onPrizeClickHandler}
        style={{
          left: left * 100,
          top: top * 100
        }}
      />
    )
  }
}

Prize.propTypes = {
  flipTiles: PropTypes.func.isRequired,
  map: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  updateScore: PropTypes.func.isRequired
}

export default Prize
