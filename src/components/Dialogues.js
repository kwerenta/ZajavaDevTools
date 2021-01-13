import React, { useState, useRef, useEffect, useContext } from 'react'
import Confirmation from './Confirmation'
import Snackalert from './Snackalert'

import { UserContext } from '../User'
import { db } from '../firebaseApp'
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
import Grow from '@material-ui/core/Grow'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

import SendIcon from '@material-ui/icons/Send'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import DoneIcon from '@material-ui/icons/Done'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import AssignmentIcon from '@material-ui/icons/Assignment';

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
        height: '79vh',
        overflowY: 'auto'
    },
    message: {
        padding: theme.spacing(1.5),
        paddingLeft: theme.spacing(2.5),
        paddingRight: theme.spacing(2.5),
        borderRadius: theme.spacing(2),
        maxWidth: '50%'
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

const Message = (props) => {
    const { dialogue } = props;
    const classes = useStyles();
    const [options, setOptions] = useState(false);

    const handleMouseEnter = () => {
        setOptions(true);
    }
    const handleMouseLeave = () => {
        setOptions(false);
    }

    return (
        <ListItem onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Grid container direction={dialogue.sender == "player" ? "row-reverse" : "row"} justify="flex-start" alignItems="center">

                {dialogue.sender == "narrator" && <Grid item xs={3} />}

                <Grid item xs={dialogue.sender == "narrator" && 6} className={clsx(classes.message, dialogue.sender == "npc" ? classes.textNpc : dialogue.sender == "player" ? classes.textPlayer : classes.textNarrator)}>
                    <ListItemText align={dialogue.sender == "narrator" ? "center" : "left"} primary={dialogue.text}></ListItemText>
                </Grid>

                {options && !props.completed && (
                    <Grid container item direction={dialogue.sender == "player" ? "row-reverse" : "row"} xs={2} style={{ paddingLeft: 16, paddingRight: 16 }}>
                        <Grow in={options} timeout={500}>
                            <Tooltip title="Edytuj wiadomość" arrow>
                                <IconButton onClick={() => { props.handleClickEdit(dialogue.id) }} size="small">
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                        </Grow>
                        {/* <Grow in={options} timeout={500}>
                            <Tooltip title="Wstaw wiadomość poniżej" arrow>
                                <IconButton disabled onClick={() => { props.handleClickEdit(dialogue.id) }} size="small">
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                        </Grow> */}
                        <Grow in={options} timeout={500}>
                            <Tooltip title="Usuń wiadomość" arrow>
                                <IconButton onClick={() => { props.handleClickDelete(dialogue.id) }} size="small">
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </Grow>
                    </Grid>
                )}

            </Grid>
        </ListItem>
    )
}

const Chat = (props) => {
    const classes = useStyles();

    const dialoguesRef = props.character && props.quest && db.collection(`/characters/${props.character.id}/quests/${props.quest.id}/dialogues`);
    const query = dialoguesRef && dialoguesRef.orderBy('order');
    const [dialogues] = useCollectionData(query, { idField: 'id' });

    const { userData } = useContext(UserContext);

    const dummy = useRef();

    const status = props.quest && props.quest.status;
    const isCompleted = status && status > 0 ? true : false;
    const isInGame = status && status == 2 ? true : false;

    const [form, setForm] = useState({ sender: "", text: "", name: props.quest && props.quest.name });
    const [messageId, setMessageId] = useState("");
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [edit, setEdit] = useState(false);
    const [snack, setSnack] = useState({ open: false, severity: "", text: "" });
    const [questStatus, setQuestStatus] = useState({ completed: isCompleted, ingame: isInGame });
    const [update, setUpdate] = useState(false);

    const handleClickDelete = (id) => {
        setMessageId(id);
        setOpenConfirmation(true);
    };
    const handleClickEdit = (id) => {
        setMessageId(id);
        setEdit(true);
    }

    useEffect(() => {
        if (dialogues && messageId != "" && edit) {
            const dialogue = dialogues.find(dialogue => dialogue.id === messageId);
            setForm({ ...form, sender: dialogue.sender, text: dialogue.text, order: dialogue.order });
        }
    }, [messageId]);

    const handleCloseConfirmation = () => {
        setOpenConfirmation(false);
    }
    const handleCloseSnackbar = () => {
        setSnack({ ...snack, open: false });
    }

    const handleChange = (e) => {
        if (e.target.type == 'checkbox') {
            setQuestStatus({ ...questStatus, [e.target.name]: e.target.checked });
        }
        else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    }

    const addMessage = async () => {
        if (form.sender && form.text) {
            const prevOrder = dialogues.length === 0 ? -1 : dialogues[dialogues.length - 1].order;
            await dialoguesRef.add({
                order: prevOrder + 1,
                text: form.text,
                sender: form.sender
            })
                .then(() => {
                    dummy.current.scrollIntoView({ behavior: 'smooth' });
                    setForm({ ...form, sender: "", text: "" });
                })
                .catch(error => {
                    setSnack({ open: true, severity: "error", text: `Błąd: ${error}` });
                });
        }
        else {
            setSnack({ open: true, severity: "error", text: 'Pole mówca oraz tekst nie mogą być puste!' });
        }
    }
    const editMessage = () => {
        if (form.sender && form.text) {
            dialoguesRef.doc(messageId)
                .update({
                    order: form.order,
                    text: form.text,
                    sender: form.sender,
                })
                .then(() => {
                    setForm({ ...form, sender: "", text: "" });
                    setEdit(false);
                    setMessageId('');
                })
                .catch(error => {
                    setSnack({ open: true, severity: "error", text: `Błąd: ${error}` });
                });
        } else {
            setSnack({ open: true, severity: "error", text: 'Pole mówca oraz tekst nie mogą być puste!' });
        }
    }
    const deleteMessage = () => {
        handleCloseConfirmation();
        db.doc(`/characters/${props.character.id}/quests/${props.quest.id}/dialogues/${messageId}`).delete();
    }
    useEffect(() => {
        if (form.name) {
            db.collection('characters')
                .doc(props.character.id)
                .collection('quests')
                .doc(props.quest.id)
                .update({
                    name: form.name,
                    status: questStatus.ingame ? 2 : questStatus.completed ? 1 : 0
                })
        }
    }, [questStatus, update]);

    return (
        <>
            <Grid container component={Paper} className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500}>
                    <List>
                        <ListItem key="NPC">
                            <ListItemIcon>
                                <Avatar alt="NPC" src="https://i1.sndcdn.com/avatars-000671349956-8oskmm-t500x500.jpg" />
                            </ListItemIcon>
                            <ListItemText primary={props.character.name}></ListItemText>
                        </ListItem>
                        <ListItem key="Quest">
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <TextField
                                fullWidth
                                error={!form.name}
                                helperText={!form.name && "Nazwa zadania nie może być pusta!"}
                                label="Nazwa zadania"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                onBlur={() => setUpdate(!update)}
                            />
                        </ListItem>
                    </List>

                    <Divider />

                    <List>
                        <ListItem key="completed">
                            <ListItemIcon>
                                <DoneIcon />
                            </ListItemIcon>
                            <Tooltip title="Zmienia stan ukończenia prac nad zadaniem" arrow>
                                <FormControlLabel
                                    disabled={questStatus.ingame}
                                    control={
                                        <Switch
                                            checked={questStatus.completed}
                                            onChange={handleChange}
                                            name="completed"
                                            color="primary"
                                        />
                                    }
                                    label="Ukończono"
                                    labelPlacement="start"
                                    style={{ margin: 0 }}
                                />
                            </Tooltip>
                        </ListItem>
                        {userData.rank == "administrator" &&
                            (<ListItem key="ingame">
                                <ListItemIcon>
                                    <DoneAllIcon />
                                </ListItemIcon>
                                <Tooltip title="Zmienia stan ukończenia prac nad zadaniem" arrow>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                disabled={!questStatus.completed}
                                                checked={questStatus.ingame}
                                                onChange={handleChange}
                                                name="ingame"
                                                color="primary"
                                            />
                                        }
                                        label="Przeniesiono do gry"
                                        labelPlacement="start"
                                        style={{ margin: 0 }}
                                    />
                                </Tooltip>
                            </ListItem>)}
                        <ListItem button disabled key="requirements">
                            <ListItemIcon>
                                <EditIcon />
                            </ListItemIcon>
                            <ListItemText primary="Wymagania startowe"></ListItemText>
                        </ListItem>
                        <ListItem button disabled key="rewardsStart">
                            <ListItemIcon>
                                <EditIcon />
                            </ListItemIcon>
                            <ListItemText primary="Nagroda startowa"></ListItemText>
                        </ListItem>
                        <ListItem button disabled key="rewards">
                            <ListItemIcon>
                                <EditIcon />
                            </ListItemIcon>
                            <ListItemText primary="Nagroda końcowa"></ListItemText>
                        </ListItem>
                        <ListItem button disabled key="othernpcs">
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
                            <Message
                                key={dialogue.id}
                                dialogue={dialogue}
                                handleClickDelete={handleClickDelete}
                                handleClickEdit={handleClickEdit}
                                completed={questStatus.completed}
                            />
                        ))}

                        <ListItem button disabled>
                            <Grid container justify="center" alignItems="center">

                                <Grid item xs={3} className={classes.message} style={{ backgroundColor: '#888' }}>
                                    <ListItemText align="center" primary="Dodaj nowy etap"></ListItemText>
                                </Grid>

                            </Grid>
                        </ListItem>

                        <span ref={dummy}></span>

                    </List>
                    <Divider />
                    <Grid container style={{ padding: '20px' }} spacing={4}>
                        <Grid item xs={3}>
                            <FormControl disabled={questStatus.completed} variant="outlined" fullWidth>
                                <InputLabel id="senderSelectLabelId">Mówca</InputLabel>
                                <Select name="sender" key="sender" labelId="senderSelectLabelId" label="Mówca" value={form.sender} onChange={handleChange}>
                                    <MenuItem value='npc'>NPC</MenuItem>
                                    <MenuItem value='player'>Gracz</MenuItem>
                                    <MenuItem value='narrator'>Narrator</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                disabled={questStatus.completed}
                                multiline name="text"
                                label="Tekst"
                                fullWidth
                                variant="outlined"
                                noValidate
                                inputProps={{ maxLength: 246 }}
                                value={form.text}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={1}>

                            {edit ?
                                <Fab disabled={questStatus.completed} color="secondary" aria-label="edit" onClick={editMessage}><EditIcon /></Fab>
                                :
                                <Fab disabled={questStatus.completed} color="primary" aria-label="add" onClick={addMessage}><SendIcon /></Fab>
                            }

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Confirmation
                actionText="Usuń"
                actionClick={deleteMessage}
                openConfirmation={openConfirmation}
                handleCloseConfirmation={handleCloseConfirmation}
                text={
                    edit ? "Czy na pewno chcesz zedytować tę kwestię? Operacji nie będzie można już cofnąć."
                        : "Czy na pewno chcesz usunąć tę kwestię? Operacji nie będzie można już cofnąć."}
            />

            <Snackalert snack={snack} handleClose={handleCloseSnackbar} />

        </>
    );
}

export default Chat;