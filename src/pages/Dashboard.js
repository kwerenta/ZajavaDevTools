import React, { useState, useContext } from "react";
import Snackalert from "../components/Snackalert";
import Changelog from "../components/Changelog";

import { UserContext } from "../User";
import { version } from "../../package.json";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    card: {
        minWidth: 275,
        height: 175,
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
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

const Dashboard = () => {
    const classes = useStyles();

    const { currentUser, userData } = useContext(UserContext);

    const [open, setOpen] = useState(false);
    const [openChangelog, setOpenChangelog] = useState(false);

    const handleOpenChangelog = () => {
        setOpenChangelog(true);
    };
    const handleCloseChangelog = () => {
        setOpenChangelog(false);
    };
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                <Grid item xs={12} md={6}>
                    <Card className={classes.card} variant="outlined">
                        <CardContent>
                            <Typography variant="h4" component="h2">
                                Witaj, {currentUser.displayName}!
                            </Typography>
                            <Typography variant="body2" component="p">
                                Twoje ranga to: {userData && userData.rank}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
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
                            <Button size="small" onClick={handleOpenChangelog}>
                                Zobacz listę zmian
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
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
                            <Typography variant="body2" component="p"></Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Changelog open={openChangelog} handleClose={handleCloseChangelog} />

            <Snackalert
                handleClose={handleClose}
                snack={{ open: open, text: "Ta funkcja jest jeszcze w trakcie przygotowywania!", severity: "warning" }}
            />
        </>
    );
};
export default Dashboard;
