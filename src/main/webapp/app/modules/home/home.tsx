import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';

export type IHomeProp = StateProps;

export const Home = (props: IHomeProp) => {
  const { account } = props;

  return (
    <div>
      <Row className="align-items-center">
        <Col md="6">
          <div className="jumbotron">
            <h1 className="display-3">One Thing at a Time App</h1>
            <p className="lead">Helps you get things done by focusing on one thing at a time!</p>
          </div>
        </Col>

        <Col md="6">
          {account && account.login ? (
            <div className="card p-3 my-3 border-success">
              <h3 className="card-header bg-success">Welcome, {account.login}!</h3>
                <div className='breadcrumb'>
                  <li className="breadcrumb-item"><a href='/things-list' className="text-light">All Lists</a></li>
                  <li className="breadcrumb-item text-light"><a href='/one-thing-list' className="text-light">One Thing View</a></li>
                </div>

            </div>
          ) : (
            <div className="card p-3 my-3 border-primary">
              <h3 className="card-header bg-primary">Welcome!</h3>
              <div className="card-body">
                <Link to="/login" className="alert-link text-light">
                  {' '}
                  Sign in
                </Link>
                <p />
                <Link to="/account/register" className="alert-link text-light">
                  Register
                </Link>
              </div>
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <div className="card border-info">
            <h3>About</h3>

            <p>This is a project to create a task list that will only show one task at a time. It is created for people who feel overwhelmed by a long to-do list, which can lead to a lack of productivity. It will help them focus on one task at a time, so they can do the things they need to do.</p>

            <h3>Features</h3>

            <ul>
              <li><strong>One Thing window:</strong> this shows the one thing that the user is doing right now</li>
              <li><strong>All Lists window:</strong> this shows the full task list, and allow the user to edit the list.</li>
              <li><strong>Different lists for different times of day:</strong> In the <i>All Lists</i> window, tasks can be sorted into lists for morning, afternoon, or evening.</li>
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
