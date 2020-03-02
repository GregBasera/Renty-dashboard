import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Box from '@material-ui/core/Box';

function LenderToRenterStepper(props) {
  const [activeStep, setActiveStep] = React.useState(0+props.currStatus);
  console.log(props.currStatus);
  const steps = ['Request Processing', 'Item to HQ', 'HQ Check', 'Item to Renter', 'Renter Received'];

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
    //     fcm("A person wants to rent an item you listed.", "We are currently processing a request for your item. A staff member will be contacting you shortly to confirm if the item is still available."); // lender
    //     fcm("Your request has been processed.", "The lender is now being asked for approval."); // renter
    //     break;
    //   case 2:
    //     fcm("Item preparation complete.", "The item is now on its way to the person who rented it. <renting details>"); // lender
    //     fcm("Item preparation complete.", "The item is now on its way to you."); // renter
    //     break;
    //   case 4:
    //     fcm("The item has been received.", "The item is due <renting details>. Thank you."); // renter
    //     break;
    //   default:
    //     break;
    // }

    props.up(activeStep)
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
    props.up(activeStep)
  };

  return (
    <div>
      <Box hidden={(props.currStatus <= 4) ? false : true}>
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

export default LenderToRenterStepper;
