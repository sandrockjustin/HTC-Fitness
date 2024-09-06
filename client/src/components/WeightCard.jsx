import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Dialog,
  Grid2,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';

const WeightCard = ({
  title,
  weight,
  showInput,
  onButtonClick,
  onInputChange,
  onSubmit,
  onCancel,
  buttonText,
  inputLabel,
  isCurrentWeightCard,
  onAddDateWeight,
}) => {
  const [date, setDate] = useState(dayjs());
  const [dateWeight, setDateWeight] = useState('');
  const [openDateDialog, setOpenDateDialog] = useState(false);

  const handleDateSubmit = () => {
    if (date && dateWeight) {
      onAddDateWeight(date, dateWeight);
      setOpenDateDialog(false);
      setDate(dayjs());
      setDateWeight('');
    }
  };

  return (
    <Grid2 xs={12} md={6}>
      <Card sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body1">
            {weight ? `${weight} lbs.` : `No ${title.toLowerCase()} set.`}
          </Typography>
        </CardContent>
        <CardContent >
          {isCurrentWeightCard ? (
            <>
              <Button variant="contained" onClick={() => setOpenDateDialog(true)}>
                Add Weight
              </Button>
              <Dialog open={openDateDialog} onClose={() => setOpenDateDialog(false)}>
                <Stack spacing={2} sx={{ p: 3 }}>
                  <DatePicker
                    label="Select Date"
                    value={date}
                    onChange={(newDate) => setDate(newDate)}
                    // renderInput={(params) => <TextField {...params} />}
                  />
                  <TextField
                    type="number"
                    label="Weight"
                    value={dateWeight}
                    onChange={(e) => setDateWeight(e.target.value)}
                    fullWidth
                  />
                  <Stack direction="row" spacing={1}>
                    <Button variant="contained" onClick={handleDateSubmit}>
                      Submit
                    </Button>
                    <Button variant="outlined" onClick={() => setOpenDateDialog(false)}>
                      Cancel
                    </Button>
                  </Stack>
                </Stack>
              </Dialog>
            </>
          ) : (
            <>
              {!showInput ? (
                <Button variant="contained" color="primary" onClick={onButtonClick}>
                  {buttonText}
                </Button>
              ) : (
                <Stack spacing={1} sx={{ mt: 2 }}>
                  <TextField
                    type="number"
                    label={inputLabel}
                    variant="outlined"
                    value={weight}
                    onChange={onInputChange}
                    sx={{ mb: 2, mr: 1 }}
                    fullWidth
                  />
                  <Stack direction="row" spacing={1}>
                    <Button variant="contained" color="primary" onClick={onSubmit}>
                      Add Weight
                    </Button>
                    <Button variant="outlined" color="error" onClick={onCancel}>
                      Cancel
                    </Button>
                  </Stack>
                </Stack>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </Grid2>
  );
};
export default WeightCard;
