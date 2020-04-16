import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Thing from './thing';
import ThingsList from './things-list';
import OneThingList from './one-thing-list';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}thing`} component={Thing} />
      <ErrorBoundaryRoute path={`${match.url}things-list`} component={ThingsList} />
      <ErrorBoundaryRoute path={`${match.url}one-thing-list`} component={OneThingList} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
