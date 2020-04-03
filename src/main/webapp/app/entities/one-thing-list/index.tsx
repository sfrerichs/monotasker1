import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import OneThingList from './one-thing-list';
import OneThingListDetail from './one-thing-list-detail';
import OneThingListUpdate from './one-thing-list-update';
import OneThingListDeleteDialog from './one-thing-list-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={OneThingListDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={OneThingListUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={OneThingListUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={OneThingListDetail} />
      <ErrorBoundaryRoute path={match.url} component={OneThingList} />
    </Switch>
  </>
);

export default Routes;
