import React from "react";

import Navbar from "/imports/ui/components/navbar/container";

import {
  demo_repository,
} from "/package.json";

export default class Layout_FullWindow extends React.Component {
  render() {
    const {
      store,
      body,
    } = this.props;
    return (
      <div className="page layout-fullWindow">
        <div className="page__header">
          <Navbar store={store} />
        </div>
        <div className="page__body">
          {body}
        </div>
        <div className="page__footer">
          <div><a href={demo_repository} target="_blank">Source code on Github</a></div>
        </div>
      </div>
    );
  }
}