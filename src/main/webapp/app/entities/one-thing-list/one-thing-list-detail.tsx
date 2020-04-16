import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './one-thing-list.reducer';
import { IOneThingList } from 'app/shared/model/one-thing-list.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOneThingListDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OneThingListDetail = (props: IOneThingListDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { oneThingListEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          OneThingList [<b>{oneThingListEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="myText">My Text</span>
          </dt>
          <dd>{oneThingListEntity.myText}</dd>
        </dl>
        <Button tag={Link} to="/one-thing-list" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/one-thing-list/${oneThingListEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ oneThingList }: IRootState) => ({
  oneThingListEntity: oneThingList.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OneThingListDetail);
