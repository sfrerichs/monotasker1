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


  class WorkingList extends React.Component {
    constructor(myProps) {
      super(myProps);
      this.state = {
        workingListId: null,
        workingList: []
      };
      this.handleSelect = this.handleSelect.bind(this);
      this.setWorkingList = this.setWorkingList.bind(this);
      this.resetWorkingList = this.resetWorkingList.bind(this);
    }

    handleSelect(event) {
      this.setState({
        workingListId: event.target.value
      });
    }

    // adds all things with workingListId to an array called workingList
        // 2. refine: if thingsList id == workingListId, add to workingList array
    setWorkingList() {
      const workingListId = this.state.workingListId;
      function checkListId(thing) {
        return thing.thingsList.id.toString() === workingListId;
      }
      const chosenItems = thingList.filter(checkListId);
      this.setState({
        workingList: [ ...this.state.workingList, ...chosenItems]
      });
      alert('You have chosen ' + this.state.workingListId);
    }

    resetWorkingList() {
      this.setState({
        workingList: []
      });
    }

    render() {
      const workingList =  this.state.workingList;

      return (
        <div>
          <Row>
            <Col sm="8">
              <OneThing workingList={workingList}/>
            </Col>

            <Col sm="4">
              <div className="card border-warning mb-3">
                <div className="card-header">Things List</div>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="selectList">Time of Day:</label>
                    <select className="form-control" id="selectList"
                            value={this.state.value} onChange={this.handleSelect}>
                      <option selected value="">Choose a List</option>
                      <option value="162">Morning</option>
                      <option value="163">Afternoon</option>
                      <option value="164">Evening</option>
                    </select>
                    {workingList.length ===0 ?
                    <button type="button" className="btn btn-warning"
                            value={this.state.value}
                            onClick={this.setWorkingList}>Start!</button>
                     : <button type="button" className="btn btn-danger"
                            value=""
                            onClick={this.resetWorkingList}>Reset</button>
                      }
                  </div>
                </div>
              </div>
              <CompleteButton />
              <NextButton />
            </Col>
          </Row>

          <Row>
            <Col sm="8">
              <ListVisualGroup workingList={workingList} />
            </Col>
            <Col sm="4">
              <Link to={`/things-list`} className="btn btn-outline-warning mt-3">All Lists View</Link>
            </Col>
          </Row>
        </div>
      );
    }
  }


  function OneThing(myProps) {
    return (
      <div className="jumbotron">
        { myProps.workingList.length > 0 ?
        <p>{JSON.stringify(myProps.workingList)}</p>
        : <h1 className="display-3">Choose a List</h1> }
      </div>
    );
  }

  function CompleteButton() {
    return (
      <button type="button"
      className="btn btn-primary mr-3"
      >Mark Complete</button>
    );
  }

  function NextButton() {
    return (
      <Button type="button"
      className="btn btn-light mr-3"
      >Next</Button>
    );
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

      <hr />
      <h2 id="thing-heading">
        Things
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Thing
        </Link>
      </h2>
      <div className="table-responsive">
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
