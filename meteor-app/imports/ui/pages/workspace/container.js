import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import { createContainer } from "meteor/react-meteor-data";
import Component from "./component";

import {
  rangeMin,
  rangeMax,
} from "/imports/ui/consts";

import * as actions from "/imports/ui/actions";

export default createContainer((props) => {
  // props here will have `main`, passed from the router
  // anything we return from this function will be *added* to it.

  const {
    store,
  } = props;
  const {
    workspace: {
      layers,

      inspectPointSelected,
      inspectPointCoordinate,
      inspectPointLoading,
      inspectPointData,

      filterMin,
      filterMax,
      filterValue,
    },
  } = store.getState();

  return {
    layers: layers.map((layer) => ({
      ...layer,
      //url: `http://demo.openskope.org/static_tiles/${layer.urlTile}/tiles/${layer.urlTile}-${filterValue}-color/{z}/{x}/{-y}.png`,
      //nextUrl: `http://demo.openskope.org/static_tiles/${layer.urlTile}/tiles/${layer.urlTile}-${filterValue + 1}-color/{z}/{x}/{-y}.png`,
      url: `http://141.142.170.100:8080/geoserver/wms?request=GetMap&service=WMS&version=1.1.1&layers=GDD&styles=2000&srs=EPSG%3A4326&bbox={z},{-y},{x},{y}&&width=256&height=256&format=image%2Fpng`,
    })),
    toggleLayer: (layerIndex, visible) => {
      store.dispatch({
        type: actions.WORKSPACE_TOGGLE_LAYER_VISIBILITY.type,
        index: layerIndex,
        visible,
      });
    },
    updateLayerOpacity: (layerIndex, opacity) => {
      store.dispatch({
        type: actions.WORKSPACE_CHANGE_LAYER_OPACITY.type,
        index: layerIndex,
        opacity,
      });
    },

    inspectPointSelected,
    inspectPointCoordinate,
    inspectPointLoading,
    inspectPointData: Object.keys(inspectPointData ? inspectPointData.data : {}).map((sourceName) => ({
      label: sourceName,
      data: inspectPointData.data[sourceName]
            .filter((value, valueIndex) => (valueIndex >= filterMin && valueIndex <= filterMax))
            .map((value, valueIndex) => ({
              x: filterMin + valueIndex,
              y: value,
            })),
    })),
    selectInspectPoint: (coord) => {
      if (coord) {
        store.dispatch({
          type: actions.WORKSPACE_INSPECT_POINT.type,
          selected: true,
          coordinate: coord,
        });

        Meteor.call("timeseries.get", {lon: coord[0], lat: coord[1]}, (error, result) => {
          store.dispatch({
            type: actions.WORKSPACE_INSPECT_POINT_RESOLVE_DATA.type,
            coordinate: coord,
            error,
            result,
          });
        });
      } else {
        store.dispatch({
          type: actions.WORKSPACE_INSPECT_POINT.type,
          selected: false,
          coordinate: [0, 0],
        });
      }
    },

    filterMin,
    filterMax,
    filterValue,
    rangeMin,
    rangeMax,
  };
}, Component);
