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
        <Link hidden to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Things List
        </Link>
      </h2>

      <Row>
        <div className="table-responsive">
          {thingsListList && thingsListList.length > 0 ? (
            <div className="container-fluid">
              <div className="row">

              {thingsListList.map((thingsList, i) => (
                <div className="col-md-4" key={'entity-${i}'}>
                  <div className="card border-warning">
                    <p>{thingsList.date}</p>
                    <h4 className="card-header">{thingsList.listTime}</h4>
                    <p className="text-info">{thingsList.description}</p>
                    <ul>
                      {thingsList.things.map((thing, j) => (
                        <li key={`entity-${j}`}>
                           <Button tag={Link} to={`thing/${thing.id}/edit`}>
                           {thing.description}
                           </Button>
                        </li>
                      ))}
                    </ul>
                      <Button hidden tag={Link} to={`${match.url}/${thingsList.id}`} color="link" size="sm">
                        View/edit list info
                      </Button>
                      <Button tag={Link} to={''} color="link">
                        Start this list
                      </Button>
                  </div>
                </div>
              ))}
              </div>
            </div>
          ) : (
            !loading && <div className="alert alert-warning">No Things Lists found</div>
          )}
        </div>
      </Row>

      <Row>
        <Col>
          <Link to={`thing/new`}
                className="btn btn-primary jh-create-entity"
                id="jh-create-entity">
            &nbsp; Create new Thing
          </Link>

          <Link hidden to={`things-list/new`}
                className="btn btn-primary jh-create-entity"
                id="jh-create-entity">
            &nbsp; Create new List
          </Link>
        </Col>
      </Row>
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
