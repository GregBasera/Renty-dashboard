import './App.css';
import React from 'react';

import Firebase from './Firebase';

// Layout
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

// Components
import logo from './Renty_Logo+Text.png';
import Header from './components/Header';
import Collections from './components/Collections';
import Documents from './components/Documents';
import Fields from './components/Fields';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      user: null,
      email: null,
      passw: null,
    })

    this.handleChanges = this.handleChanges.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  login(e) {
    e.preventDefault();
    Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.passw).then((u) => {

    }).catch((error) => {
      console.log(error);
    });
  }

  handleChanges(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  authListener() {
    Firebase.auth().onAuthStateChanged((user) => {
      // console.log(user);
      if(user) {
        this.setState({ user });
        // localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: 0 });
        // localStorage.removeItem('user', user.uid);
      }
    })
  }

  renderHomeOrLogin() {
    if(this.state.user === 0) {
      return (
        <Grid container spacing={0} style={{height:"100vh"}}>
          <Grid container xs={4} alignItems="center" style={{backgroundColor:"#f06383"}}>
            <Card style={{position:"absolute", left:"16%", width:"33%", border:"1px", borderStyle:"solid", borderColor:"lightgray"}}>
              <CardContent>
                <Typography variant="h4">
                  Staff Sign-in
                </Typography>
                <form noValidate autoComplete="off">
                  <TextField style={{marginTop:"15px"}} name="email"
                  id="staff-email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  onChange={this.handleChanges}
                  />
                  <TextField style={{marginTop:"15px"}} name="passw"
                  type="password"
                  id="staff-passw"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  onChange={this.handleChanges}
                  />
                  <Button
                  fullWidth
                  variant="contained"
                  onClick={this.login}
                  style={{marginTop:"15px", backgroundColor:"#ce2458", color:"white"}}>
                    Sign-in
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
          <Grid item container xs={8} justify="center" alignItems="center" style={{backgroundColor:"white"}}>
            <img src={logo} alt="Logo" />
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container spacing={0} style={{height:"100vh"}}>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={3}>
            <Paper elevation="0" variant="outlined" square style={{marginTop:"48px",padding:"10px 0px"}}>
              <Collections />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation="0" variant="outlined" square style={{marginTop:"48px",padding:"10px 0px"}}>
              <Documents />
            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Paper elevation="0" variant="outlined" square style={{marginTop:"48px",padding:"10px 0px"}}>
              <Fields />
            </Paper>
          </Grid>
        </Grid>
      );
    }
  }

  render() {
    return (
      <div>
        {(this.state.user === null) ? <CircularProgress /> : this.renderHomeOrLogin()}
      </div>
    )
  }
}

export default App;
