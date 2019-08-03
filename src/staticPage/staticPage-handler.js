import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'
import fetch from 'fetch'

export default async function statcPageHandler(params, request, response) {
  const userData = await fetch('https://www.baidu.com')

  return withGlobalState(request, globalState, {
    title: 'React Storefront',
    welcomeMessage: 'test',
    staticModel: {
      testVariable: userData.status.toString()
    }
  })
}
