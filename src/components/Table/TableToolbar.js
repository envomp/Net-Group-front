import React, {useState} from 'react'

import AddUserDialog from './AddUserDialog'
import EditUserDialog from './EditUserDialog'
import clsx from 'clsx'
import DeleteIcon from '@material-ui/icons/Delete'
import Young from '@material-ui/icons/PermIdentity'
import SaveIcon1 from '@material-ui/icons/SupervisorAccount'
import SaveIcon2 from '@material-ui/icons/HowToReg'
import GlobalFilter from './GlobalFilter'
import IconButton from '@material-ui/core/IconButton'
import {lighten, makeStyles} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import CreateGraphDialog from "./CreateGraphDialog";
import CreateTreeDialog from "./CreateTreeDialog";
import {toast} from "react-toastify";
import {getYoungestUncleThingy} from "../../utils/API";

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const TableToolbar = props => {
    const classes = useToolbarStyles();
    const {
        data,
        selected,
        numSelected,
        addUserHandler,
        deleteUserHandler,
        refreshData,
        preGlobalFilteredRows,
        setGlobalFilter,
        globalFilter,
    } = props;
    const [stash1, setStash1] = useState([]);
    const [stash2, setStash2] = useState([]);

    const saveUserHandler1 = () => {
        setStash1(selected.map(x => data[x]));
    };

    const saveUserHandler2 = () => {
        setStash2(selected.map(x => data[x]));
    };

    const displayYoungestUncle = () => {
        (async () => {
            await getYoungestUncleThingy().then(x => {
                toast.info("Youngest uncle or aunt is " + x.name + " with age " + x.age)
            });
        })();
    };

    return (

        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >

            <AddUserDialog refreshData={refreshData} stash1={stash1} stash2={stash2} addUserHandler={addUserHandler}/>
            {numSelected > 0 ? (
                <Typography
                    className={classes.title}
                    color="inherit"
                    variant="subtitle1"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle">
                    Users
                </Typography>
            )}

            <Typography className={classes.title} id="stash1">
                Parent slot: {JSON.stringify(stash1.map(x => x.name))}
            </Typography>

            <Typography className={classes.title} id="stash2">
                Children slot: {JSON.stringify(stash2.map(x => x.name))}
            </Typography>

            <Tooltip title="Display youngest uncle/aunt">
                <IconButton aria-label="uncle/aunt" onClick={displayYoungestUncle}>
                    <Young/>
                </IconButton>
            </Tooltip>

            <Tooltip title="Save selected people to parent slot">
                <IconButton aria-label="parents" onClick={saveUserHandler1}>
                    <SaveIcon1/>
                </IconButton>
            </Tooltip>


            <Tooltip title="Save selected people to children slot">
                <IconButton aria-label="children" onClick={saveUserHandler2}>
                    <SaveIcon2/>
                </IconButton>
            </Tooltip>


            {numSelected === 1 ? (<CreateTreeDialog user={data[selected[0]]}/>) : null}

            {numSelected === 1 ? (<CreateGraphDialog user={data[selected[0]]}/>) : null}

            {numSelected === 1 ? (
                <EditUserDialog refreshData={refreshData} stash1={stash1} stash2={stash2}
                                existing={data[selected[0]]}/>) : null}

            {numSelected > 0 ? (

                <Tooltip title="Delete">
                    <IconButton aria-label="delete" onClick={deleteUserHandler}>
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>


            ) : (
                <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
            )}
        </Toolbar>
    )
};

export default TableToolbar
