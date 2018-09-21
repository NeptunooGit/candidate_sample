import { connect } from 'react-redux'
import pipe from 'ramda/src/pipe'
import { withRouter } from 'react-router-dom'

const connectWithRouter = (mapState, mapDispatch, component) =>
  pipe(
    connect(mapState, mapDispatch),
    withRouter
  )(component)

export default connectWithRouter
