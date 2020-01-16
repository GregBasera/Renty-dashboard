import changeDocView from './collectionsRed';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    docView : changeDocView,
})

export default allReducers;