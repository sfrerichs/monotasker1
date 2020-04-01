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
  document.getElementById("infoButton").outerHTML = '<p class="text-info">Sort your to-do list by time of day, then work through each group one thing at a time.</p>';
}

  return (
    <Row>
      <Col md="6">
        <div className="container p-3 my-3 bg-dark">
          <h1 className="display-3">One Thing at a Time App</h1>
          <p className="lead">Helps you get things done by focusing on one thing at a time!</p>
          <hr className="my-4" />

          <div id="infoButton">
            <p className="lead">
                <a className="btn btn-info"
                onClick={()=>moreInfo()}
                role="button">Learn more</a>
            </p>
          </div>

        </div>
      </Col>

      <Col md="6">
        {account && account.login ? (
          <div className="container p-3 my-3 bg-default">
            <Alert color="success">You are logged in as {account.login}.</Alert>
          </div>
        ) : (
          <div className="container p-3 my-3 bg-default">
            <Alert color="warning">
              <Link to="/login" className="alert-link">
                {' '}
                Sign in here
              </Link>
              <p />
              <Link to="/account/register" className="alert-link">
                Register a new account
              </Link>
              <p />
              <div>For development try these:
              <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
              <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
              </div>
            </Alert>
          </div>
        )}
      </Col>
    </Row>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
