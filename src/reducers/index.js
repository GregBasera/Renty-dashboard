import changeDocView from './collectionsRed';
import changeFieldView from './fieldsRed';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  docView : changeDocView,
  fieldView : changeFieldView,
})

export default allReducers;
