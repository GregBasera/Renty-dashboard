import changeDocView from './collectionsRed';
import loggedReducer from './isLogged';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    docView : changeDocView,
    logged : loggedReducer
})

export default allReducers;