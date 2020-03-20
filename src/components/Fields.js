import React from 'react'
import { useSelector } from 'react-redux';
import 'firebase/firestore';
import Firebase from './../Firebase';
import { useDispatch } from 'react-redux';
import { fieldRaw } from '../actions/collectionsActs';

import UserField from './FieldsChildren/UserField';
import ItemField from './FieldsChildren/ItemField';
import RentalField from './FieldsChildren/RentalField';
import OperationField from './FieldsChildren/OperationField';
import FieldsRaw from './FieldsChildren/FieldsRaw';

// Layout
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';

// import ReplayIcon from '@material-ui/icons/Replay';

function Fields() {
  const collection = useSelector(state => state.docView.frbsColl);
  const id = useSelector(state => state.fieldView.id);
  const isRaw = useSelector(state => state.raw.isRaw);

  const view = (collection) => {
    if(isRaw) {
      return id ? <FieldsRaw query={Firebase.firestore().collection(collection).doc(id)} /> : "Select a document";
    } else {
      switch(collection){
        case 'users':
          return id ? <UserField query={Firebase.firestore().collection(collection).doc(id)} /> : "Select a document";
        case 'items':
          return id ? <ItemField query={Firebase.firestore().collection(collection).doc(id)} /> : "Select a document";
        case 'rentals':
          return id ? <RentalField query={Firebase.firestore().collection(collection).doc(id)} /> : "Select a document";
        case 'operations':
          return id ? <OperationField opIndex={id} /> : "Select a document";
          // return id ? <OperationField query={Firebase.firestore().collection(collection).doc(id)} opIndex={id} /> : "Select a document";
        default:
          return null;
      }
    }
  }

  const dispatch = useDispatch();
  const handleRawClick = () => {
    dispatch(fieldRaw(!isRaw));
  }

  return (
    <Container maxWidth="md" disableGutters style={{height:"88vh", overflowY:"auto"}}>
      <Grid container spacing={0} justify="space-between">
        <Typography variant="h6" style={{marginLeft:"10px"}}>
        Fields
        </Typography>
        <Chip label="Raw" color={(isRaw) ? "secondary" : "default"} style={{marginRight:"10px"}} onClick={() => {handleRawClick()}} />
      </Grid>

      <hr size="1"/>

      <Box style={{margin:"20px 10px",marginBottom:"0px"}}>
        {view(collection)}
      </Box>
    </Container>
  )
}

export default Fields;
