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
} from "searchkit";
import "searchkit/release/theme.css";

const searchkit = new SearchkitManager("http://demo.searchkit.co/api/movies/");

const App = ()=> (
  <SearchkitProvider searchkit={searchkit}>
    <Layout>
      <TopBar>
        <SearchBox
          autofocus={true}
          searchOnChange={true}
          prefixQueryFields={["actors^1","type^2","languages","title^10"]}
          placeholder={"Keyword Search"}
          />
      </TopBar>

      <LayoutBody>
        <SideBar>
        <Panel title="Categories" collapsable={true} defaultCollapsed={false}>
        <HierarchicalMenuFilter
        fields={["type.raw", "genres.raw"]}
    //  title="Categories"
        id="categories"/>
        </Panel>
          <Panel title="Actors" collapsable={true} defaultCollapsed={false}>
          <RefinementListFilter
            id="actors"
            // title="Actors"
            field="actors.raw"
            operator="AND"
            size={10}/>
            </Panel>
            <Panel title="Countries" collapsable={true} defaultCollapsed={false}>
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
            <InputFilter
            id="author_q"
            title="Time range"
            placeholder="start date"
            searchOnChange={true}
            prefixQueryFields={["actors"]}
            queryFields={["actors"]}
            />
            <InputFilter
            id="author_q"
            // title=""
            placeholder="end date"
            searchOnChange={true}
            prefixQueryFields={["actors"]}
            queryFields={["actors"]}
            />
            <Panel title="Selected filters" collapsable={true} defaultCollapsed={false}>
            <GroupedSelectedFilters/>
            </Panel>
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
          <Pagination showNumbers={true}/>
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
      searchString,
      searchPending,
      searchResults,
      dataFilters,

      results = [],
    } = this.props;

    return (
      <div className="page--search">
        <App />
      </div>
    );
  }
}
