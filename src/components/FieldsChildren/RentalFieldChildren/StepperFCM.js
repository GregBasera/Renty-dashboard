import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import CircularProgress from '@material-ui/core/CircularProgress';

import TfNoEdit from './TfNoEdit';

function StepperFCM(props) {
  const stepperToMsg = [0, null, null, 1, null, 2 , 3, null, null, 4, null, 5];
  const scriptedTitles = [
    {
      L: "A person wants to rent an item you listed. [item details]",
      R: "Your request is being processed."
    },{
      L: "Item preparation complete.",
      R: "Item preparation complete."
    },{
      L: "",
      R: "The item has been received."
    },{
      L: "An item contract just expired.",
      R: "Your contract just expired."
    },{
      L: "Your item just arrived in the Renty HQ.",
      R: "Item recieved."
    },{
      L: "Item and Lender reunited.",
      R: ""
    }
  ];
  const scriptedBodies = [
    {
      L: "We are currently processing the request. You'll be contacted shortly to confirm the item's availability.",
      R: "The lender is now being asked for approval."
    },{
      L: "The item is now on its way to the person who rented it. <renting details>",
      R: "The item is now on its way to you."
    },{
      L: "",
      R: "The item is due <renting details>. Thank you!"
    },{
      L: "The renter is now being adviced to prepare the item for retrieval. <item details>",
      R: "Please prepare the item for retrieval. A rider will be visiting your address to retrieve the item."
    },{
      L: "Its condition is now being inspected.",
      R: "Renty HQ just received the item you just rented. Thank you! <promotions>"
    },{
      L: "<promotions>.",
      R: ""
    }
  ];

  const stepperContent = (index) => {
    switch (index) {
      case 0: // Processing Req
        return "Notify the LENDER and RENTER. Contact the lender, discuss and confirm the renting and item details.";
      case 1: // Item to HQ
        return "Dispatch a rider to the Lenders address to retrieve the item.";
      case 2: // HQ Check
        return "Inspect the item for any defect. Mark, record, and inform the lender of the seen condition is necessary.";
      case 3: // Item to Renter
        return "Notify the LENDER and RENTER. Dispatch a rider to the Renters address to deliver the rented item.";
      case 4: // Renter Received
        return "Press the NEXT button to start the countdown timer for the rent request.";
      case 5: // HIDDEN ########
        return "Please notify the RENTER";
      case 6: // Contract Over
        return "Notify the LENDER and RENTER.";
      case 7: // Item to HQ
        return "Dispatch a rider to the Renter's address for item retrieval."
      case 8: // HQ Check
        return "Inspect the item for any defect. Mark, record, and inform the lender of the seen condition is necessary.";
      case 9: // Item to Lender
        return "Notify the LENDER and RENTER. Dispatch a rider to the Lender's address to return the item."
      case 10: // Renter Received
        return "Press the FINISH button to complete this transaction.";
      case 11: // HIDDEN ########
        return "Transactions complete!"
      default:
        return null;
    }
  }

  const fcm = (index, title, body, token) => { // the actual function that sends to fcm servers
    if (token === props.lender_fcm_token) { // first sent the button label to spinner for user feedback
      setLButtonLabel(lButtonLabel => (<CircularProgress size={22} color="inherit"/>));
    } else {
      setRButtonLabel(rButtonLabel => (<CircularProgress size={22} color="inherit"/>));
    }

    fetch('https://fcm.googleapis.com/fcm/send', { // contacting server
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Authorization' : 'key=AAAAfIlkwIw:APA91bGDIpxkFFsf4hpqnmiQ5OVKexxce8BQ6xbOixXdzXUh_q13WRy6j33vR7VXI-_TJ3ePsU6xRkr044jDhZvkxEZCYjAC9ti2AtYeiTNPdGStrRt-mz3S10K0W8J3i-8JJrG0PnEW',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // to: 'ceFGfb13aSA:APA91bHD9-Gony4oig3ZxOwGsamb47EZl0U0TqsW_yuKHRoxCQnNqEhYPs2-kUUe_9tU48JEYBYOWzzxPzdWpXd-9epQs8tMYL37Pm2X1ZQwWbH3ikeAME80DgameRQASVnxS3mNOCq5',
        // to: 'fd3Owf5FJms:APA91bFcFrZEDpJ7qPxC9zu1Bf8_m-zluMiJDBUC55JQzAbW2I1SG-KqyX48ca-LnQG-komhqhhIk7pKPcxnQ01nlXetGLdeD6pu-9YHHu1rOw7PEBPyqsO9cnT5unaRsMdEiT26mTqZ'
        to: token,
        notification: {
          title: title,
          body: body
        }
      })
    })
    .then((response) => response.json())
    .then((data) => {
      if (token === props.lender_fcm_token) { // set button label to the responce of the fcm server
        if(data.success) {
          props.query.update({
            lender_notif_status: index,
          })
          setLButtonLabel(lButtonLabel => "Sent");
        } else {
          setLButtonLabel(lButtonLabel => "Send Failed");
        }
      } else {
        if(data.success) {
          props.query.update({
            renter_notif_status: index,
          })
          setRButtonLabel(rButtonLabel => "Sent");
        } else {
          setRButtonLabel(rButtonLabel => "Send Failed");
        }
      }
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  const [lButtonLabel, setLButtonLabel] = useState((stepperToMsg[props.status] === props.lender_notif_status) ? "Sent" : "Notify Lender");
  const fcmButton_L = (index) => { // NOTIFY LENDER button clicked
    fcm(index, scriptedTitles[index].L, scriptedBodies[index].L, props.lender_fcm_token);
  }
  const [rButtonLabel, setRButtonLabel] = useState((stepperToMsg[props.status] === props.renter_notif_status) ? "Sent" : "Notify Renter");
  const fcmButton_R = (index) => { // NOTIFY RENTER button clicked
    fcm(index, scriptedTitles[index].R, scriptedBodies[index].R, props.renter_fcm_token);
  }

  const updateStatus = (currStatus) => { // NEXT button clicked
    props.query.update({
      status: currStatus,
    });
    setLButtonLabel(lButtonLabel => "Notify Lender");
    setRButtonLabel(rButtonLabel => "Notify Renter");
  }

  return(
    <Box borderRadius={4} border={1} borderColor="grey.400" style={{padding:"5px 10px"}}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={4} style={{marginTop:"10px",display: (props.status === 11) ? "none" : "block"}}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {updateStatus((props.status === null) ? 0 : props.status+1)}}
              >
                {(props.status === null) ? 'accept request' : (props.status === 10) ? 'finish' : 'next'}
              </Button>
            </Grid>
            <Grid item xs={4} style={{marginTop:"10px",display: (props.status === 0) ? "block" : "none"}}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={() => {updateStatus(-1)}}
              >
                {"decline"}
              </Button>
            </Grid>
            <Grid item xs={4} style={{marginTop:"10px",display: ((props.status >= 0 && props.status < 11) && props.status !== null) ? "block" : "none"}}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {updateStatus(null)}}
                style={{backgroundColor:"crimson",color:"white"}}
              >
                {"void request"}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Box display={((props.status >= 0 && props.status < 12 ) && props.status !== null) ? "block" : "none"} borderRadius={4} border={1} borderColor="#fcdfe6"
                style={{padding:"10px 20px", backgroundColor:"#fcdfe6"}}>
                <Typography variant="subtitle1" color="textPrimary">
                  {stepperContent(props.status)}
                </Typography>
                <Grid container spacing={1} style={{paddingTop:"10px"}}>
                  <Grid item xs={6} style={{display: (stepperToMsg[props.status] !== null) ? "block" : "none"}}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} style={{backgroundColor:"white"}}>
                        <TfNoEdit label="Title" variant="outlined"
                        value={(stepperToMsg[props.status] !== null && props.status !== null) ? scriptedTitles[stepperToMsg[props.status]].L : "nada"}
                        multiLine rows={2}
                        />
                      </Grid>
                      <Grid item xs={12} style={{backgroundColor:"white"}}>
                        <TfNoEdit label="Body" variant="outlined"
                        value={(stepperToMsg[props.status] !== null && props.status !== null) ? scriptedBodies[stepperToMsg[props.status]].L : "nada"}
                        multiLine rows={3}
                        />
                      </Grid>
                      <Grid item xs={12} style={{paddingTop:"10px"}}>
                        <Button size="small" variant="contained" color="primary"
                          disabled={props.status === 5 || stepperToMsg[props.status] === props.lender_notif_status}
                          onClick={() => {fcmButton_L(stepperToMsg[props.status])}}>
                          {lButtonLabel}
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6} style={{display: (stepperToMsg[props.status] !== null) ? "block" : "none"}}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} style={{backgroundColor:"white"}}>
                        <TfNoEdit label="Title" variant="outlined"
                        value={(stepperToMsg[props.status] !== null && props.status !== null) ? scriptedTitles[stepperToMsg[props.status]].R : "nada"}
                        multiLine rows={2}
                        />
                      </Grid>
                      <Grid item xs={12} style={{backgroundColor:"white"}}>
                        <TfNoEdit label="Body" variant="outlined"
                        value={(stepperToMsg[props.status] !== null && props.status !== null) ? scriptedBodies[stepperToMsg[props.status]].R : "nada"}
                        multiLine rows={3}
                        />
                      </Grid>
                      <Grid item xs={12} style={{paddingTop:"10px"}}>
                        <Button size="small" variant="contained" color="primary"
                          disabled={props.status === 11 || stepperToMsg[props.status] === props.renter_notif_status}
                          onClick={() => {fcmButton_R(stepperToMsg[props.status])}}>
                          {rButtonLabel}
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Stepper activeStep={props.status} orientation="horizontal" alternativeLabel style={{padding:"10px"}}>
            <Step key="Processing Req">
              <StepLabel>Processing Req</StepLabel>
            </Step>
            <Step key="Item to HQ">
              <StepLabel>Item to HQ</StepLabel>
            </Step>
            <Step key="HQ Check">
              <StepLabel>HQ Check</StepLabel>
            </Step>
            <Step key="Item to Renter">
              <StepLabel>Item to Renter</StepLabel>
            </Step>
            <Step key="Renter Received">
              <StepLabel>Renter Received</StepLabel>
            </Step>
          </Stepper>
        </Grid>
        <Grid item xs={12}>
          <Stepper activeStep={props.status-6} orientation="horizontal" alternativeLabel style={{padding:"10px"}}>
            <Step key="Contract Over">
              <StepLabel icon={6}>Contract Over</StepLabel>
            </Step>
            <Step key="Item to HQ">
              <StepLabel icon={7}>Item to HQ</StepLabel>
            </Step>
            <Step key="HQ Check">
              <StepLabel icon={8}>HQ Check</StepLabel>
            </Step>
            <Step key="Item to Lender">
              <StepLabel icon={9}>Item to Lender</StepLabel>
            </Step>
            <Step key="Lender Received">
              <StepLabel icon={10}>Renter Received</StepLabel>
            </Step>
          </Stepper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default StepperFCM;
