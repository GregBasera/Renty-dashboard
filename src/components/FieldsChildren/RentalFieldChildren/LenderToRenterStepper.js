import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

function LenderToRenterStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ['Request Processing', 'Item to HQ', 'HQ Check', 'Item to Renter', 'Renter Received'];

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <div>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel>
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
}

export default LenderToRenterStepper;
