import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IOneThingList } from 'app/shared/model/one-thing-list.model';
import { getEntities as getOneThingLists } from 'app/entities/one-thing-list/one-thing-list.reducer';
import { getEntity, updateEntity, createEntity, reset } from './things-list.reducer';
import { IThingsList } from 'app/shared/model/things-list.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IThingsListUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ThingsListUpdate = (props: IThingsListUpdateProps) => {
  const [oneThingListId, setOneThingListId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { thingsListEntity, oneThingLists, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/things-list');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getOneThingLists();
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
                <Label id="dateLabel" for="things-list-date">
                  Date
                </Label>
                <AvField id="things-list-date" type="date" className="form-control" name="date" />
              </AvGroup>
              <AvGroup>
                <Label id="listTimeLabel" for="things-list-listTime">
                  List Time
                </Label>
                <AvInput
                  id="things-list-listTime"
                  type="select"
                  className="form-control"
                  name="listTime"
                  value={(!isNew && thingsListEntity.listTime) || 'MORNING'}
                >
                  <option value="MORNING">MORNING</option>
                  <option value="AFTERNOON">AFTERNOON</option>
                  <option value="EVENING">EVENING</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="things-list-description">
                  Description
                </Label>
                <AvField id="things-list-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label for="things-list-oneThingList">One Thing List</Label>
                <AvInput id="things-list-oneThingList" type="select" className="form-control" name="oneThingList.id">
                  <option value="" key="0" />
                  {oneThingLists
                    ? oneThingLists.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
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
  oneThingLists: storeState.oneThingList.entities,
  thingsListEntity: storeState.thingsList.entity,
  loading: storeState.thingsList.loading,
  updating: storeState.thingsList.updating,
  updateSuccess: storeState.thingsList.updateSuccess
});

const mapDispatchToProps = {
  getOneThingLists,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ThingsListUpdate);
