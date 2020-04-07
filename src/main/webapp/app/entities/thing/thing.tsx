import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './thing.reducer';
import { IThing } from 'app/shared/model/thing.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IThingProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Thing = (props: IThingProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { thingList, match, loading } = props;
  return (
    <div>
      <h2 id="thing-heading">
        Things
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Thing
        </Link>
      </h2>
      <div className="table-responsive">
        {thingList && thingList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>

                <th>Description</th>

                <th>Things List</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {thingList.map((thing, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${thing.id}`} color="link" size="sm">
                      {thing.id}
                    </Button>
                  </td>

                  <td>{thing.description}</td>

                  <td>{thing.thingsList.listTime ? <Link to={`things-list/${thing.thingsList.id}`}>{thing.thingsList.listTime}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${thing.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${thing.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${thing.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Things found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ thing }: IRootState) => ({
  thingList: thing.entities,
  loading: thing.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Thing);
