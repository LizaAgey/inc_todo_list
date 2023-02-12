import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppWithRedux from './AppWithRedux';


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <AppWithRedux/>
);

