import React, { useState, useEffect } from 'react'

import { version } from '../../package.json'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
    card: {
        minWidth: 275,
        height: 175,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    grid: {
        padding: theme.spacing(4),
    },
}));

export default function Dashboard(props) {
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const usersRef = props.db.collection('users').doc(props.user.uid);
    const [user] = useDocumentDataOnce(usersRef, { idField: 'id' });

    function handleClick() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
                className={classes.grid}
                spacing={4}
            >
                <Grid item xs={6}>
                    <Card className={classes.card} variant="outlined">
                        <CardContent>
                            <Typography variant="h4" component="h2">
                                Witaj, {props.user.displayName}!
                    </Typography>
                            <Typography variant="body2" component="p">
                                Twoje ranga to: {user && user.rank}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={3}>
                    <Card className={classes.card} variant="outlined">
                        <CardContent>
                            <Typography variant="h4" component="h2">
                                Aktualizacje
                    </Typography>
                            <Typography variant="body2" component="p">
                                Aktualna wersja narzędzi deweloperskich to {version}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={handleClick}>Zobacz listę zmian</Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={3}>
                    <Card className={classes.card} variant="outlined">
                        <CardContent>
                            <Typography variant="h4" component="h2">
                                Błąd?
                    </Typography>
                            <Typography variant="body2" component="p">
                                Zgłoś go w wiadomości prywatnej!
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card className={classes.card} variant="outlined">
                        <CardContent>
                            <Typography variant="h4" component="h2">
                                wygląd się nie liczy
                        </Typography>
                            <Typography variant="body2" component="p">
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning">Ta funkcja jest jeszcze w trakcie przygotowywania!</Alert>
            </Snackbar>
        </>
    )
}