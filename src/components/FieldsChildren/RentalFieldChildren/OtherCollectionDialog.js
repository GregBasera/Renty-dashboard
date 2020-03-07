import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Firebase from './../../../Firebase';

class OtherCollectionDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      doc: null,
    });

    this.listenToFirebase = this.listenToFirebase.bind(this);
    this.listenToFirebase(this.props.coll, this.props.id);
  }

  listenToFirebase(coll, id) {
    Firebase.firestore().collection('users').doc('Model User').get().then(function(snapshot) {
      if (snapshot.exists) {
        this.setState({ doc: snapshot.data() });
        // doc = snapshot.data();
      } else {
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.close}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"user: " + this.props.id}</DialogTitle>
          <DialogContent>
            {"nothing"}
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
}

export default OtherCollectionDialog;
