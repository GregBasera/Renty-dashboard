import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Box from '@material-ui/core/Box';

function RenterToLenderStepper(props) {
  const [activeStep, setActiveStep] = React.useState(5-props.currStatus);
  const steps = ['Contract Over', 'Item to HQ', 'HQ Check', 'Item to Lender', 'Lender Received'];

  const fcm = (title, body) => {
    console.log(title, body);
    fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Authorization' : 'key=AAAAfIlkwIw:APA91bGDIpxkFFsf4hpqnmiQ5OVKexxce8BQ6xbOixXdzXUh_q13WRy6j33vR7VXI-_TJ3ePsU6xRkr044jDhZvkxEZCYjAC9ti2AtYeiTNPdGStrRt-mz3S10K0W8J3i-8JJrG0PnEW',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: 'ceFGfb13aSA:APA91bHD9-Gony4oig3ZxOwGsamb47EZl0U0TqsW_yuKHRoxCQnNqEhYPs2-kUUe_9tU48JEYBYOWzzxPzdWpXd-9epQs8tMYL37Pm2X1ZQwWbH3ikeAME80DgameRQASVnxS3mNOCq5',
        // to: '/topics/android',
        notification: {
          title: title,
          body: body
        }
      })
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('FCM API responce:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    // switch(activeStep) {
    //   case 0:
    //     fcm("An item contract just expired.", "The renter is now being adviced to prepare the item for retrieval."); // lender
    //     fcm("Your contract just expired.", "Please prepare the item for retrieval. A rider will be visiting your address to retrieve the item."); // renter
    //     break;
    //   case 2:
    //     fcm("Your item just arrived in the Renty HQ.", "Its condition is now being inspected."); // lender
    //     fcm("Item recieved.", "Renty HQ just received the item you just rented. Thank you <promotions>"); // renter
    //     break;
    //   case 4:
    //     fcm("Item and Lender reunited.", "<promotions>."); // Lender
    //     break;
    //   default:
    //     break;
    // }

    props.up(activeStep+5)
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
    props.up(activeStep+5)
  };

  return (
    <div>
      <Box hidden={(props.currStatus >= 4) ? false : true}>
        <Stepper activeStep={activeStep} orientation="horizontal" alternativeLabel>
          {steps.map((label, index) => {
            return (
              <Step key={label} onClick={(index < activeStep) ? handleBack : handleNext}>
                <StepLabel>
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
    </div>
  );
}

export default RenterToLenderStepper;
