import React from 'react'
import { useSelector } from 'react-redux';
import 'firebase/firestore';
import Firebase from './../Firebase';

// Components
import RentalsView from './DocumentsChildren/RentalsView.js';
import ItemsView from './DocumentsChildren/ItemsView';
import UsersView from './DocumentsChildren/UsersView';

// Layout
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function Documents() {
  const viewTitle = useSelector(state => state.docView.title);
  const viewIndex = useSelector(state => state.docView.index);

  const view = (index) => {
    switch (index) {
      case 1: // ALL rentals
        return <RentalsView query={Firebase.firestore().collection('rentals')} />;
      case 2: // DUE rentals
        return <RentalsView query={Firebase.firestore().collection('rentals').where('status', '==', 'due')} />;
      case 3: // PENDING rentals
        return <RentalsView query={Firebase.firestore().collection('rentals').where('status', '==', 'pending')} />;
      case 4: // LEASED rentals
        return <RentalsView query={Firebase.firestore().collection('rentals').where('status', '==', 'leased')} />;

      case 5: // ALL items
        return <ItemsView query={Firebase.firestore().collection('items')} />;
      case 6: // IN_APP items
        return <ItemsView query={Firebase.firestore().collection('items').where('is_approved', '==', true)} />;
      case 7: // FOR-APPROVAL items
        return <ItemsView query={Firebase.firestore().collection('items').where('is_approved', '==', false)} />;

      case 8: // ALL users
        return <UsersView query={Firebase.firestore().collection('users')} />;
      case 9: // VERIFIED users
        return <UsersView query={Firebase.firestore().collection('users').where('verified', '==', true)} />;
      case 10: // PENDING verifications
        return "Select a collection...";
      case 11: // NOT VERIFIED users
        return <UsersView query={Firebase.firestore().collection('users').where('verified', '==', false)} />;

      default:
        return "Select a collection...";

    }
  }

  return (
    <Container maxWidth="md" disableGutters style={{height:"88vh",overflowY:"auto"}}>
      <Typography variant="h6" style={{marginLeft:"10px"}}>
        {viewTitle}
      </Typography>
      <hr size="1"/>

      <Box style={{margin:"20px 10px",marginBottom:"0px"}}>
        {view(viewIndex)}
      </Box>
    </Container>
  )
}

export default Documents;
