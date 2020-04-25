import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './one-thing-list.reducer';
import { IOneThingList } from 'app/shared/model/one-thing-list.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOneThingListProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const OneThingList = (props: IOneThingListProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { oneThingListList, match, loading } = props;
  return (
    <div>
      <h2 id="one-thing-list-heading">
        One Thing Lists
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new One Thing List
        </Link>
      </h2>
      <div className="table-responsive">
        {oneThingListList && oneThingListList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>My Text</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {oneThingListList.map((oneThingList, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${oneThingList.id}`} color="link" size="sm">
                      {oneThingList.id}
                    </Button>
                  </td>
                  <td>{oneThingList.myText}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${oneThingList.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${oneThingList.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${oneThingList.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No One Thing Lists found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ oneThingList }: IRootState) => ({
  oneThingListList: oneThingList.entities,
  loading: oneThingList.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OneThingList);
