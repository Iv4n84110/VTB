import React, {useState} from 'react';

import Aux from '../../hoc/Auxiliary'

import Header from '../Header';
import Footer from '../Footer';

import classes from './styles.css';

const PageLayout = (props) => {


    return (
        <Aux>
            <div className={classes.Content}>
                <Header 
                    auth={props.auth}                
                    modalHandler={props.modalHandler} 
                    redirectToMain={props.redirectToMain} 
                    redirectToStat={props.redirectToStat} 
                />
                {props.children}
                <Footer/>
            </div>
        </Aux>
    );
}

export default PageLayout;