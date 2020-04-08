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
          <div className="container-fluid">
            <div className="row">

              <div className="col-sm-4">
                <div className="card border-warning">
                  <h4 className="card-header">Time</h4>
                  <table className="table table-hover">
                    <tbody>
                      {thingList.map((thing, i) => (
                        <tr key={`entity-${i}`}>
                          <td>
                          <Button tag={Link} to={`${match.url}/${thing.id}`} color="link" size="sm">
                             {thing.description}
                          </Button>
                          </td>
                         </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="col-sm-4">
                <div className="card border-danger">
                  <h4 className="card-header">Time</h4>
                  <table className="table table-hover">
                    {thingList.map((thing, i) => (
                      <tr key={`entity-${i}`}>
                        <td>{thing.description}</td>
                       </tr>
                    ))}
                  </table>
                </div>
              </div>

              <div className="col-sm-4">
                <div className="card border-success">
                  <h4 className="card-header">Time</h4>
                  <table className="table table-hover">
                    {thingList.map((thing, i) => (
                      <tr key={`entity-${i}`}>
                        <td>{thing.description}</td>
                       </tr>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
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
