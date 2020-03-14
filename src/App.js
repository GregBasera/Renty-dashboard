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
import Box from '@material-ui/core/Box';
import Slide from '@material-ui/core/Slide';

// Components
import logo from './Renty_Logo+Text.png';
import Header from './components/Header';
import Collections from './components/Collections';
import Documents from './components/Documents';
import Fields from './components/Fields';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      user: null,
      email: null,
      passw: null,
      alert: { show: false, msg: "" },
      header: true,
    })

    this.handleChanges = this.handleChanges.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  login(e) {
    this.setState({ alert: { show: false, msg:"" } })
    e.preventDefault();
    if(this.state.email === null || this.state.passw === null) {
      this.setState({
        alert: {
          show: true,
          msg: "Nothing to submit... Please fill up the fields"
        }
      });
      return;
    }

    Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.passw).then((u) => {
      // Stuff to do when logged in...
    }).catch((error) => {
      switch (error.code) {
        case 'auth/invalid-email':
          this.setState({
            alert: {
              show: true,
              msg: "Invalid email address"
            }
          });
          console.log("invalid email");
          break;
        case 'auth/wrong-password':
          this.setState({
            alert: {
              show: true,
              msg: "Invalid password"
            }
          });
          console.log("invalid password");
          break;
        default:
          this.setState({
            alert: {
              show: true,
              msg: "Unknown error. Check your internet connection.."
            }
          });
          console.log(error.code);
          break;
      }
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

  headerChange = (prev) => {
    this.setState({
      header: (prev) ? true : false,
    });
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
                  <Box display={(this.state.alert.show) ? "block" : "none"} borderRadius={4} border={1} borderColor="#f06383"
                    style={{marginTop:"10px", padding:"10px 40px", backgroundColor:"#f06383", color:"white"}}>
                    <Typography>
                      {this.state.alert.msg}
                    </Typography>
                  </Box>
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
          <Slide direction="left" in={!this.state.header} mountOnEnter unmountOnExit>
            <Box onClick={() => {this.headerChange(true)}} style={{position:"absolute",backgroundColor:"#f06383",height:"25px",width:"25px"}}>
              <KeyboardArrowRightIcon />
            </Box>
          </Slide>
          <Slide direction="right" in={this.state.header} mountOnEnter unmountOnExit>
            <Grid item xs={12}>
              <Header show={this.state.header} changes={this.headerChange}/>
            </Grid>
          </Slide>
          <Grid item xs={3}>
            <Paper elevation={0} variant="outlined" square style={{marginTop:(this.state.header) ? "48px" : "0px", padding:"10px 0px"}}>
              <Collections />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={0} variant="outlined" square style={{marginTop:(this.state.header) ? "48px" : "0px", padding:"10px 0px"}}>
              <Documents />
            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Paper elevation={0} variant="outlined" square style={{marginTop:(this.state.header) ? "48px" : "0px", padding:"10px 0px"}}>
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
