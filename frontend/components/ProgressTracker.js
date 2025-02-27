import { Stepper, Step, StepLabel, Box } from '@mui/material';

const ProgressTracker = ({ activeStep }) => {
  const steps = ['Registered', 'Approved', 'In Process', 'Done'];

  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default ProgressTracker;