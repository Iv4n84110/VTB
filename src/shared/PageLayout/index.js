import React from 'react';

import Aux from '../../hoc/Auxiliary'

import Header from '../Header';
import Footer from '../Footer';

import classes from './styles.css';


const PageLayout = (props) => {
    return (
        <Aux>
            <Header isLogined={props.isLogined}/>
            <div className={classes.content}>
                {props.children}
            </div>
            <Footer/>
        </Aux>
    );
}

export default PageLayout;