import { createStore, applyMiddleware } from 'redux'
import projectsRed from '../store/reducer/ProjectRed'

import thunk from 'redux-thunk'

const middleWatre = applyMiddleware(thunk)

const store = createStore(projectsRed, middleWatre)
export default store