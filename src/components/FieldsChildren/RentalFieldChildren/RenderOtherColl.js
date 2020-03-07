import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

function RenderOtherColl(props) {
  props.data.then(function(data) {
    props.data = data;
  });

  const peek = (key) => {
    if(props.data !== null) {
      var returnThis = props.data;
      return (Object.keys(returnThis).indexOf(key) !== -1) ? returnThis[key] : "--"
    } else {
      return "--";
    }
  }

  const addressEvaluator = (addressObj) => {
    if(addressObj !== null) {
      let addrsString = addressObj.unit_num + ", " +
      addressObj.residence + ", " +
      addressObj.barangay + ", " +
      addressObj.city_munici + ", " +
      addressObj.postal_code + ", " +
      addressObj.region + ", " +
      addressObj.country;
      return addrsString;
    } else {
      return "--";
    }
  };

  return (
    
  );
}

export default RenderOtherColl;
