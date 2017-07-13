import React from "react";
import PropTypes from "prop-types";

import {
  SearchkitManager,
  SearchkitProvider,
  Layout,
  Pagination,
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

    // const _index = this.props.result._index;
    // const _type = this.props.result._type;
    // const account_number = this.props.result._source.account_number;

    return (
        // <div style={{overflow: "auto"}}>
      <div style={{
        color: "grey",
        border: "2px solid black",
        margin:"25px",
        width: '100%',
        boxSizing: 'border-box',
        padding: 8
      }}>
        <p><b>lastname</b>:{lastname}</p>
        <p><b>firstname</b>:{firstname}</p>
        <p><b>balance</b>:{balance}</p>
        <p><b>address:</b>{address}</p>
        <p><b>email:</b>{email}</p>
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
        <SearchkitProvider searchkit={searchkit}>
          <Layout>
            <TopBar>
              <SearchBox
                autofocus={true}
                searchOnChange={true}
                prefixQueryFields={["actors^1","type^2","languages","title^10"]}/>
            </TopBar>
            <LayoutBody>
              <SideBar>
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
                    {title:"21 to 40", from:21, to:41},
                    {title:"41 to 60", from:41, to:61},
                    {title:"61 to 80", from:61, to:81},
                    {title:"81 to 100", from:81, to:101},
                  ]}
                />
                <RangeFilter
                  field="age"
                  id="age-range"
                  min={0}
                  max={100}
                  showHistogram={true}
                  title=""
                />

                <RefinementListFilter
                  id="gender-list"
                  title="Gender"
                  field="gender"
                  operator="OR"
                  size={2}
                />
              </SideBar>
              <LayoutResults>
                <ActionBar>

                  <ActionBarRow>
                    <HitsStats/>
                  </ActionBarRow>

                  <ActionBarRow>
                    <SelectedFilters/>
                    <ResetFilters/>
                  </ActionBarRow>

                </ActionBar>
                <Hits mod="sk-hits-grid" hitsPerPage={3} itemComponent={SearchResultItem}
                  />
                <NoHits/>

                <Pagination showNumbers={true}/>
              </LayoutResults>
            </LayoutBody>
          </Layout>
        </SearchkitProvider>
      </div>
    );
  }
}
