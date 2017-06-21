import { FlowRouter } from "meteor/kadira:flow-router";
import React from 'react';
// import ReactBootstrap from 'react-bootstrap';
//
//
// import { DropdownButton,
//          MenuItem,
//          ButtonToolbar
//
//
//
// } from 'react-bootstrap';
//
// import ReactDOM from 'react-dom';
// import mountNode from 'react-mounter';
//
//
//
// const BUTTONS = ['Default', 'Primary', 'Success', 'Info', 'Warning', 'Danger'];
//
// function renderDropdownButton(title, i) {
//     return (
//         <DropdownButton bsStyle={title.toLowerCase()} title={title} key={i} id={`dropdown-basic-${i}`}>
//           <MenuItem eventKey="1">Action</MenuItem>
//           <MenuItem eventKey="2">Another action</MenuItem>
//           <MenuItem eventKey="3" active>Active Item</MenuItem>
//           <MenuItem divider />
//           <MenuItem eventKey="4">Separated link</MenuItem>
//         </DropdownButton>
//     );
// }
//
// const buttonsInstance = (
//     <ButtonToolbar>{BUTTONS.map(renderDropdownButton)}</ButtonToolbar>
// );
//
//
// ReactDOM.render(buttonsInstance);


export default class Page_Home extends React.Component {


  render() {
    return (

      <div className="page--home">
        <div className="row_1">
          <div className="col-sm-4">
            <div className="box_body">
              Find and download paleoenvironmental data!
              <a href={FlowRouter.url("/search")}>
                <button>Search</button>
              </a>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="box_body">
              Compare and compute paleoenvironmental reconstructions!
            </div>
          </div>
          <div className="col-sm-4">
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
