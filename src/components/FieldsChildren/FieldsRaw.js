import React from 'react';

import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import CircularProgress from '@material-ui/core/CircularProgress';

class FieldsRaw extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      fields: null,
      initialState: null,
      unsubscribe: "nada",
    });

    this.listenToFirebase = this.listenToFirebase.bind(this);
    this.listenToFirebase();
    this.prettyPrint = this.prettyPrint.bind(this);
  }

  listenToFirebase() {
    var unsub = this.props.query.onSnapshot((doc) => {
      // console.log("Current data: ", doc.data());
      if(this.state.fields === null) {
        this.setState({ initialState: { id: doc.id, data: doc.data() } });
      }
      this.setState({
        fields: { id: doc.id, data: doc.data() },
        unsubscribe: unsub,
      });
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.query !== this.props.query) {
      this.setState({
        initialState: null,
        fields: null,
      });
      this.listenToFirebase();
    }
  }

  componentWillUnmount() {
    console.log("unmount unsub");
    this.state.unsubscribe();
  }

  prettyPrint(obj) {
    obj = JSON.stringify(obj);
    obj = obj.replace(/\{/g, "{\n");
    obj = obj.replace(/\}/g, "\n}");
    obj = obj.replace(/,/g, ",\n");
    obj = obj.replace(/:/g, "  :  ");

    return obj;
  }

  render() {
    return (this.state.fields === null) ? <CircularProgress /> : (
      <TextareaAutosize style={{width:"100%"}}>
        {this.prettyPrint(this.state.fields.data)}
      </TextareaAutosize>
    );
  }
}

export default FieldsRaw;
