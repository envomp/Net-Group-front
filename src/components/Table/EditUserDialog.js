import React, {useState} from 'react'

import CreateIcon from '@material-ui/icons/Create'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import {toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {putPerson} from "../../utils/API";
import Datetime from "react-datetime";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";

const initialUser = {
    name: '',
    gender: '',
    countryCode: '',
    idCode: '',
    deathDate: '',
    birthDate: '',
    parents: null,
    children: null,
    subRows: undefined,
    old_country: undefined,
    old_id: undefined
};

const regexes = {
    name: new RegExp("^[A-Z][-A-z]+( [A-Z][-A-z]+)+$"),
    gender: new RegExp("^(UNDISCLOSED|MALE|FEMALE)$"),
    countryCode: new RegExp("\"^[A-Z]{3}$\""),
    idCode: new RegExp("^[0-9]{8,20}$"),
    deathDate: new RegExp("^([0-9]{4}-[0-9]{2}-[0-9]{2})$"),
    birthDate: new RegExp("^([0-9]{4}-[0-9]{2}-[0-9]{2})$"),
};

const errors = {
    name: false,
    gender: false,
    countryCode: false,
    idCode: false,
    deathDate: false,
    birthDate: false,
};

const EditUserDialog = ({refreshData, existing, stash1, stash2}) => {
    const [user, setUser] = useState(initialUser);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        user.old_country = existing.countryCode;
        user.old_id = existing.idCode;
        user.idCode = existing.idCode;
        user.countryCode = existing.countryCode;
        user.gender = existing.gender;
        user.birthDate = existing.birthDate;
        user.deathDate = existing.deathDate;
        user.name = existing.name;
        user.children = existing.children;
        user.parents = existing.parents;
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        refreshData();
    };

    const handleAdd = event => {

        putPerson(user.old_country, user.old_id, user).then(x => {
            setUser(initialUser);
            setOpen(false);
            refreshData();
        }).catch(x => {
            toast.error(x.message);
        });
    };

    const handleChange = name => ({target: {value}}) => {
        setUser({...user, [name]: value});
        errors[name] = !regexes[name].test({...user, [name]: value}[name]);
    };

    return (
        <div>
            <Tooltip title="Edit">
                <IconButton aria-label="add" onClick={handleClickOpen}>
                    <CreateIcon/>
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                fullWidth={true}
            >
                <ToastContainer autoClose={2000}/>
                <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
                <DialogContent>
                    <DialogContentText>Alter user in database</DialogContentText>
                    <List>

                        <ListItem>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Name"
                                type="text"
                                fullWidth
                                value={user.name}
                                helperText={errors.name ? "Incorrect format. Actual names with capital letters" : ""}
                                onChange={handleChange('name')}
                            /></ListItem>

                        <ListItem>
                            <InputLabel>
                                Birth Date
                            </InputLabel>
                            <FormControl fullWidth>
                                <Datetime
                                    value={user.birthDate}
                                    inputProps={{placeholder: "Birth date - optional"}}
                                />
                            </FormControl>
                        </ListItem>

                        <ListItem>
                            <InputLabel>
                                Death Date
                            </InputLabel>
                            <FormControl fullWidth>
                                <Datetime
                                    value={user.deathDate}
                                    inputProps={{placeholder: "Death date - optional"}}
                                />
                            </FormControl>
                        </ListItem>

                        <ListItem>
                            <CustomDropdown
                                buttonText="Gender"
                                dropdownHeader="Gender"
                                buttonProps={{
                                    color: "transparent"
                                }}
                                onClick={(x) => user.gender = x}
                                dropdownList={[
                                    "MALE",
                                    "FEMALE",
                                    "UNDISCLOSED",
                                ]}
                            /></ListItem>

                        <ListItem>
                            <TextField
                                margin="dense"
                                label="Country Code"
                                type="text"
                                fullWidth
                                value={user.countryCode}
                                helperText={errors.countryCode ? "3 capital letters" : ""}
                                onChange={handleChange('countryCode')}
                            /></ListItem>

                        <ListItem>
                            <TextField
                                margin="dense"
                                label="ID Code"
                                type="text"
                                fullWidth
                                value={user.idCode}
                                helperText={errors.idCode ? "8 to 20 characters" : ""}
                                onChange={handleChange('idCode')}
                            />
                        </ListItem>

                        <Button onClick={() => {
                            user.parents = stash1
                        }} color="primary">
                            Set parents from parents slot
                        </Button>

                        <Button onClick={() => {
                            user.children = stash2
                        }} color="primary">
                            Set children from child's slot
                        </Button>

                    </List>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="danger">
                        Cancel
                    </Button>
                    <Button onClick={handleAdd} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};


export default EditUserDialog
