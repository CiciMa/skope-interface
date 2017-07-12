import React from "react";
import PropTypes from "prop-types";
import renderComponent from ""

import {
    SearchkitManager,
    SearchkitProvider,
    Layout,
    Toggle,
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
    HitItemProps,
    NoHits,
    Panel,
    TermQuery,
    BoolMust,
    RangeQuery,
    GroupedSelectedFilters,
    ViewSwitcherHits,
    RangeFilter,
    CheckboxFilter,
    RangeAccessor
} from "searchkit";
import "searchkit/release/theme.css";


const searchkit = new SearchkitManager(
    "http://demo.searchkit.co/api/movies/"
);

// const NewCheckboxItemComponent = (props)=> {
//     let count = props.count*10
//     return <CheckboxItemComponent {...props} count={count}/>
// }

export class NewRangeFilter extends RangeFilter {
    static propTypes = {
        startYearL:PropTypes.string.isRequired,
        endYearL:PropTypes.string.isRequired,

    };

    constructor(props) {
        super(props);
    }

    defineAccessor() {
        const { startYearL, endYearL } = this.props;
        return new RangeAccessor(id,{
            startYearL, endYearL
        });
    }
    render() {

    }
}


const App = ()=> (
    <SearchkitProvider searchkit={searchkit}>
      <Layout>

        <LayoutBody>
          <SideBar>
              <Panel title="Models" collapsable={true} defaultCollapsed={false}>
              <CheckboxFilter
                  id="rated-r"
                  title="Rating"
                  label="Rated R"
                  filter={TermQuery("rated.raw", 'R')} />
              </Panel>
            <Panel title="Data Type" collapsable={true} defaultCollapsed={false}>
              <CheckboxFilter
                  id="recent"
                  title="Date"
                  label="Recent"
                  filter={RangeQuery("year", {gt: 2012})} />

            </Panel>
            <Panel title="Data Source" collapsable={true} defaultCollapsed={false}>
              <CheckboxFilter
                  id="old-movies"
                  title="Movie filter"
                  label="Old movies"
                  filter={RangeQuery("year", {lt: 1970})} />
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
                min={0}
                max={100}
                showHistogram={true}
                title="Year Range"
                startYearL = "Start Year"
                endYearL = "End Year"

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

            <Hits
                mod="sk-hits-list"
                hitsPerPage={3}
                itemComponent={MovieHitsListItem}
                sourceFilter={["title", "poster", "imdbId"]}/>
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