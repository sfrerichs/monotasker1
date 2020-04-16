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
              <h4 className="card-title">ListTime</h4>
              <p className="card-text">Date and Description</p>
            </div>
          </div>
          <button type="button" className="btn btn-primary">Mark Complete</button>
          <button type="button" className="btn btn-light">Next</button>
         </Col>
      </Row>
      <Row>
        <Col md="10">
          <button type="button" className="btn btn-primary"></button>
          <button type="button" className="btn btn-light"></button>

          <button type="button" className="btn btn-light"
                  data-toggle="tooltip" data-placement="bottom"
                  data-original-title="Button info"></button>
        </Col>
      </Row>
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
