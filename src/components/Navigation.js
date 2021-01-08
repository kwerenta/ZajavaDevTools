import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert'

import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: 16,
    },
    title: {
        flexGrow: 1,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function Navigation(props) {
    const classes = useStyles();
    const [isOpened, setIsOpened] = useState(false);
    const [open, setOpen] = useState(false);

    function handleClose() {
        setOpen(false);
    }
    function handleClick() {
        setOpen(true);
    }

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsOpened(open);
    };

    const list = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {['Pulpit', 'Zadania', 'Przedmioty'].map((text, index) => (
                    <ListItem button key={text} onClick={() => { index != 2 ? props.setScreen(text) : handleClick() }}>
                        <ListItemIcon>{index == 0 ? <HomeIcon /> : index == 1 ? <QuestionAnswerIcon /> : <EditIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['WIP'].map((text) => (
                    <ListItem button key={text} onClick={handleClick}>
                        <ListItemIcon><InfoIcon /></ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Button onClick={() => props.setScreen("Pulpit")}>ZajavaDevTools 😎</Button>
                    </Typography>
                    <Button color="inherit" onClick={props.logOut}>Wyloguj się</Button>
                </Toolbar>
            </AppBar>
            <Drawer open={isOpened} onClose={toggleDrawer(false)}>
                {list()}
            </Drawer>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning">Potrzebujesz czegoś? Zgłoś to w wiadomości prywatnej</Alert>
            </Snackbar>
        </div>
    );
}
