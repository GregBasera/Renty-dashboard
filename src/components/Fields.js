import React from 'react'
import { useSelector } from 'react-redux';
import 'firebase/firestore';
import Firebase from './../Firebase';

import UserField from './FieldsChildren/UserField';
import ItemField from './FieldsChildren/ItemField';

// Layout
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import ReplayIcon from '@material-ui/icons/Replay';

function Fields() {
  const collection = useSelector(state => state.docView.frbsColl);
  const id = useSelector(state => state.fieldView.id);

  const view = (collection) => {
    switch(collection){
      case 'users':
        return id ? <UserField query={Firebase.firestore().collection(collection).doc(id)} /> : "Select a document";
      case 'items':
        return id ? <ItemField query={Firebase.firestore().collection(collection).doc(id)} /> : "Select a document";
      case 'rentals':
        return null;
      default:
        return null;
    }
  }

  return (
    <Container maxWidth="md" disableGutters style={{height:"85vh", overflowY:"auto"}}>
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <Typography variant="h6" style={{marginLeft:"10px"}}>
          Fields
          </Typography>
        </Grid>
          <Grid container xs={6} justify="flex-end">
            <Button variant="contained" size="small" style={{marginRight:"10px"}}>
              <ReplayIcon />
            </Button>
          </Grid>
        </Grid>
      <hr size="1"/>

      <Typography variant="h6" style={{margin:"0px 10px"}}>
        {view(collection)}
      </Typography>
    </Container>
  )
}

export default Fields;
