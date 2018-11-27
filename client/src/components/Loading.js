import React, { PureComponent } from 'react'

export default class Loading extends PureComponent {
  render() {
    return (
        <div className="sk-spinner sk-spinner-wandering-cubes">
            <div className="sk-cube1"></div>
            <div className="sk-cube2"></div>
        </div>
    )
  }
}
