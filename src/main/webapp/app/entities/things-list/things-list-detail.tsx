import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './things-list.reducer';
import { IThingsList } from 'app/shared/model/things-list.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IThingsListDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ThingsListDetail = (props: IThingsListDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { thingsListEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          ThingsList [<b>{thingsListEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="listTime">List Time</span>
          </dt>
          <dd>{thingsListEntity.listTime}</dd>
        </dl>
        <Button tag={Link} to="/things-list" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/things-list/${thingsListEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ thingsList }: IRootState) => ({
  thingsListEntity: thingsList.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ThingsListDetail);
