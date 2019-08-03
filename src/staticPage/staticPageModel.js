import { types } from 'mobx-state-tree'

const staticPageModel = types.model('staticPageModel', {
  testVariable: types.maybeNull(types.string),
  name: types.maybeNull(types.string)
})

export default staticPageModel
