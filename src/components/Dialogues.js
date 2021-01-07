import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Fab from '@material-ui/core/Fab'
import SendIcon from '@material-ui/icons/Send'
import EditIcon from '@material-ui/icons/Edit'

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 500,
    },
    chatSection: {
        width: '100%',
        height: '93vh',
        overflow: 'hidden'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '80vh',
        overflowY: 'auto'
    },
    message: {
        padding: theme.spacing(1.5),
        paddingLeft: theme.spacing(2.5),
        borderRadius: theme.spacing(2)
    },
    textPlayer: {
        backgroundColor: '#b02e26'
    },
    textNpc: {
        backgroundColor: '#3ab3da'
    },
    textNarrator: {
        backgroundColor: '#80c71f'
    }

}));

const Chat = (props) => {
    const classes = useStyles();

    const dialoguesRef = props.db.collection('/characters/4YzDsre5CT52wVFMnlxI/quests/kSrW6W6feR35lyltmrqZ/dialogs');
    const query = dialoguesRef.orderBy('order');
    const [dialogues] = useCollectionData(query, { idField: 'id' });


    const [sender, setSender] = useState('');

    const handleChange = (e) => {
        setSender(e.target.value)
    }

    return (
        <div>
            <Grid container component={Paper} className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500}>
                    <List>
                        <ListItem key="NPC">
                            <ListItemIcon>
                                <Avatar alt="NPC" src="https://i1.sndcdn.com/avatars-000671349956-8oskmm-t500x500.jpg" />
                            </ListItemIcon>
                            <ListItemText primary={props.character.name}></ListItemText>
                            <ListItemText primary={props.quest.name}></ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button key="requirements">
                            <ListItemIcon>
                                <EditIcon />
                            </ListItemIcon>
                            <ListItemText primary="Wymagania startowe"></ListItemText>
                        </ListItem>
                        <ListItem button key="rewardsStart">
                            <ListItemIcon>
                                <EditIcon />
                            </ListItemIcon>
                            <ListItemText primary="Nagroda startowa"></ListItemText>
                        </ListItem>
                        <ListItem button key="rewards">
                            <ListItemIcon>
                                <EditIcon />
                            </ListItemIcon>
                            <ListItemText primary="Nagroda końcowa"></ListItemText>
                        </ListItem>
                        <ListItem button key="othernpcs">
                            <ListItemIcon>
                                <EditIcon />
                            </ListItemIcon>
                            <ListItemText primary="Inni NPC"></ListItemText>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={9}>
                    <List className={classes.messageArea}>
                        {dialogues && dialogues.map(dialogue => (
                            <ListItem key={dialogue.id}>
                                <Grid container justify={dialogue.sender == "npc" ? "flex-start" : dialogue.sender == "player" ? "flex-end" : "center"}>
                                    <Grid item xs={8} className={clsx(classes.message, dialogue.sender == "npc" ? classes.textNpc : dialogue.sender == "player" ? classes.textPlayer : classes.textNarrator)}>
                                        <ListItemText align={dialogue.sender == "narrator" ? "center" : "left"} color='#000' primary={dialogue.text}></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <Grid container style={{ padding: '20px' }} spacing={4}>
                        <Grid item xs={3}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="senderSelectLabelId">Mówca</InputLabel>
                                <Select id="senderSelect" labelId="senderSelectLabelId" label="Mówca" value={sender} onChange={handleChange}>
                                    <MenuItem value='npc'>NPC</MenuItem>
                                    <MenuItem value='player'>Gracz</MenuItem>
                                    <MenuItem value='narrator'>Narrator</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField id="messageBox" label="Tekst" fullWidth variant="outlined" noValidate />
                        </Grid>
                        <Grid item xs={1}>
                            <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Chat;