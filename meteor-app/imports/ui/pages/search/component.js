import React from 'react';
import PropTypes from 'prop-types';
import { Button, Appbar } from 'muicss/react';

import {
  SearchkitManager,
  SearchkitProvider,
  Pagination,
  SearchBox,
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
  Hits,
  NoHits,
} from 'searchkit';
import '/node_modules/searchkit/release/theme.css';


class SearchResultItem extends React.Component {
  render () {
    const {
      result: {
        _source: {
          modelName,
          creator,
          creationDate,
          status,
          rating,
          keywords,
          resultTypes,
          startDate,
          endDate,
          area,
          inputs,
        },
      },
    } = this.props;

    // const _index = this.props.result._index;
    // const _type = this.props.result._type;
    // const account_number = this.props.result._source.account_number;

    return (
        // <div style={{overflow: "auto"}}>
        <div className = "container">
          <div className= "result-container">
            <Appbar className="appbar">
              <div className="header">{modelName}</div>
              <div className="date">Run date: {creationDate}</div>
            </Appbar>
            <div className="column">
              <div className="column-item">
                <img src="http://www.openskope.org/wp-content/uploads/2016/02/ScreenShot001.bmp"></img>
              </div>
              <div className="column-item">
                <p><b>Creator:</b>{creator}</p>
                <p><b>Status:</b>{status}</p>
              </div>
              <div className="column-item">
                <p><b>Rating:</b>{rating}</p>
              </div>
            </div>
            <div className="button">
              <Button className="button-item" color="primary">View Data</Button>
              <Button className="button-item" color="primary">Download</Button>
              <Button className="button-item" color="primary">More Information</Button>
            </div>
          </div>
        </div>

    );
  }
}

export default class SearchPage extends React.Component {

  static propTypes = {
    // SearchKit Manager instance.
    searchkit: PropTypes.instanceOf(SearchkitManager),
  };

  render () {
    const {
      searchkit,
    } = this.props;

    return (
      <SearchkitProvider searchkit={searchkit}>
        <div className="page--search">
          <div className="page--search__sidepanel">
            <InputFilter
              id="lastname-input"
              title="Search by last name"
              placeholder="Appleseed"
              searchOnChange
              prefixQueryFields={['lastname']}
              queryFields={['lastname']}
            />
            <RefinementListFilter
              id="modelname-list"
              title="Model Name"
              field="modelName"
              operator="OR"
              orderKey="_term"
              orderDirection="asc"
              size={4}
            />
            {/*<NumericRefinementListFilter*/}
              {/*id="rating-refine"*/}
              {/*title="Rating Groups"*/}
              {/*field="rating"*/}
              {/*options={[*/}
                {/*{ title: 'All' },*/}
                {/*{ title: 'up to 1', from: 0, to: 1 },*/}
                {/*{ title: '1 to 2', from: 1, to: 2 },*/}
                {/*{ title: '2 to 3', from: 2, to: 3 },*/}
                {/*{ title: '3 to 4', from: 3, to: 4 },*/}
                {/*{ title: '4 to 5', from: 4, to: 5 },*/}
              {/*]}*/}
            {/*/>*/}
            <RefinementListFilter
                id="rating-list"
                title="Rating"
                field="rating"
                operator="OR"
                orderKey="_term"
                orderDirection="asc"
                size={5}
            />
            <RangeFilter
              field="rating"
              id="rating-range"
              min={0}
              max={10}
              showHistogram
              title=""
            />
            <RefinementListFilter
              id="resultTypes-list"
              title="Result Types"
              field="resultTypes"
              operator="OR"
              orderKey="_term"
              orderDirection="asc"
              size={5}
            />
            <RefinementListFilter
              id="inputs-list"
              title="Input"
              field="inputs"
              operator="OR"
              orderKey="_term"
              orderDirection="asc"
              size={4}
            />

          </div>

          <div className="page--search__searchpanel">

            <SearchBox
              autofocus
              searchOnChange
              prefixQueryFields={['actors^1', 'type^2', 'languages', 'title^10']}
            />

            <LayoutResults>
              <ActionBar>

                <ActionBarRow>
                  <HitsStats />
                </ActionBarRow>

                <ActionBarRow>
                  <SelectedFilters />
                  <ResetFilters />
                </ActionBarRow>

              </ActionBar>
              <Hits mod="sk-hits-grid" hitsPerPage={3} itemComponent={SearchResultItem} />
              <NoHits />

              <Pagination
                showNumbers
              />
            </LayoutResults>

          </div>
        </div>
      </SearchkitProvider>
    );
  }
}
