import React from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import FocusIcon from "@material-ui/icons/GpsFixed";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";


const CreateTreeDialog = props => {
    const [open, setOpen] = React.useState(false);
    const {user} = props;
    const data = {};

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        console.log(user);
        setOpen(false);
    };

    return (
        <div>
            <Tooltip title="Add">
                <IconButton aria-label="add" onClick={handleClickOpen}>
                    <FocusIcon/>
                </IconButton>
            </Tooltip>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <ToastContainer autoClose={2000}/>
                <DialogTitle id="form-dialog-title">Display tree</DialogTitle>
                <DialogContent>



                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default CreateTreeDialog
