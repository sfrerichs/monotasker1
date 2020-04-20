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
      <div id="master-view">
        <h2 id="one-thing-list-heading">
          One Thing List
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new One Thing List
          </Link>
        </h2>
        <div className="table-responsive table-info">
          {oneThingListList && oneThingListList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>My Text</th>
                  <th>Things List</th>
                </tr>
              </thead>
              <tbody>
                {oneThingListList.map((oneThingList, i) => (
                  <tr key={'entity-&{i}'}>
                    <td>{oneThingList.id}</td>
                    <td>{oneThingList.myText}</td>
                    <td>{oneThingList.thingsList}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            !loading && <div className="alert alert-warning">No oneThingList found</div>
          )}
        </div>
      </div>

      <div id="my-stuff">
        {oneThingListList && oneThingListList.length > 0 ? (
          <div>
            {oneThingListList.map((oneThingList, i) => (
              <div key={`entity-${i}`}>
                <span className="text-danger">TODO: this area needs to display info from selected thingsList</span>
                <Row>
                  <Col sm="8">
                    <div className="jumbotron">
                      <h1 className="display-3">THE ONE THING</h1>
                    </div>
                  </Col>
                  <Col sm="4">
                    <div className="card border-warning mb-3">
                      <div className="card-header">Working on List:</div>
                      <div className="card-body">
                        <h4 className="card-title">List Time</h4>
                        <p className="card-text">Date and Description</p>
                      </div>
                    </div>
                    <button type="button" className="btn btn-primary">Mark Complete</button>
                    <button type="button" className="btn btn-light">Next</button>
                   </Col>
                </Row>
                <Row>
                  <Col md="10">
                    <div >
                      <button type="button" className="btn btn-primary"></button>
                      <button type="button" className="btn btn-light"></button>
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </div>
        ) : (
          !loading && <div className="alert alert-warning">No oneThingList found</div>
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
