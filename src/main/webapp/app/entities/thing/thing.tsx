import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities, updateEntity } from './thing.reducer';
import { IThing } from 'app/shared/model/thing.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IThingProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Thing = (props: IThingProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { thingList, match, loading } = props;

  class WorkingList extends React.Component {
    constructor(myProps) {
      super(myProps);
      this.state = {
        workingListId: null,
        workingList: [],
        workingListIndex: 0
      };
      this.handleSelect = this.handleSelect.bind(this);
      this.setWorkingList = this.setWorkingList.bind(this);
      this.resetWorkingList = this.resetWorkingList.bind(this);
      this.nextButtonClick = this.nextButtonClick.bind(this);
    }

    handleSelect(event) {
      this.setState({
        workingListId: event.target.value
      });
    }

    // adds all things with workingListId to an array called workingList
    setWorkingList() {
      const workingListId = this.state.workingListId;
      function checkListId(thing) {
        return thing.thingsList.id.toString() === workingListId;
      }
      const chosenItems = thingList.filter(checkListId);
      this.setState({
        workingList: [ ...this.state.workingList, ...chosenItems]
      });
    }

    resetWorkingList() {
      this.setState({
        workingList: []
      });
    }

    nextButtonClick() {
      const workingListIndex = this.state.workingListIndex;
      const workingListLength = this.state.workingList.length;
      let nextIndex = workingListIndex;

      if (nextIndex === workingListLength - 1) {
        nextIndex = 0;
      } else {
        nextIndex = workingListIndex + 1;
      }

      this.setState({
        workingListIndex: nextIndex
      });
    }

    completeButtonClick() {
      const oneThing = workingList[workingListIndex];


    }

    render() {
      const workingList =  this.state.workingList;
      const workingListIndex = this.state.workingListIndex;
      const oneThing = workingList[workingListIndex];

      return (
        <div>
          <Row>
            <Col sm="8">
              <div className="jumbotron">
                <p className="lead">Your One Thing to Work on:</p>
                { workingList.length > 0 ?
                <h1 className="display=3">{oneThing.description}</h1>
                : <h3 className="text-warning">Choose a List</h3> }
              </div>
              <ListVisualGroup workingList={workingList} />
            </Col>

            <Col sm="4">
              <div className="card border-warning mb-3 mt-3">
                <p className="card-title">Your List:</p>
                <div className="card-body">
                  {workingList.length === 0 ?
                    <div className="form-group">
                      <label htmlFor="selectList">Time of Day:</label>
                      <select className="form-control" id="selectList"
                              value={this.state.value} onChange={this.handleSelect}>
                        <option default value=""></option>
                        <option value="162">Morning</option>
                        <option value="163">Afternoon</option>
                        <option value="164">Evening</option>
                      </select>
                      <button type="button" className="btn btn-warning"
                              value={this.state.value}
                              onClick={this.setWorkingList}>Start!</button>
                    </div>
                    : <div>
                        <div className="card-header">{oneThing.thingsList.listTime}</div>
                        <button type="button" className="btn btn-outline-danger mt-3"
                        value=""
                        onClick={this.resetWorkingList}>Reset</button>
                      </div>
                  }
                </div>
              </div>
              {workingList.length > 0 ?
                <div>
                  <Button type="button"
                        className="btn btn-outline-primary mr-3"
                        tag={Link} to={`/thing/${oneThing.id}/edit`}>
                        Mark Complete</Button>

                  <Button type="button"
                          className="btn btn-outline-light mr-3"
                          onClick={this.nextButtonClick}>
                     Next</Button>
                </div>
                : null}
              <Link to={`/things-list`} className="btn btn-outline-warning">All Lists View</Link>
            </Col>
          </Row>
        </div>
      );
    }
  }

  // makes a button/badge for each item in list passed into myProps from workingList
  function ListVisual(myProps) {
    return (
      <span className="badge badge-pill badge-light mr-3">{myProps.value}</span>
    );
  }
  function ListVisualGroup(myProps) {
    const workingList = myProps.workingList;
    const listItems = workingList.map((item)=>
      <ListVisual key={item.id}
                  value={item.id} />
    );
    return ( workingList ?
      <div>{listItems}</div>
      : null );
  }


  return (
    <div>
      <WorkingList />

      <hr hidden />
      <h2 hidden id="thing-heading">
        Things
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Thing
        </Link>
      </h2>
      <div hidden className="table-responsive">
        {thingList && thingList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Order</th>
                <th>Description</th>
                <th>Is Complete</th>
                <th>Things List</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {thingList.map((thing, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${thing.id}`} color="link" size="sm">
                      {thing.id}
                    </Button>
                  </td>
                  <td>{thing.order}</td>
                  <td>{thing.description}</td>
                  <td>{thing.isComplete ? 'true' : 'false'}</td>
                  <td>{thing.thingsList ? <Link to={`things-list/${thing.thingsList.id}`}>{thing.thingsList.id} {thing.thingsList.description}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${thing.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${thing.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${thing.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
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
