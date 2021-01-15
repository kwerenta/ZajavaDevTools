import React, { useEffect, useState } from "react";
import QuestEditor from "../components/QuestEditor";
import Confirmation from "../components/Confirmation";
import Snackalert from "../components/Snackalert";

import { db } from "../firebaseApp";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import CircularProgress from "@material-ui/core/CircularProgress";
import Collapse from "@material-ui/core/Collapse";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import DoneIcon from "@material-ui/icons/Done";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import MessageIcon from "@material-ui/icons/Message";

const useRowStyles = makeStyles({
    root: {
        "& > *": {
            borderBottom: "unset",
        },
    },
    cell: {
        paddingBottom: 0,
        paddingTop: 0,
    },
});

const Row = props => {
    const { row } = props;

    const [open, setOpen] = useState(false);

    const classes = useRowStyles();
    const statusChips = [
        { label: "W trakcie pisania", color: "#00695c", icon: <MessageIcon /> },
        { label: "Ukończono", color: "#2e7d32", icon: <DoneIcon /> },
        {
            label: "Przeniesiono do gry",
            color: "#33691e",
            icon: <DoneAllIcon />,
        },
    ];

    useEffect(() => {
        setOpen(false);
    }, [props.update]);

    return (
        <>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => {
                            setOpen(!open);
                        }}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.occupation}</TableCell>
                <TableCell>
                    <IconButton
                        aria-label="open-character-editor"
                        size="small"
                        onClick={() => {
                            props.handleClickOpen(true, false, row.id);
                        }}
                    >
                        <EditIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className={classes.cell} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Zadania
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nazwa</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.quests &&
                                        row.quests.map(quest => (
                                            <TableRow key={quest.name}>
                                                <TableCell>{quest.name}</TableCell>
                                                <TableCell>
                                                    {!isNaN(quest.status) && (
                                                        <Chip
                                                            style={{
                                                                backgroundColor: statusChips[quest.status].color,
                                                            }}
                                                            icon={statusChips[quest.status].icon}
                                                            label={statusChips[quest.status].label}
                                                        />
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        aria-label="open quest editor"
                                                        size="small"
                                                        onClick={() => {
                                                            props.handleClickOpenEditor(row.id, quest.id);
                                                        }}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    <TableRow key={`DodajQuesta${row.id}`}>
                                        <TableCell>Utwórz zadanie</TableCell>
                                        <TableCell />
                                        <TableCell>
                                            <IconButton
                                                aria-label="add quest"
                                                size="small"
                                                onClick={() => {
                                                    props.handleClickOpen(false, true, row.id);
                                                }}
                                            >
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
        </>
    );
};

const useStyles = makeStyles(theme => ({
    addButton: {
        position: "fixed",
        top: "90%",
        left: "85%",
    },
    head: {
        backgroundColor: theme.palette.background.default,
    },
}));

const Characters = props => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [openConfirmation, setOpenConfirmation] = useState(false);

    const [update, setUpdate] = useState(false);
    const [edit, setEdit] = useState(false);
    const [quest, setQuest] = useState(false);
    const [form, setForm] = useState({
        name: "",
        location: "",
        skin: "",
        occupation: "",
    });
    const [formError, setFormError] = useState({
        name: false,
        location: false,
    });
    const [characterId, setCharacterId] = useState("");
    const [questId, setQuestId] = useState("");
    const [snack, setSnack] = useState({
        open: false,
        severity: "success",
        text: "Postać została utworzona!",
    });
    const [openEditor, setOpenEditor] = useState(false);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (["name", "location"].includes(e.target.name)) {
            e.target.value == ""
                ? setFormError({ ...formError, [e.target.name]: true })
                : setFormError({ ...formError, [e.target.name]: false });
        }
    };

    const handleClickOpen = (edit, quest, id) => {
        setOpen(true);
        setEdit(edit);
        setQuest(quest);
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
    };
    const handleCloseEditor = () => {
        setOpenEditor(false);
        setUpdate(!update);
    };

    const handleClickOpenConfirmation = () => {
        setOpenConfirmation(true);
    };
    const handleCloseConfirmation = () => {
        setOpenConfirmation(false);
    };

    const handleCloseSnackbar = () => {
        setSnack({ ...snack, open: false });
    };
    const deleteCharacter = () => {
        handleCloseConfirmation();
        handleClose();
        db.collection("characters")
            .doc(characterId)
            .delete()
            .then(() => {
                setSnack({
                    open: true,
                    severity: "success",
                    text: "Postać została usunięta!",
                });
                setCharacterId("");
            })
            .catch(error => {
                setSnack({
                    open: true,
                    severity: "error",
                    text: `Błąd: ${error}`,
                });
            });
    };
    const addQuest = async () => {
        if (form.name) {
            await db
                .collection("characters")
                .doc(characterId)
                .collection("quests")
                .add({
                    name: form.name,
                    status: 0,
                })
                .then(() => {
                    setSnack({
                        open: true,
                        severity: "success",
                        text: "Dodano zadanie do wybranej postaci!",
                    });
                    setUpdate(!update);
                })
                .catch(error => {
                    setSnack({
                        open: true,
                        severity: "error",
                        text: `Błąd: ${error}`,
                    });
                });
            handleClose();
        } else {
            setSnack({
                open: true,
                severity: "error",
                text: `Pola nazwa musi być wypełnione!`,
            });
            setFormError({
                name: form.name == "" ? true : false,
            });
        }
    };

    const handleSubmit = async () => {
        if (form.name && form.location) {
            if (!edit) {
                await charactersRef
                    .add({
                        name: form.name,
                        location: form.location,
                        occupation: form.occupation,
                        skin: form.skin,
                        createdBy: props.user.uid,
                    })
                    .then(() => {
                        setSnack({
                            open: true,
                            severity: "success",
                            text: "Postać została utworzona!",
                        });
                    })
                    .catch(error => {
                        setSnack({
                            open: true,
                            severity: "error",
                            text: `Błąd: ${error}`,
                        });
                    });
            } else {
                charactersRef
                    .doc(characterId)
                    .update({
                        name: form.name,
                        location: form.location,
                        occupation: form.occupation,
                        skin: form.skin,
                    })
                    .then(() => {
                        setSnack({
                            open: true,
                            severity: "success",
                            text: "Postać została zedytowana!",
                        });
                    })
                    .catch(error => {
                        setSnack({
                            open: true,
                            severity: "error",
                            text: `Błąd: ${error}`,
                        });
                    });
            }
            handleClose();
        } else {
            setSnack({
                open: true,
                severity: "error",
                text: `Pola nazwa i lokalizacja muszą być wypełnione!`,
            });
            setFormError({
                name: form.name == "" ? true : false,
                location: form.location == "" ? true : false,
            });
        }
    };

    const charactersRef = db.collection("characters");
    const query = charactersRef.orderBy("name");
    const [characters, loading] = useCollectionData(query, { idField: "id" });

    useEffect(() => {
        characters &&
            characters.forEach(char => {
                char.quests = [];
                db.collection("characters")
                    .doc(char.id)
                    .collection("quests")
                    .get()
                    .then(response => {
                        response.forEach(document => {
                            const quest = {
                                id: document.id,
                                ...document.data(),
                            };
                            char.quests.push(quest);
                        });
                    })
                    .catch(error => {
                        setSnack({
                            open: true,
                            severity: "error",
                            text: `Błąd: ${error}`,
                        });
                    });
            });
    }, [characters, update]);

    useEffect(() => {
        if (characters && characterId != "" && edit) {
            const character = characters.find(character => character.id === characterId);
            setForm({
                name: character.name,
                location: character.location,
                occupation: character.occupation,
                skin: character.skin,
            });
        }
    }, [characterId]);

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead className={classes.head}>
                        <TableRow>
                            <TableCell />
                            <TableCell>Nazwa</TableCell>
                            <TableCell>Lokalizacja</TableCell>
                            <TableCell>Zajęcie</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {characters &&
                            characters.map(row => (
                                <Row
                                    key={row.id}
                                    row={row}
                                    handleClickOpen={handleClickOpen}
                                    handleClickOpenEditor={handleClickOpenEditor}
                                    update={update}
                                />
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Fab
                className={classes.addButton}
                color="secondary"
                aria-label="add"
                onClick={() => handleClickOpen(false)}
            >
                <AddIcon />
            </Fab>

            <Dialog open={open} onClose={handleClose} aria-labelledby="character-creator">
                <DialogTitle id="form-dialog-title">{quest ? "Kreator zadań" : "Kreator postaci"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {quest
                            ? `Napisz nazwę zadania, które zlecać będzie wybrana przez Ciebie postać`
                            : `Ten jakże zaawansowany kreator postaci pozwala na ${
                                  edit ? "edycję" : "dodanie"
                              } zleceniodawcy, który będzie dostępny na serwerze ZajvaCraft.`}
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
                    {!quest && (
                        <>
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
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    {edit && (
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<DeleteIcon />}
                            onClick={handleClickOpenConfirmation}
                        >
                            Usuń
                        </Button>
                    )}
                    <Button onClick={handleClose} color="primary">
                        Anuluj
                    </Button>
                    <Button onClick={quest ? addQuest : handleSubmit} variant="contained" color="primary">
                        {edit ? "Edytuj" : "Utwórz"}
                    </Button>
                </DialogActions>
            </Dialog>

            <QuestEditor
                open={openEditor}
                handleClose={handleCloseEditor}
                characters={characters}
                characterId={characterId}
                questId={questId}
            />

            <Confirmation
                actionText="Usuń"
                actionClick={deleteCharacter}
                openConfirmation={openConfirmation}
                handleCloseConfirmation={handleCloseConfirmation}
                text="Czy na pewno chcesz usunąć tę postać? Operacji nie będzie można już cofnąć."
            />

            <Snackalert snack={snack} handleClose={handleCloseSnackbar} />

            <Backdrop open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
};

export default Characters;
