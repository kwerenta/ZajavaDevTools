import React from "react";
import changelog from "./changelog.json";

import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";

const Release = ({ log }) => (
    <DialogContent>
        <DialogContentText>{log.version}</DialogContentText>
        <List>
            {log.changes.map((change, index) => (
                <ListItem key={index}>{change}</ListItem>
            ))}
        </List>
        <Divider />
    </DialogContent>
);

const Changelog = props => (
    <Dialog open={props.open} onClose={props.handleClose} scroll="body" fullWidth maxWidth="md">
        <DialogTitle id="changelog-title">Lista zmian</DialogTitle>

        {changelog.map(log => (
            <Release key={log.version} log={log} />
        ))}

        <DialogActions>
            <Button onClick={props.handleClose}>Zamknij</Button>
        </DialogActions>
    </Dialog>
);

export default Changelog;
