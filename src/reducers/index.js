import changeDocView from './collectionsRed';
import changeFieldView from './fieldsRed';
import fieldRaw from './rawRed';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  docView : changeDocView,
  fieldView : changeFieldView,
  raw : fieldRaw,
})

export default allReducers;
