import React, { useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { auth } from '../firebaseApp'
import Snackalert from './Snackalert'

import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'
import EditIcon from '@material-ui/icons/Edit'

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

    const handleLogout = () => {
        auth.signOut();
        props.setNavbar(false);
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsOpened(open);
    };

    const listItems = [
        {
            text: "Pulpit",
            to: "/",
            icon: <HomeIcon />
        },
        {
            text: "Zadania",
            to: "/quests",
            icon: <QuestionAnswerIcon />
        },
        // {
        //     text: "Przedmioty",
        //     to: "/items",
        //     icon: <EditIcon />
        // }

    ]

    const list = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {listItems.map(({ text, to, icon }) => (
                    <ListItem button component={Link} to={to} key={text}>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Przedmioty'].map((text) => (
                    <ListItem button key={text} onClick={handleClick}>
                        <ListItemIcon><EditIcon /></ListItemIcon>
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
                        <Button component={Link} to="/">ZajavaDevTools 😎</Button>
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>Wyloguj się</Button>
                </Toolbar>
            </AppBar>
            <Drawer open={isOpened} onClose={toggleDrawer(false)}>
                {list()}
            </Drawer>

            <Snackalert snack={{ open: open, severity: "warning", text: "Potrzebujesz czegoś? Zgłoś to w wiadomości prywatnej." }} handleClose={handleClose} />

        </div >
    );
}
