import React from "react";

import Navbar from "/imports/ui/components/navbar/container";

import {
  demo_repository,
} from "/package.json";

export default class Layout_Main extends React.Component {
  render() {
    const {
      store,
      body,
    } = this.props;
    return (
      <div className="page layout-main">
        <div className="page__header">
          <Navbar store={store} />
        </div>
        <div className="page__body">
          {body}
        </div>
        <div className="page__footer">
          <p><a href={demo_repository} target="_blank">Source code on Github</a></p>
        </div>
      </div>
    );
  }
}
