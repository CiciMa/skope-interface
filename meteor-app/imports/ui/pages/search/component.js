import React from "react";
import PropTypes from "prop-types";

import {
  SearchkitManager,
  SearchkitProvider,
  Layout,
  Pagination,
  Panel,
  TopBar,
  SearchBox,
  LayoutBody,
  SideBar,
  RefinementListFilter,
  NumericRefinementListFilter,
  RangeFilter,
  LayoutResults,
  InputFilter,
  ActionBar,
  ActionBarRow,
  HitsStats,
  SelectedFilters,
  ResetFilters,
  MovieHitsGridItem,
  Hits,
  NoHits,
  DynamicRangeFilter,
  CheckboxFilter,
  TermQuery,
  BoolMust,
  RangeQuery,
} from "searchkit";
import "searchkit/release/theme.css";



class SearchResultItem extends React.Component {
  render () {
      const {
          result: {
              _index,
              _type,
              _id,
              _score,
              _source: {
                  account_number,
                  balance,
                  firstname,
                  lastname,
                  age,
                  // gender,
                  address,
                  employer,
                  email,
                  // city,
                  state,
              },
          },
      } = this.props;
    return (
        // <pre>{JSON.stringify(this.props, null, 2)}</pre>
        <div style={{
            color: "#37517C",
            border: "2px solid #37517C",
            margin:"25px",
            width: '90%',
            boxSizing: 'border-box',
            padding: 8
        }}>
            <p><b>lastname</b>:{lastname}</p>
            <p><b>firstname</b>:{firstname}</p>
            <p><b>balance</b>:{balance}</p>
            <p><b>address:</b>{address}</p>
            <p><b>email:</b>{email}</p>

        <button className="button_1">View Data</button>
        <button className="button_2">More Information</button>
        <button className="button_3">Download</button>
    </div>

    );
  }
}

export default class Page_Search extends React.Component {

  static propTypes = {
    // SearchKit Manager instance.
    searchkit: PropTypes.instanceOf(SearchkitManager),
    // Callback function for updating search input.
    updateSearchInput: PropTypes.func.isRequired,
  };

  constructor (props) {
    super(props);

    this._bound_searchButtonOnClick = this._searchButtonOnClick.bind(this);
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
      searchkit,

      searchString,
      searchPending,
      searchResults,
      dataFilters,

      results = [],
    } = this.props;

    return (
      <div className="page--search">
        {/*<div>*/}
           {/*<input*/}
               {/*type="search"*/}
               {/*id="mySearch"*/}
               {/*onChange={this.props.updateSearchInput}*/}
           {/*></input>*/}
        {/*</div>*/}
        <SearchkitProvider searchkit={searchkit}>
          <Layout>
            <LayoutBody>
              <SideBar>
                <Panel title="" defaultCollapsed={false}>
                <InputFilter
                  id="lastname-input"
                  title="Search by last name"
                  placeholder="Search last name here"
                  searchOnChange={true}
                  prefixQueryFields={["lastname"]}
                  queryFields={["lastname"]}
                />
                <RefinementListFilter
                  id="state-list"
                  title="State"
                  field="state"
                  operator="OR"
                  size={4}
                />
                <RefinementListFilter
                  id="city-list"
                  title="City"
                  field="city"
                  operator="OR"
                  size={4}
                />
                <NumericRefinementListFilter
                  id="age-refine"
                  title="Age Groups"
                  field="age"
                  options={[
                    {title:"All"},
                    {title:"up to 20", from:0, to:21},
                    {title:"21 to 25", from:21, to:26},
                    {title:"26 to 30", from:26, to:31},
                    {title:"31 to 35", from:31, to:36},
                    {title:"36 to 40", from:36, to:41},
                  ]}
                />
                <Panel title="Age Range" collapsable={false} defaultCollapsed={false}>
                  <RangeFilter
                  field="age"
                  id="age-range"
                  min={0}
                  max={100}
                  showHistogram={true}
                  title=""
                  />
                </Panel>
                <RefinementListFilter
                  id="gender-list"
                  title="Gender"
                  field="gender"
                  operator="OR"
                  size={2}
                />
                </Panel>
              </SideBar>

              <LayoutResults>
                <ActionBar>
                  <ActionBarRow>
                    <Panel>
                      <div className="search_box">
                        <SearchBox
                            autofocus={true}
                            searchOnChange={true}
                            prefixQueryFields={["lastname","age","employer","city"]}
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
                {/*<ViewSwitcherHits*/}
                    {/*hitsPerPage={12} highlightFields={["lastname","age"]}*/}
                    {/*hitComponents = {[*/}
                        {/*{key:"grid", title:"Grid", itemComponent:SearchResultItem, defaultOption:true},*/}
                        {/*{key:"list", title:"List", itemComponent:SearchResultItem}*/}
                    {/*]}*/}
                    {/*scrollTo="body"*/}
                {/*/>*/}
                <Hits
                    mod="sk-hits-list"
                    hitsPerPage={3}
                    itemComponent={SearchResultItem} />
                <NoHits/>
                <Pagination
                    showNumbers={true}/>
              </LayoutResults>
            </LayoutBody>
          </Layout>
        </SearchkitProvider>
      </div>
    );
  }
}
