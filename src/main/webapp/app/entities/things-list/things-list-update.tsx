import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IThing } from 'app/shared/model/thing.model';
import { getEntities as getThings } from 'app/entities/thing/thing.reducer';
import { getEntity, updateEntity, createEntity, reset } from './things-list.reducer';
import { IThingsList } from 'app/shared/model/things-list.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IThingsListUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ThingsListUpdate = (props: IThingsListUpdateProps) => {
  const [thingId, setThingId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { thingsListEntity, things, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/things-list');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getThings();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...thingsListEntity,
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
          <h2 id="monotaskerApp.thingsList.home.createOrEditLabel">Create or edit a ThingsList</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : thingsListEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="things-list-id">ID</Label>
                  <AvInput id="things-list-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}

              <AvGroup>
                <Label for="things-list-date">Date</Label>
                <AvField type="date" name="date"/>

                <Label for="things-list-listTime">List Time</Label>
                <AvInput
                  id="things-list-listTime"
                  type=" "
                  className="form-control"
                  name="listTime"
                  value={(!isNew && thingsListEntity.listTime) || 'MORNING'}
                >
                  <option value="MORNING">MORNING</option>
                  <option value="AFTERNOON">AFTERNOON</option>
                  <option value="EVENING">EVENING</option>
                </AvInput>

                <Label for="things-list-description">Description</Label>
                <AvField id="things-list-description" name="description" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/things-list" replace color="info">
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
  things: storeState.thing.entities,
  thingsListEntity: storeState.thingsList.entity,
  loading: storeState.thingsList.loading,
  updating: storeState.thingsList.updating,
  updateSuccess: storeState.thingsList.updateSuccess
});

const mapDispatchToProps = {
  getThings,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ThingsListUpdate);
