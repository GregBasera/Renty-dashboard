import React from 'react';
import { useForm } from 'react-hook-form';

// Layout
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import MobileStepper from '@material-ui/core/MobileStepper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import warning from './warning_sign.png';

function ItemFieldElements(props) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = (props.info.pictures) ? props.info.pictures.length : 1;
  const [checked, setChecked] = React.useState((props.info.is_approved) ? props.info.is_approved : false);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  const toggleChecked = () => {
    setChecked(prev => !prev);
  };

  const { handleSubmit, register, formState } = useForm();
  const showApplyButton = formState.dirty;
  const onSubmit = values => {
    console.log(values);
  };

  const [value, setValue] = React.useState((props.info.item_name) ? props.info.item_name : "--");
  const updateValue = (event) => {
    const val = event.target.value;
    setValue(value => val);
  }

  return(
    <div>
        <Card style={{backgroundColor:"#c3c3c3"}}>
          <CardMedia
            style={{height:"200px"}}
            image={(props.info.pictures) ? props.info.pictures[activeStep].https : warning}
            title="pictures"
          />
          <MobileStepper
            steps={maxSteps}
            position="static"
            variant="text"
            activeStep={activeStep}
            nextButton={
              <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                Next
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                Back
              </Button>
            }
          />
        </Card>
    </div>
  )
}

export default ItemFieldElements;
