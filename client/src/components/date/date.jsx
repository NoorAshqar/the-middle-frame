import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    // KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
// import { da } from 'date-fns/locale';

export default function MaterialUIPickers({ name, checkInOrOut }) {
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [open, setOpen] = React.useState(false);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setOpen(false)
        var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
            .toISOString()
            .split("T")[0];
        // console.log(dateString)
        checkInOrOut(dateString)
    };

    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        onOpen={() => setOpen(true)}
                        onClose={() => setOpen(false)}
                        open={open}
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
        </div>
    );
}
