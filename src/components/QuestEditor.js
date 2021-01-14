import React, { useState } from "react";
import Dialogues from "./Dialogues";
import Confirmation from "./Confirmation";
import Snackalert from "./Snackalert";

import { db } from "../firebaseApp";

import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    appBar: {
        position: "relative",
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const QuestEditor = props => {
    const classes = useStyles();
    const character = props.characters && props.characters.find(character => character.id === props.characterId);
    const quest = character && character.quests && character.quests.find(quest => quest.id === props.questId);

    const [open, setOpen] = useState(false);
    const [snack, setSnack] = useState({ open: false, severity: "success", text: "" });

    const handleCloseConfirmation = () => {
        setOpen(false);
    };
    const handleCloseSnackbar = () => {
        setSnack({ ...snack, open: false });
    };

    const deleteQuest = () => {
        props.handleClose();
        handleCloseConfirmation();
        db.doc(`/characters/${props.characterId}/quests/${props.questId}`)
            .delete()
            .then(() => {
                setSnack({ open: true, severity: "success", text: "Zadanie zostało usunięte!" });
            })
            .catch(error => {
                setSnack({ open: true, severity: "error", text: `Błąd: ${error}` });
            });
    };

    return (
        <>
            <Dialog
                fullScreen
                disableEscapeKeyDown
                disableBackdropClick
                open={props.open}
                onClose={props.handleClose}
                TransitionComponent={Transition}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Edytor zadań
                        </Typography>
                        <Button color="secondary" disabled={quest && quest.status > 0} onClick={() => setOpen(true)}>
                            Usuń zadanie
                        </Button>
                    </Toolbar>
                </AppBar>
                <Dialogues character={character} quest={quest} />
            </Dialog>

            <Confirmation
                actionText="Usuń"
                actionClick={deleteQuest}
                openConfirmation={open}
                handleCloseConfirmation={handleCloseConfirmation}
                text={"Czy na pewno chcesz usunąć to zadanie? Operacji nie będzie można już cofnąć."}
            />

            <Snackalert snack={snack} handleClose={handleCloseSnackbar} />
        </>
    );
};
export default QuestEditor;
