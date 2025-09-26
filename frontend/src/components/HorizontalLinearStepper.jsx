import React from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';

const HorizontalLinearStepper = ({ steps, activeStep }) => {
  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default HorizontalLinearStepper; 