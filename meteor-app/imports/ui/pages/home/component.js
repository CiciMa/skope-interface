import { FlowRouter } from "meteor/kadira:flow-router";
import React from 'react';
import ReactDOM from 'react-dom';
import ReactBootstrap from 'react-bootstrap';


import { Button,
         DropdownButton,
         MenuItem,
         ButtonToolbar



} from 'react-bootstrap';

// const buttonInstance = {
//   <Button bsStyle="primary">Primary</Button>
// }


export default class Page_Home extends React.Component {


  render() {
    return (

      <div className="page--home">
            <div className="row_1">
              <div className="box">
                <div className="box_body">
                  Find and download paleoenvironmental data!<br></br>
                  <a href={FlowRouter.url("/search")}>
                    <Button bsStyle="primary" >Search</Button>
                  </a>
                </div>
              </div>
              <div className="box">
                <div className="box_body">
                  Compare and compute paleoenvironmental reconstructions!
                </div>
              </div>
              <div className="box">
                <div className="box_body">
                  Contribute your paleoenvironmental model!
                </div>
              </div>
            </div>

            <div className="row_2">
              <p>
                <b>Welcome to SKOPE: Synthesizing Knowledge of Past Environments!</b>
              </p>
              <p>
                SKOPE allows you to discover, examine, and download paleoenvironmental data:
              </p>
            </div>

            <div className="row_3">
              <div className="box">
                <div className="box_body">
                  Some Data
                </div>
              </div>
              <div className="box">
                <div className="box_body">
                  Some Data
                </div>
              </div>
              <div className="box">
                <div className="box_body">
                  Some Data
                </div>
              </div>
              <div className="box">
                <div className="box_body">
                  Some Data
                </div>
              </div>
            </div>
      </div>
    );
  }
}
