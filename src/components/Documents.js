import React from 'react'
import { useSelector } from 'react-redux';
import 'firebase/firestore';
import Firebase from './../Firebase';

// Components
import RentalsView from './DocumentsChildren/RentalsView.js';
import ItemsView from './DocumentsChildren/ItemsView';
import UsersView from './DocumentsChildren/UsersView';
import OperationsView from './DocumentsChildren/OperationsView';

// Layout
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function Documents(props) {
  const viewTitle = useSelector(state => state.docView.title);
  const viewIndex = useSelector(state => state.docView.index);

  const view = (index) => {
    switch (index) {
      case 1: // ALL rentals
        return <RentalsView query={Firebase.firestore().collection('rentals')} />;

      case 2: // ALL items
        return <ItemsView query={Firebase.firestore().collection('items')} />;

      case 3: // ALL users
        return <UsersView query={Firebase.firestore().collection('users')} />;

      case 4: // client app
        return "Client App";

      case 5: // operations
        return <OperationsView query={Firebase.firestore().collection('operations')} />;

      default:
        return "Select a collection...";

    }
  }

  return (
    <Container maxWidth="md" disableGutters style={{height:(props.head) ? "88vh": "100vh",overflowY:"auto"}}>
      <Typography variant="h6" style={{marginLeft:"10px", marginTop:"10px"}}>
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
