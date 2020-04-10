import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './things-list.reducer';
import { IThingsList } from 'app/shared/model/things-list.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IThingsListProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ThingsList = (props: IThingsListProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { thingsListList, match, loading } = props;
  return (
    <div>
      <h2 id="things-list-heading">
        Things Lists
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Things List
        </Link>
      </h2>

      <div className="table-responsive">
        {thingsListList && thingsListList.length > 0 ? (
          <div className="container-fluid">
            <div className="row">

            {thingsListList.map((thingsList, i) => (
              <div className="card border-success" key={'entity-${i}'}>
                <p>{thingsList.date}</p>
                <h4 className="card-header">{thingsList.listTime}</h4>
                <p className="text-success">{thingsList.description}</p>
                <ul>
                  {thingsList.things.map((thing, j) => (
                    <li key={`entity-${j}`}>
                       {thing.description}
                    </li>
                  ))}
                </ul>
                  <Button tag={Link} to={`${match.url}/${thingsList.id}`} color="link" size="sm">
                    View/edit list info
                  </Button>
              </div>
            ))}

            </div>
          </div>
        ) : (
          !loading && <div className="alert alert-warning">No Things Lists found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ thingsList }: IRootState) => ({
  thingsListList: thingsList.entities,
  loading: thingsList.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ThingsList);
