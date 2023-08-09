import React, { useState } from 'react';
import { BrowserRouter} from "react-router-dom";
import { useEffect } from 'react';
import { Authorize }from './Components/Authorize.js';
import ApplicationViews from './Components/ApplicationViews.js';
import Header from './Components/Header.js';

export const App =()  => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);


    useEffect(() => {
        if (!localStorage.getItem("userProfile")) {
            setIsLoggedIn(false)

        }
    }, [isLoggedIn])

    return (
        <BrowserRouter >
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            {isLoggedIn ?
                <ApplicationViews />
                :
                <Authorize setIsLoggedIn={setIsLoggedIn} />
            }
        </BrowserRouter >
    );
}


