import React from 'react'
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default (props) => {
    return (
        <Snackbar open={props.snack.open} autoHideDuration={6000} onClose={props.handleClose}>
            <Alert onClose={props.handleClose} severity={props.snack.severity}>{props.snack.text}</Alert>
        </Snackbar>
    )
}