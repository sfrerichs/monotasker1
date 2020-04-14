import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';

export type IHomeProp = StateProps;

export const Home = (props: IHomeProp) => {
  const { account } = props;

function moreInfo() {
  document.getElementById("infoButton").outerHTML = '<div class="alert alert-info">More Info Shows up HERE!</div>';
}

  return (
    <div>
      <Row className="align-items-center">
        <Col md="6">
          <div className="jumbotron">
            <h1 className="display-3">One Thing at a Time App</h1>
            <p className="lead">Helps you get things done by focusing on one thing at a time!</p>
            <hr className="my-4" />

            <div>
              <p className="lead">
                  <a className="btn btn-info"
                  onClick={()=>moreInfo()}
                  role="button">Learn more</a>
              </p>
              <span id="infoButton" />
            </div>

          </div>
        </Col>

        <Col md="6">
          {account && account.login ? (
            <div className="card p-3 my-3 border-success">
              <h3 className="card-header bg-success">Welcome, {account.login}!</h3>
                <div className='breadcrumb'>
                  <li className="breadcrumb-item"><a href='/things-list' className="text-light">All Lists</a></li>
                  <li className="breadcrumb-item text-light"><a href='#' className="text-light">One Thing View</a></li>
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
