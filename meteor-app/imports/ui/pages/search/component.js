import React from "react";
import PropTypes from "prop-types";

import {
    SearchkitManager,
    SearchkitProvider,
    Layout,
    TopBar,
    SearchBox,
    LayoutBody,
    SideBar,
    HierarchicalMenuFilter,
    RefinementListFilter,
    LayoutResults,
    ActionBar,
    ActionBarRow,
    HitsStats,
    SelectedFilters,
    ResetFilters,
    MovieHitsGridItem,
    MovieHitsListItem,
    Pagination,
    InputFilter,
    Hits,
    NoHits,
    Panel,
    GroupedSelectedFilters,
    ViewSwitcherHits,
    RangeFilter
} from "searchkit";
// import "searchkit/release/theme.css";



const searchkit = new SearchkitManager(
    "http://demo.searchkit.co/api/movies/"
);

const App = ()=> (
    <SearchkitProvider searchkit={searchkit}>
      <Layout>

        <LayoutBody>
          <SideBar>
              <Panel title="Models" collapsable={true} defaultCollapsed={false}>
                  <RefinementListFilter
                      id="actors"
                      // title="Actors"
                      field="actors.raw"
                      operator="AND"
                      size={5}/>
              </Panel>
            <Panel title="Data Type" collapsable={true} defaultCollapsed={false}>
              <RefinementListFilter
                  id="actors"
                  // title="Actors"
                  field="actors.raw"
                  operator="AND"
                  size={10}/>
            </Panel>
            <Panel title="Data Source" collapsable={true} defaultCollapsed={false}>
              <RefinementListFilter
                  id="countries"
                  // title="Countries"
                  field="countries.raw"
                  operator="OR"
                  size={10}/>
            </Panel>
            <InputFilter
                id="author_q"
                title="Area of Interest"
                placeholder="Search actors"
                searchOnChange={true}
                prefixQueryFields={["actors"]}
                queryFields={["actors"]}
            />
              <div>Time Range</div>
              <RangeFilter
                id="metascore"
                field="metaScore"
                min={0} max={100}
                //Year
                showHistogram={true}
                title="Start Year"
                // rangeComponent={RangeSliderInput(10, 20)}
              />
              <RangeFilter
                  id="metascore"
                  field="metaScore"
                  min={1} max={1000}
                  //Year
                  showHistogram={true}
                  title="End Year"
                  // rangeComponent={RangeSliderInput(10)}
              />
          </SideBar>

          <LayoutResults>
            <ActionBar>
                <ActionBarRow>
                    <Panel>
                        <div className="search_box">
                            <SearchBox
                                autofocus={true}
                                searchOnChange={true}
                                prefixQueryFields={["actors^1","type^2","languages","title^10"]}
                                placeholder={"Keyword Search"}
                            />
                        </div>
                    </Panel>
            </ActionBarRow>

               <ActionBarRow>
                <HitsStats/>
               </ActionBarRow>

               <ActionBarRow>
                <SelectedFilters/>
                <ResetFilters/>
               </ActionBarRow>

            </ActionBar>

            <ViewSwitcherHits
                hitsPerPage={12} highlightFields={["title","plot"]}
                sourceFilter={["plot", "title", "poster", "imdbId", "imdbRating", "year"]}
                hitComponents = {[
                    {key:"grid", title:"Grid", itemComponent:MovieHitsGridItem, defaultOption:true},
                    {key:"list", title:"List", itemComponent:MovieHitsListItem}
                ]}
                scrollTo="body"
            />

            <Hits mod="sk-hits-list" hitsPerPage={3} itemComponent={MovieHitsListItem} sourceFilter={["title", "poster", "imdbId"]}/>
            <NoHits/>
            <Pagination
                showNumbers={true}
                // listComponent={}
            />
          </LayoutResults>
        </LayoutBody>

      </Layout>
    </SearchkitProvider>
);

class SearchResultItem extends React.Component {
    render () {
        return (
            <div style={{overflow: "auto"}}>
              <p>Some Result (Implement this)</p>
              <pre>{JSON.stringify(this.props, null, 2)}</pre>
            </div>
        );
    }
}

export default class Page_Search extends React.Component {

    static propTypes = {
        // Callback function for updating search input.
        updateSearchInput: PropTypes.func.isRequired,

        //Callback function for searching filter
        updateCheckboxInput: PropTypes.func.isRequired,

        //Checkbox
        checkbox: PropTypes.bool.isRequired,

    };

    constructor (props) {
        super(props);

        this._bound_searchButtonOnClick = this._searchButtonOnClick.bind(this);
        this._bound_searchButtonOnClick = this._searchButtonOnClick.bind(this);
    }

    _checkboxOnClick(event) {
        const {
          checkbox,

        } = this.props;
    }

    _searchButtonOnClick (event) {
        if (this.inputField_) {
            const inputValue = this.inputField_.value;
            const {
                updateSearchInput,
            } = this.props;

            updateSearchInput(inputValue);
        }
    }

    render () {
        const {
            searchString,
            searchPending,
            searchResults,
            dataFilters,

            results = [],
        } = this.props;

        return (
            <div className="page--search">
                <p className="body_row">Find Paleoenvironmental Data and Reconstructions:</p>
                <App className="body_app" />
            </div>
        );
    }
}