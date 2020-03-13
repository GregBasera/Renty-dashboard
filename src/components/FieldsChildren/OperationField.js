import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import ItemView from './OperationFieldChildren/ItemView';
import Fcm from './OperationFieldChildren/Fcm';

function OperationField(props) {
  const operationsIndexer = (index) => {
    switch (index) {
      case 'items':
        return (<ItemView />);
      case 'blast':
        return (<Fcm />);
      default:
        return null;
    }
  }

  return (props.opIndex === null) ? <CircularProgress /> : (
    <div>
      {operationsIndexer(props.opIndex)}
    </div>
  )
}

export default OperationField;
