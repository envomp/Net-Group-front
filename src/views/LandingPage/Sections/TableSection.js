import React from "react";

import {makeStyles} from "@material-ui/core/styles";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import CssBaseline from '@material-ui/core/CssBaseline'
import EnhancedTable from "components/Table/EnhancedTable";
import styles from "assets/jss/material-kit-react/views/landingPageSections/workStyle.js";
import {getPeople, putPerson} from "../../../utils/API";
import {toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles(styles);

export default function TableSection() {
    const classes = useStyles();
    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
                id: "0"
            },
            {
                Header: 'Gender',
                accessor: 'gender',
                id: "1"
            },
            {
                Header: 'Country code',
                accessor: 'countryCode',
                id: "2"
            },
            {
                Header: 'ID code',
                accessor: 'idCode',
                id: "3"
            },
            {
                Header: 'Birth date',
                accessor: 'birthDate',
                id: "4"
            },
            {
                Header: 'Death date',
                accessor: 'deathDate',
                id: "5"
            },
            {
                Header: 'Age',
                accessor: 'age',
                id: "6"
            },
            {
                Header: 'Ancestors',
                accessor: 'ancestors',
                id: "7"
            }
        ],
        []
    );
    const [data, setData] = React.useState([]);
    const [skipPageReset, setSkipPageReset] = React.useState(false);

    // Using useEffect to call the API once mounted and set the data
    React.useEffect(() => {
        refreshData();
    }, []);

    // We need to keep the table from resetting the pageIndex when we
    // Update data. So we can keep track of that flag with a ref.

    const refreshData = () => {
        (async () => {
            setData(await getPeople());
        })();
    };

    // When our cell renderer calls updateMyData, we'll use
    // the rowIndex, columnId and new value to update the
    // original data
    const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true);
        setData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    const old_country = row.countryCode;
                    const old_id = row.idCode;
                    row[columns[columnId].accessor] = value;
                    row.parents = null;
                    row.children = null;
                    putPerson(old_country, old_id, row).then({row}).catch(x => {
                        toast.error(x.response.data.message);
                        refreshData();
                        return row;
                    });
                }
                return row
            })
        )
    };

    return (
        <div className={classes.section}>
            <ToastContainer autoClose={2000} position={"bottom-right"}/>
            <GridContainer justify="center">
                <GridItem lg={12} cs={12} sm={12} md={12}>
                    <CssBaseline/>
                    <EnhancedTable
                        columns={columns}
                        data={data}
                        setData={setData}
                        updateMyData={updateMyData}
                        refreshData={refreshData}
                        skipPageReset={skipPageReset}
                    />
                </GridItem>
            </GridContainer>
        </div>
    );
}
