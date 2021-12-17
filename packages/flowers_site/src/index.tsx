import React, { Suspense} from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from "recoil";
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <Suspense fallback={<div>Loading</div>}>
          <App />
        </Suspense>   
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
