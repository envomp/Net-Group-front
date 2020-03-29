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
import React, {useEffect, useState} from 'react';
import {getPerson} from "../../utils/API";
import {mapPersonToConnections} from "../../utils/Mapper";
import {Graph} from 'react-d3-graph';


// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used
const myConfig = {
    "automaticRearrangeAfterDropNode": false,
    "collapsible": false,
    "directed": false,
    "focusAnimationDuration": 0.75,
    "focusZoom": 1,
    "height": 400,
    "highlightDegree": 1,
    "highlightOpacity": 1,
    "linkHighlightBehavior": false,
    "maxZoom": 8,
    "minZoom": 0.1,
    "nodeHighlightBehavior": false,
    "panAndZoom": false,
    "staticGraph": false,
    "staticGraphWithDragAndDrop": false,
    "width": 800,
    "d3": {
        "alphaTarget": 0.05,
        "gravity": -100,
        "linkLength": 100,
        "linkStrength": 1,
        "disableLinkForce": false
    },
    "node": {
        "color": "#d3d3d3",
        "fontColor": "black",
        "fontSize": 8,
        "fontWeight": "normal",
        "highlightColor": "SAME",
        "highlightFontSize": 8,
        "highlightFontWeight": "normal",
        "highlightStrokeColor": "SAME",
        "highlightStrokeWidth": "SAME",
        "labelProperty": "id",
        "mouseCursor": "pointer",
        "opacity": 1,
        "renderLabel": true,
        "size": 200,
        "strokeColor": "none",
        "strokeWidth": 1.5,
        "svg": "",
        "symbolType": "circle"
    },
    "link": {
        "color": "#d3d3d3",
        "fontColor": "black",
        "fontSize": 8,
        "fontWeight": "normal",
        "highlightColor": "SAME",
        "highlightFontSize": 8,
        "highlightFontWeight": "normal",
        "labelProperty": "label",
        "mouseCursor": "pointer",
        "opacity": 1,
        "renderLabel": false,
        "semanticStrokeWidth": false,
        "strokeWidth": 1.5,
        "markerHeight": 6,
        "markerWidth": 6
    }
};

// graph event callbacks
const onClickNode = function (nodeId) {
    // window.alert('Clicked node ${nodeId}');
};

const onMouseOverNode = function (nodeId) {
    // window.alert(`Mouse over node ${nodeId}`);
};

const onMouseOutNode = function (nodeId) {
    // window.alert(`Mouse out node ${nodeId}`);
};

const onClickLink = function (source, target) {
    // window.alert(`Clicked link between ${source} and ${target}`);
};

const onMouseOverLink = function (source, target) {
    // window.alert(`Mouse over in link between ${source} and ${target}`);
};

const onMouseOutLink = function (source, target) {
    // window.alert(`Mouse out link between ${source} and ${target}`);
};

const CreateTreeDialog = ({user}) => {
    const [open, setOpen] = React.useState(false);
    const [done, setDone] = React.useState(false);
    const [fullPerson, setFullPerson] = useState({
        nodes: [{id: "Something went wrong.."}],
        links: []
    });

    useEffect(() => {
        async function fetchData() {
            if (!done) {
                setFullPerson(mapPersonToConnections(await getPerson(user.countryCode, user.idCode)));
                setDone(true);
            }
        }

        if (open) {
            fetchData();
        }

    }, [open, user.countryCode, user.idCode, fullPerson]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
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
                    <Graph
                        id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                        data={fullPerson}
                        config={myConfig}
                        onClickNode={onClickNode}
                        onClickLink={onClickLink}
                        onMouseOverNode={onMouseOverNode}
                        onMouseOutNode={onMouseOutNode}
                        onMouseOverLink={onMouseOverLink}
                        onMouseOutLink={onMouseOutLink}
                    />
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
