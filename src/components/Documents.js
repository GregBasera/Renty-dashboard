import React from 'react'
import { useSelector } from 'react-redux';
import 'firebase/firestore';
import Firebase from './../Firebase';

// Components
import RentalsView from './RentalsView';
import ItemsView from './ItemsView';
import UsersView from './UsersView';
// import Firebase from './../Firebase';

// Layout
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

function Documents() {
  const viewTitle = useSelector(state => state.docView.title);
  const viewIndex = useSelector(state => state.docView.index);

  const view = (index) => {
    switch (index) {
      case 1:
        return <RentalsView query={Firebase.firestore().collection('rentals')} />;
      case 5:
        return <ItemsView query={Firebase.firestore().collection('item_listings')} />;
      case 6:
        return <ItemsView query={Firebase.firestore().collection('item_listings')} />;
      case 8:
        return <UsersView query={Firebase.firestore().collection('users')} />;
      case 9:
        return <UsersView query={Firebase.firestore().collection('users').where('verified', '==', true)} />;
      default:
        return <h2>Select a Collection ...</h2>;

    }
  }

  return (
    <Container maxWidth="md" disableGutters="true" style={{height:"90vh",overflowY:"scroll"}}>
      <Typography variant="h6" style={{marginLeft:"10px"}}>
        {viewTitle}
      </Typography>
      <hr size="1"/>

      <Typography variant="h6" style={{marginLeft:"10px"}}>
        {view(viewIndex)}
      </Typography>
    </Container>
  )
}

export default Documents;
