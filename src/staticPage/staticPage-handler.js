import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'
import fetch from 'fetch'

export default async function statcPageHandler({ id }, request, response) {
  const userData = await fetch('https://www.baidu.com')

  // 404 attempt
  if (id === '0') {
    response.status(404)
  }

  // redirect
  if (id === 'redirect') {
    response.redirect('/', 302)
  }

  return withGlobalState(request, globalState, {
    title: 'React Storefront',
    welcomeMessage: 'test',
    staticModel: {
      testVariable: userData.status.toString(),
      name: id
    }
  })
}
