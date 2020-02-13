import React from 'react'
import { useSelector } from 'react-redux';
import 'firebase/firestore';
import Firebase from './../Firebase';

import UserField from './FieldsChildren/UserField';
import ItemField from './FieldsChildren/ItemField';
import RentalField from './FieldsChildren/RentalField';

// Layout
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';

import ReplayIcon from '@material-ui/icons/Replay';

function Fields() {
  const collection = useSelector(state => state.docView.frbsColl);
  const id = useSelector(state => state.fieldView.id);

  const view = (collection) => {
    switch(collection){
      case 'users':
        return id ? <UserField query={Firebase.firestore().collection(collection).doc(id)}
          setRef={Firebase.firestore().ref(collection + '/' + id)} /> : "Select a document";
      case 'items':
        return id ? <ItemField query={Firebase.firestore().collection(collection).doc(id)} /> : "Select a document";
      case 'rentals':
        return id ? <RentalField query={Firebase.firestore().collection(collection).doc(id)} /> : "Select a document";
      default:
        return null;
    }
  }

  return (
    <Container maxWidth="md" disableGutters style={{height:"88vh", overflowY:"auto"}}>
      <Grid container spacing={0} justify="space-between">
          <Typography variant="h6" style={{marginLeft:"10px"}}>
          Fields
          </Typography>
          <IconButton size="small" edge="end" aria-label="delete" style={{marginRight:"10px"}}>
            <ReplayIcon />
          </IconButton>
      </Grid>

      <hr size="1"/>

      <Box style={{margin:"20px 10px",marginBottom:"0px"}}>
        {view(collection)}
      </Box>
    </Container>
  )
}

export default Fields;
