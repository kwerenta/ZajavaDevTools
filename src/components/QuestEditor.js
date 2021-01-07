import React from 'react'
import Dialogues from './Dialogues'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function QuestEditor(props) {
    const classes = useStyles();
    const character = props.characters && props.characters.find(character => character.id === props.characterId);
    const quest = character && character.quests.find(quest => quest.id === props.questId);

    return (
        <div>
            <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Edytor zadań
                        </Typography>
                        <Button autoFocus color="inherit" onClick={props.handleClose}>
                            Zapisz
            </Button>
                    </Toolbar>
                </AppBar>

                <Dialogues character={character} quest={quest} db={props.db} />

            </Dialog>
        </div>
    );
}