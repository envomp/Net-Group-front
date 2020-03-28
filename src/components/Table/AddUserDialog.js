import React, {useState} from 'react'

import AddIcon from '@material-ui/icons/Add'
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
import {postPerson} from "../../utils/API";

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

const initialUser = {
    name: '',
    gender: '',
    countryCode: '',
    idCode: '',
    age: 0,
    deathDate: '',
    birthDate: '',
    subRows: undefined,
};

const AddUserDialog = props => {
    const [user, setUser] = useState(initialUser);
    const {addUserHandler} = props;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = event => {

        postPerson(user).then(x => {
            if (x.code < 300) {
                addUserHandler(user);
                setUser(initialUser);
            } else {
                toast.error(x.message);
            }

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
            <Tooltip title="Add">
                <IconButton aria-label="add" onClick={handleClickOpen}>
                    <AddIcon/>
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <ToastContainer autoClose={2000}/>
                <DialogTitle id="form-dialog-title">Add User</DialogTitle>
                <DialogContent>
                    <DialogContentText>Add user to database</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        value={user.name}
                        helperText={errors.name ? "Incorrect format. Actual names with capital letters" : ""}
                        onChange={handleChange('name')}
                    />
                    <TextField
                        margin="dense"
                        label="Gender (MALE, FEMALE or UNDISCLOSED)"
                        type="text"
                        fullWidth
                        value={user.gender}
                        helperText={errors.gender ? "Please choose one of the given genders" : ""}
                        onChange={handleChange('gender')}
                    />
                    <TextField
                        margin="dense"
                        label="Country Code"
                        type="text"
                        fullWidth
                        value={user.countryCode}
                        helperText={errors.countryCode ? "3 capital letters" : ""}
                        onChange={handleChange('countryCode')}
                    />
                    <TextField
                        margin="dense"
                        label="ID Code"
                        type="text"
                        fullWidth
                        value={user.idCode}
                        helperText={errors.idCode ? "8 to 20 characters" : ""}
                        onChange={handleChange('idCode')}
                    />
                    <TextField
                        margin="dense"
                        label="Birth date (YYYY-MM-DD) or epoch time - optional"
                        type="text"
                        fullWidth
                        value={user.birthDate}
                        helperText={errors.birthDate ? "Incorrect format" : ""}
                        onChange={handleChange('birthDate')}
                    />
                    <TextField
                        margin="dense"
                        label="Death date (YYYY-MM-DD) or epoch time - optional"
                        type="text"
                        fullWidth
                        value={user.deathDate}
                        helperText={errors.deathDate ? "Incorrect format" : ""}
                        onChange={handleChange('deathDate')}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAdd} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};


export default AddUserDialog
