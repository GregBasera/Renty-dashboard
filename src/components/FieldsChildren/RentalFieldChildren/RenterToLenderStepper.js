import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

function RenterToLenderStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ['Contract Over', 'Item to HQ', 'HQ Check', 'Item to Lender', 'Lender Received'];

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <div>
      <Stepper activeStep={activeStep} orientation="vertical" style={{ flexDirection: "column-reverse" }}>
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

export default RenterToLenderStepper;
