import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Container from 'react-storefront/Container'
import withStyles from '@material-ui/core/styles/withStyles'

const StaticStyles = theme => ({
  main: {
    color: theme.palette.secondary.main,
    'text-decoration': 'underline'
  }
})

@withStyles(StaticStyles)
@inject(({ app }) => ({ staticModel: app.staticModel }))
@observer
export default class StaticPage extends Component {
  render() {
    const { staticModel, classes } = this.props

    return <Container className={classes.main}>{staticModel.testVariable}</Container>
  }
}
