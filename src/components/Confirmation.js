import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

export default function Confirmation(props) {
    return (
        <>
            <Dialog
                open={props.openConfirmation}
                onClose={props.handleCloseConfirmation}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Potwierdzenie"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{props.text}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleCloseConfirmation} color="primary">
                        Anuluj
                    </Button>
                    <Button onClick={props.actionClick} color="secondary">
                        {props.actionText}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
