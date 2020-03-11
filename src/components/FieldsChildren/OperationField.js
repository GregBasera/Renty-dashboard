import React from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import CheckIcon from '@material-ui/icons/Check';

import MediaCard from './ItemFieldChildren/MediaCard.js';
import TfNoEdit from './ItemFieldChildren/TfNoEdit.js';
import CircularProgress from '@material-ui/core/CircularProgress';

class OperationField extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      operationsInfo: null,
      initialState: null,
    });

    this.listenToFirebase = this.listenToFirebase.bind(this);
    this.listenToFirebase();
    this.updateValue = this.updateValue.bind(this);
  }

  listenToFirebase() {
    this.props.query.onSnapshot((doc) => {
      // console.log("Current data: ", doc.data());
      if(this.state.operationsInfo === null) {
        this.setState({ initialState: { id: doc.id, data: doc.data() } });
      }
      this.setState({ operationsInfo: { id: doc.id, data: doc.data() } });
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.query !== this.props.query) {
      this.setState({
        initialState: null,
        operationsInfo: null,
      });
      this.listenToFirebase();
    }
  }

  uploadChanged = () => {
    console.log("submit was called");
    let stateRef = this.state.operationsInfo.data;
    // this.props.query.update({
    //   is_approved: (typeof stateRef.is_approved !== 'undefined') ? stateRef.is_approved: "error: notfound",
    //   item_name: (stateRef.item_name) ? stateRef.item_name : "error: notfound",
    //   item_description: (stateRef.item_description) ? stateRef.item_description : "error: notfound",
    // });
  }

  updateValue(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(prevState => ({
      operationsInfo: {
        id: this.state.operationsInfo.id,
        data: {
          ...prevState.operationsInfo.data, [name]: value
        }
      },
    }));
  }

  peek = (key) => {
    if(this.state.operationsInfo !== null) {
      var returnThis = this.state.operationsInfo.data;
      return (Object.keys(returnThis).indexOf(key) !== -1) ? returnThis[key] : "--"
    } else {
      return "--";
    }
  }

  render() {
    console.log(this.state);
    return (this.state.operationsInfo === null) ? <CircularProgress /> : (
      <h1>{this.state.operationsInfo.data.categories[1].name}</h1>
    )
  }
}

export default OperationField;
