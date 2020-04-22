import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IThingsList } from 'app/shared/model/things-list.model';
import { getEntities as getThingsLists } from 'app/entities/things-list/things-list.reducer';
import { getEntity, updateEntity, createEntity, reset } from './one-thing-list.reducer';
import { IOneThingList } from 'app/shared/model/one-thing-list.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IOneThingListUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OneThingListUpdate = (props: IOneThingListUpdateProps) => {
  const [thingsListId, setThingsListId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { oneThingListEntity, thingsLists, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/one-thing-list');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getThingsLists();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...oneThingListEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="monotaskerApp.oneThingList.home.createOrEditLabel">Create or edit a OneThingList</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : oneThingListEntity} onSubmit={saveEntity} target="one-thing-list">
              {!isNew ? (
                <AvGroup hidden>
                  <Label for="one-thing-list-id">ID</Label>
                  <AvInput id="one-thing-list-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup hidden>
                <Label for="one-thing-list-myText">My Text</Label>
                <AvField id="one-thing-list-myText" type="text" name="myText" />
              </AvGroup>

              <AvGroup className="btn-group btn-group-toggle" data-toggle="buttons">
                {thingsLists.map(otherEntity => (
                  <label key={otherEntity.id} className="btn btn-outline-warning">
                    {otherEntity.description} {otherEntity.date} {otherEntity.listTime}
                    <AvInput value={otherEntity.id} type="radio" name="options" id="option1" />
                  </label>
                ))}
              </AvGroup>

              <Button tag={Link} id="cancel-save" to="/one-thing-list" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  thingsLists: storeState.thingsList.entities,
  oneThingListEntity: storeState.oneThingList.entity,
  loading: storeState.oneThingList.loading,
  updating: storeState.oneThingList.updating,
  updateSuccess: storeState.oneThingList.updateSuccess
});

const mapDispatchToProps = {
  getThingsLists,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OneThingListUpdate);
