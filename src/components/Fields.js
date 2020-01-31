import React from 'react'
import { useSelector } from 'react-redux';
import 'firebase/firestore';
import Firebase from './../Firebase';

import UserField from './UserField';

// Layout
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

function Fields() {
  const collection = useSelector(state => state.docView.frbsColl);
  const user_ID = useSelector(state => state.fieldView.user_id);

  const view = (collection) => {
    switch(collection){
      case 'items':
        return "items";
      case 'users':
        console.log(Firebase.firestore().collection('users').doc("Model User").full_name);
        // return user_ID ? <UserField query={Firebase.firestore().collection('users').doc(user_ID)} /> : "Select a document";
      case 'rentals':
        return "rentals";
      default:
        return null;
    }
  }

  return (
    <Container maxWidth="md" disableGutters="true" style={{height:"90vh",overflowY:"scroll"}}>
      <Typography variant="h6" style={{marginLeft:"10px"}}>
        Fields
      </Typography>
      <hr size="1"/>

      <Typography variant="h6" style={{marginLeft:"10px"}}>
        {view(collection)}
      </Typography>
    </Container>
  )
}

export default Fields;
