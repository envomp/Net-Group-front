import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";
import tableStyles from "assets/jss/material-kit-react/components/tableStyle.js";
// Sections for this page
import TableSection from "./Sections/TableSection.js";

// @material-ui/icons

const dashboardRoutes = [];

const useStyles = makeStyles(styles);
const useTableStyles = makeStyles(tableStyles);

export default function LandingPage(props) {
    const classes = useStyles();
    const tableClasses = useTableStyles();
    const {...rest} = props;
    return (
        <div>
            <Header
                color="transparent"
                routes={dashboardRoutes}
                brand="Family Tree"
                rightLinks={<HeaderLinks/>}
                fixed
                changeColorOnScroll={{
                    height: 400,
                    color: "white"
                }}
                {...rest}
            />
            <Parallax filter image={require("assets/img/landing-bg.jpg")}>
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <h1 className={classes.title}>Net-Group family tree</h1>
                            <h4>
                                Just select some fields and use table header to get started :)
                            </h4>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <div className={classNames(tableClasses.main, tableClasses.mainRaised)}>
                <div className={tableClasses.container}>
                    <TableSection/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
