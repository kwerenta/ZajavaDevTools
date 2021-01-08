import React, { useEffect, useState } from 'react'
import QuestEditor from './QuestEditor'
import Confirmation from './Confirmation'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Fab from '@material-ui/core/Fab'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'

import { useCollectionData } from 'react-firebase-hooks/firestore'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell>{row.occupation}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>
                    <IconButton aria-label="open character editor" size="small" onClick={() => { props.handleClickOpen(true, row.id); }}>
                        <EditIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Zadania
              </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nazwa</TableCell>
                                        <TableCell />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.quests && row.quests.map((quest) => (
                                        <TableRow key={quest.name}>
                                            <TableCell>
                                                {quest.name}
                                            </TableCell>
                                            <TableCell>
                                                <IconButton aria-label="open quest editor" size="small" onClick={() => { props.handleClickOpenEditor(row.id, quest.id) }}>
                                                    <EditIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow key={`DodajQuesta${row.id}`}>
                                        <TableCell>
                                            Dodaj zadanie
                                        </TableCell>
                                        <TableCell>
                                            <IconButton aria-label="add quest" size="small">
                                                <AddIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function Quests(props) {

    const [open, setOpen] = useState(false);
    const [openConfirmation, setOpenConfirmation] = useState(false);

    const [edit, setEdit] = useState(false);
    const [form, setForm] = useState({ name: "", location: "", skin: "", occupation: "" })
    const [formError, setFormError] = useState({ name: false, location: false });
    const [characterId, setCharacterId] = useState("");
    const [questId, setQuestId] = useState("");
    const [snack, setSnack] = useState({ open: false, severity: "success", text: "Postać została utworzona!" });
    const [openEditor, setOpenEditor] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (['name', 'location'].includes(e.target.name)) {
            e.target.value == "" ?
                setFormError({ ...formError, [e.target.name]: true }) :
                setFormError({ ...formError, [e.target.name]: false })
        }
    }

    const handleClickOpen = (edit, id) => {
        setOpen(true);
        setEdit(edit);
        setCharacterId(id);
        !edit && setForm({ name: "", location: "", skin: "", occupation: "" });
        setFormError({ name: false, location: false });
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenEditor = (charId, questId) => {
        setCharacterId(charId);
        setQuestId(questId);
        setOpenEditor(true);
    }
    const handleCloseEditor = () => {
        setOpenEditor(false);
    }

    const handleClickOpenConfirmation = () => {
        setOpenConfirmation(true);
    }
    const handleCloseConfirmation = () => {
        setOpenConfirmation(false);
    };

    const handleCloseSnackbar = () => {
        setSnack({ ...snack, open: false });
    }
    const deleteCharacter = () => {
        handleCloseConfirmation();
        handleClose();
        props.db.collection("characters").doc(characterId).delete()
            .then(() => {
                setSnack({ open: true, severity: "success", text: "Postać została usunięta!" });
            })
            .catch(error => {
                setSnack({ open: true, severity: "error", text: `Błąd: ${error}` });
            });
    }
    const addQuest = async () => {
        await charactersRef.add({
            name: form.name,
        })
            .then(() => {
                setSnack({ open: true, severity: "success", text: "Postać dodano zadanie do wybranej postaci!" });
            })
            .catch(error => {
                setSnack({ open: true, severity: "error", text: `Błąd: ${error}` });
            });
    }
    const handleSubmit = async () => {
        if (form.name && form.location) {
            if (!edit) {
                await charactersRef.add({
                    name: form.name,
                    location: form.location,
                    occupation: form.occupation,
                    skin: form.skin
                })
                    .then(() => {
                        setSnack({ open: true, severity: "success", text: "Postać została utworzona!" });
                    })
                    .catch(error => {
                        setSnack({ open: true, severity: "error", text: `Błąd: ${error}` });
                    });
            }
            else {
                charactersRef.doc(characterId)
                    .update({
                        name: form.name,
                        location: form.location,
                        occupation: form.occupation,
                        skin: form.skin
                    })
                    .then(() => {
                        setSnack({ open: true, severity: "success", text: "Postać została zedytowana!" });
                    })
                    .catch(error => {
                        setSnack({ open: true, severity: "error", text: `Błąd: ${error}` });
                    });
            }
            handleClose();
        }
        else {
            setSnack({ open: true, severity: "error", text: `Pola nazwa i lokalizacja muszą być wypełnione!` });
            setFormError({
                name: form.name == "" ? true : false,
                location: form.location == "" ? true : false,
            });
        }
    }

    const charactersRef = props.db.collection('characters');
    const query = charactersRef.orderBy('name');
    const [characters] = useCollectionData(query, { idField: 'id' })

    useEffect(() => {
        characters && characters.forEach(char => {
            char.quests = [];
            props.db.collection('characters').doc(char.id).collection('quests').get()
                .then(response => {
                    response.forEach(document => {
                        const quest = {
                            id: document.id,
                            ...document.data()
                        };
                        char.quests.push(quest);
                    });
                })
                .catch(error => {
                    setSnack({ open: true, severity: "error", text: `Błąd: ${error}` });
                });
        });
    }, [characters])


    useEffect(() => {
        if (characters && characterId != "" && edit) {
            const character = characters.find(character => character.id === characterId);
            setForm({ name: character.name, location: character.location, occupation: character.occupation, skin: character.skin });
        }
    }, [characterId]);

    return (
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead style={{ backgroundColor: '#000' }}>
                        <TableRow>
                            <TableCell />
                            <TableCell>Nazwa</TableCell>
                            <TableCell>Zajęcie</TableCell>
                            <TableCell>Lokalizacja</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {characters && characters.map(row => (
                            <Row key={row.id} row={row} handleClickOpen={handleClickOpen} handleClickOpenEditor={handleClickOpenEditor} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Fab color="secondary" aria-label="add" style={{ position: 'fixed', top: '90%', left: '85%' }} onClick={() => handleClickOpen(false)}>
                <AddIcon />
            </Fab>

            <Dialog open={open} onClose={handleClose} aria-labelledby="character-creator">
                <DialogTitle id="form-dialog-title">Kreator postaci</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ten jakże zaawansowany kreator postaci pozwala na {edit ? 'edycję' : 'dodanie'} zleceniodawcy, który będzie dostępny na serwerze ZajvaCraft.
                        </DialogContentText>
                    <TextField
                        required
                        error={formError.name}
                        variant="outlined"
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Nazwa"
                        fullWidth
                        value={form.name}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        error={formError.location}
                        variant="outlined"
                        margin="dense"
                        name="location"
                        label="Lokalizacja"
                        fullWidth
                        value={form.location}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="dense"
                        name="occupation"
                        label="Zajęcie"
                        fullWidth
                        value={form.occupation}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="dense"
                        name="skin"
                        label="Skin URL"
                        fullWidth
                        value={form.skin}
                        onChange={handleChange}
                    />

                </DialogContent>
                <DialogActions>
                    {edit && <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={handleClickOpenConfirmation}
                    >
                        Usuń
                        </Button>}
                    <Button onClick={handleClose} color="primary">
                        Anuluj
                        </Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        {edit ? 'Edytuj' : 'Utwórz'}
                    </Button>
                </DialogActions>
            </Dialog>

            <QuestEditor open={openEditor} handleClose={handleCloseEditor} characters={characters} characterId={characterId} questId={questId} db={props.db} />

            <Confirmation
                actionText="Usuń"
                actionClick={deleteCharacter}
                openConfirmation={openConfirmation}
                handleCloseConfirmation={handleCloseConfirmation}
                text="Czy na pewno chcesz usunąć tę postać? Operacji nie będzie można już cofnąć."
            />

            <Snackbar open={snack.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snack.severity}>{snack.text}</Alert>
            </Snackbar>
        </div>
    );
}