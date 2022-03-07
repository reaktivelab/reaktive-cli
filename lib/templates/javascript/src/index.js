import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap-grid.css';
import './app/style/main.scss';

const App = lazy(() => import(
    /* webpackChunkName: "App" */ '@component/App'
));

ReactDOM.render(
    <React.StrictMode>
        <Suspense fallback={ <div>Fetching the plans!</div> }>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Suspense>
    </React.StrictMode>,
    document.getElementById('root')
);