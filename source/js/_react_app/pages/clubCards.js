import React from 'react';

import ClubCards from "../views/clubCards/ClubCards";

import globalAppStore from "./utils/globalAppStore";
import renderPage from "./utils/renderPage";


renderPage(
    <ClubCards/>,
    'root-club-registration',
    {
        appStore: globalAppStore,
    }
);