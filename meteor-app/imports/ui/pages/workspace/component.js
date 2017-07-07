import React from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";

export default class Page_Workspace extends React.Component {

  static propTypes = {
    // List of layers to display.
    layers: PropTypes.arrayOf(PropTypes.object).isRequired,
    // Callback function for toggling the visibility of layers.
    toggleLayer: PropTypes.func.isRequired,
    // Callback function for toggling the opacity of layers.
    updateLayerOpacity: PropTypes.func.isRequired,

    // Indicate if a point is selected for inspection.
    inspectPointSelected: PropTypes.bool.isRequired,
    // The coordinate of the point being inspected.
    inspectPointCoordinate: PropTypes.arrayOf(PropTypes.number).isRequired,
    // Indicate if the data is being loaded for the point.
    inspectPointLoading: PropTypes.bool.isRequired,
    // The loaded data for the point.
    inspectPointData: PropTypes.arrayOf(PropTypes.object),
    // Callback function for selecting a point to inspect.
    selectInspectPoint: PropTypes.func.isRequired,

    // Lower bound of the filter slider.
    filterMin: PropTypes.number.isRequired,
    // Upper bound of the filter slider.
    filterMax: PropTypes.number.isRequired,
    // Current value of the filter slider.
    filterValue: PropTypes.number.isRequired,
      
    rangeMin: PropTypes.number.isRequired,
    rangeMax: PropTypes.number.isRequired,
      
    // Callback function for updating filter value.
    updateFilterValue: PropTypes.func.isRequired,
    updateFilterMin: PropTypes.func.isRequired,
    updateFilterMax: PropTypes.func.isRequired,
      
    welcomeWindowClosed: PropTypes.bool.isRequired,
    closeWelcomeWindow: PropTypes.func.isRequired,
    layerOpacity: PropTypes.number.isRequired,
  };

  componentDidMount () {
    if (this._mapview) {
      this._mapview.addEventListener('click:view', this._bound_mapOnClick);
    }
  }

  constructor (props) {
    super(props);

    this._bound_rangeFilterOnChange = this._rangeFilterOnChange.bind(this);
    this._bound_rangeFilterMinOnChange = this._rangeFilterMinOnChange.bind(this);
    this._bound_rangeFilterMaxOnChange = this._rangeFilterMaxOnChange.bind(this);
    this._bound_yearStepBackButtonOnClick = this._yearStepBackButtonOnClick.bind(this);
    this._bound_yearStepForwardButtonOnClick = this._yearStepForwardButtonOnClick.bind(this);
    this._bound_yearMinStepBackButtonOnClick = this._yearMinStepBackButtonOnClick.bind(this);
    this._bound_yearMinStepForwardButtonOnClick = this._yearMinStepForwardButtonOnClick.bind(this);
    this._bound_yearMaxStepBackButtonOnClick = this._yearMaxStepBackButtonOnClick.bind(this);
    this._bound_yearMaxStepForwardButtonOnClick = this._yearMaxStepForwardButtonOnClick.bind(this);
    this._bound_layerVisibilityOnChange = this._layerVisibilityOnChange.bind(this);
    this._bound_layerOpacityOnChange = this._layerOpacityOnChange.bind(this);
    this._bound_mapOnClick = this._mapOnClick.bind(this);
      
    this._bound_closeWelcomeWindow = this._closeWelcomeWindow.bind(this);
    this._bound_toggleMenu = this._toggleMenu.bind(this);
  }

  _rangeFilterOnChange (event) {
    console.info('filter changed', Date.now());

    const target = event.currentTarget;
    const {
      filterMin,
      updateFilterValue,
    } = this.props;

    updateFilterValue(target.value);
  }
    
  _rangeFilterMinOnChange (event) {
    console.info('filter min changed', Date.now());

    const target = event.currentTarget;
    const {
      filterValue,
      updateFilterMin,
    } = this.props;

    updateFilterMin(target.value);
  }
    
  _rangeFilterMaxOnChange (event) {
    console.info('filter max changed', Date.now());

    const target = event.currentTarget;
    const {
      filterValue,
      updateFilterMax,
    } = this.props;

    updateFilterMax(target.value);
  }

  _layerVisibilityOnChange (event) {
    const target = event.currentTarget;
    const layerIndex = parseInt(target.getAttribute("data-layer-index"));
    const layerVisible = target.checked;
    const {
      toggleLayer,
    } = this.props;

    toggleLayer(layerIndex, layerVisible);
  }

  _layerOpacityOnChange (event) {
    const target = event.currentTarget;
    const opacity = target.value / 255;
    const {
      updateLayerOpacity,
    } = this.props;

    updateLayerOpacity(opacity);
  }

  _yearStepBackButtonOnClick (/*event*/) {
    const {
      rangeMin,
      filterValue,
      updateFilterValue,
    } = this.props;

    updateFilterValue(Math.max(rangeMin, filterValue - 1));
  }

  _yearStepForwardButtonOnClick (/*event*/) {
    const {
      rangeMax,
      filterValue,
      updateFilterValue,
    } = this.props;

    updateFilterValue(Math.min(rangeMax, filterValue + 1));
  }
    
  _yearMinStepBackButtonOnClick (/*event*/) {
    const {
      filterMin,
      rangeMin,
      updateFilterMin,
    } = this.props;

    updateFilterMin(Math.max(filterMin - 1, rangeMin));
  }

  _yearMinStepForwardButtonOnClick (/*event*/) {
    const {
      filterMin,
      filterMax,
      updateFilterMin,
    } = this.props;

    updateFilterMin(Math.min(filterMin + 1, filterMax));
  }
    
  _yearMaxStepBackButtonOnClick (/*event*/) {
    const {
      filterMax,
      filterMin,
      updateFilterMax,
    } = this.props;

    updateFilterMax(Math.max(filterMax - 1, filterMin));
  }

  _yearMaxStepForwardButtonOnClick (/*event*/) {
    const {
      filterMax,
      rangeMax,
      updateFilterMax,
    } = this.props;

    updateFilterMax(Math.min(filterMax + 1, rangeMax));
  }

  _mapOnClick (event) {
    const {
      selectInspectPoint,
    } = this.props;

    console.log(event.latLongCoordinate);
    selectInspectPoint(event.latLongCoordinate);
  }

  _closeWelcomeWindow(event) {
      const {
          closeWelcomeWindow,
      } = this.props;
      
      closeWelcomeWindow();
  }

  _toggleMenu(event) {
      const {
          toggleMenu,
          menuShown,
      } = this.props;
      
      toggleMenu(menuShown);
  }

  render () {
    const {
      layers,
      toggleLayer,

      inspectPointSelected,
      inspectPointCoordinate,
      inspectPointLoading,
      inspectPointData,

      filterMin,
      filterMax,
      filterValue,
      rangeMin,
      rangeMax,
        
      welcomeWindowClosed,
      menuShown,
      layerOpacity,
    } = this.props;

    return (
      <div className="page--workspace">
        
        {!welcomeWindowClosed ? (
            <div className="welcome_frame">
                <div className="welcome_background">
                </div>

                <div className="welcome_info">
                    <h3>Model Run Metadata</h3>
                    <button onClick={this._bound_closeWelcomeWindow}>Close</button>
                    <p>This is the metadata of the layers.</p>
                </div>
            </div>
        ) : null}

      <div className="section_filter">
        <div className="filter-row">
          <label>Year: </label>
          <input
            className="layout_fill"
            type="range"
            min={rangeMin}
            max={rangeMax}
            step="1"
            value={filterValue}
            onChange={this._bound_rangeFilterOnChange}
          />
          <button onClick={this._bound_yearStepBackButtonOnClick}>&lt;</button>
          <label>{filterValue}</label>
          <button onClick={this._bound_yearStepForwardButtonOnClick}>&gt;</button>
        </div>
        <ul className="layer-list">
          <p>Layer list:</p>
          {layers.map((layer, layerIndex) => (
            <li key={layerIndex}>
              <div>
                <input title="Toggle Visibility" type="radio" checked={!layer.invisible} data-layer-index={layerIndex} onChange={this._bound_layerVisibilityOnChange} />
                <label>{layer.name}</label>
              </div>
            </li>
          ))}
          <div>
            <label>Opacity:</label>
            <input type="range" min="0" max="255" step="1" value={layerOpacity * 255} onChange={this._bound_layerOpacityOnChange} />
            <label>{layerOpacity.toFixed(2)}</label>
          </div>
        </ul>
      </div>
            
          <div className="section_map">
            <map-view
              class="the-map"
              basemap="osm"
              center="-12107625, 4495720"
              zoom="5"
              ref={(ref) => this._mapview = ref}
            >
              {layers.map((layer, layerIndex) => (
                <map-layer-group
                  key={layerIndex}
                >
                  <map-layer-twms
                    url={layer.url}
                    min-zoom={layer.minZoom}
                    max-zoom={layer.maxZoom}
                    invisible={layer.invisible ? "invisible" : null}
                    opacity={layerOpacity}
                    extent={layer.extent}
                    params={"LAYERS=" + layer.name + filterValue + "&TILED=true"}
                    server-type="geoserver"
                  ></map-layer-twms>
                  {!layer.nextUrl ? null : (
                    <map-layer-xyz
                      name={`${layer.name} (preload)`}
                      url={layer.nextUrl}
                      min-zoom={layer.minZoom}
                      max-zoom={layer.maxZoom}
                      opacity={layerOpacity}
                      extent={layer.extent}
                    ></map-layer-xyz>
                  )}
                </map-layer-group>
              ))}

              <map-layer-singlepoint
                invisible={!inspectPointSelected ? "invisible" : null}
                latitude={inspectPointCoordinate[1]}
                longitude={inspectPointCoordinate[0]}
              ></map-layer-singlepoint>

              <map-control-defaults></map-control-defaults>
              <map-interaction-defaults></map-interaction-defaults>
              <map-control-simple-layer-list></map-control-simple-layer-list>
            </map-view>
          </div>

        {
          !inspectPointSelected
          ? <span>Choose a point on the map to view the corresponding charts</span>
          : (
              inspectPointLoading
              ? (
                  <div>
                    <span>Loading...</span>
                  </div>
                )
              : (
                <div className="section_data">

                    <div className="section_range">
                        <div className="filter-min">
                          <label>Start: </label>
                          <input
                            className="layout_fill"
                            type="range"
                            min={rangeMin}
                            max={filterMax}
                            step="1"
                            value={filterMin}
                            onChange={this._bound_rangeFilterMinOnChange}
                          />
                          <button onClick={this._bound_yearMinStepBackButtonOnClick}>&lt;</button>
                          <label>{filterMin}</label>
                          <button onClick={this._bound_yearMinStepForwardButtonOnClick}>&gt;</button>
                        </div>
                        <div className="filter-max">
                          <label>End: </label>
                          <input
                            className="layout_fill"
                            type="range"
                            min={filterMin}
                            max={rangeMax}
                            step="1"
                            value={filterMax}
                            onChange={this._bound_rangeFilterMaxOnChange}
                          />
                          <button onClick={this._bound_yearMaxStepBackButtonOnClick}>&lt;</button>
                          <label>{filterMax}</label>
                          <button onClick={this._bound_yearMaxStepForwardButtonOnClick}>&gt;</button>
                        </div>
                    </div>

                    <div className="section_charts">
                        {inspectPointData.map(({label, data}, dataIndex) => (
                          <div
                            key={dataIndex}
                            style={{height: "200px"}}
                          >
                            <Line
                              data={{
                                datasets: [
                                  {
                                    label,
                                    lineTension: 0,
                                    pointRadius: 0,
                                    backgroundColor: 'rgba(255,99,132,0.2)',
                                    borderColor: 'rgba(255,99,132,1)',
                                    borderWidth: 1,
                                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                                    hoverBorderColor: 'rgba(255,99,132,1)',
                                    data,
                                  },
                                ],
                              }}
                              options={{
                                animation: {
                                  duration: 0,
                                },
                                maintainAspectRatio: false,
                                tooltips: {
                                  enabled: true,
                                  mode: "nearest",
                                  intersect: false,
                                },
                                hover: {
                                  mode: "nearest",
                                  intersect: false,
                                  animationDuration: 0,
                                },
                                scales: {
                                  xAxes: [
                                    {
                                      type: "linear",
                                      position: "bottom",
                                      ticks: {
                                        autoSkip: true,
                                        autoSkipPadding: 8,
                                      },
                                    },
                                  ],
                                },
                              }}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                )
            )
        }
    </div>
    );
  }
}
