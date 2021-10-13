import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/antd.css';
import './index.scss';

const elem = document.getElementById('root');
ReactDOM.render(
    <React.StrictMode>
        <App url={elem.dataset.url} />
    </React.StrictMode>,
    elem,
);
