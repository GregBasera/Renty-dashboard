import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Firebase from './../../../Firebase';
import RenderOtherColl from './RenderOtherColl';

async function fetchContent(coll, id) {
  let targetDoc = null;
  await Firebase.firestore().collection('users').doc('Model User').get().then(function(doc) {
    if (doc.exists) {
      targetDoc = doc.data();
      // return <RenderOtherColl data={doc.data()}/>;
    } else {
      console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });

  console.log(targetDoc);
  return targetDoc;
}

function OtherCollectionDialog(props) {

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"user: " + props.id}</DialogTitle>
        <DialogContent>
          <RenderOtherColl data={fetchContent(props.coll, props.id)}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {console.log("modal");}} color="primary">
            Disagree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default OtherCollectionDialog;
