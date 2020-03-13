import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ThingsList from './things-list';
import ThingsListDetail from './things-list-detail';
import ThingsListUpdate from './things-list-update';
import ThingsListDeleteDialog from './things-list-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ThingsListDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ThingsListUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ThingsListUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ThingsListDetail} />
      <ErrorBoundaryRoute path={match.url} component={ThingsList} />
    </Switch>
  </>
);

export default Routes;
