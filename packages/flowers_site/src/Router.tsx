import React, {FC} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Flower from './components/Flower';
import Flowers from './components/Flowers';

export const AppRoutes: FC = () => {
	return (
        <Switch>
            <Route exact path="/" component={Flowers} />
            <Route path="/:flower" component={Flower} />
            <Route path='*'>
                <Redirect to="/" />
            </Route>
        </Switch>
	);
};

