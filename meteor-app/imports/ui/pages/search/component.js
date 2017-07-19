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
        <div className="container">
          <Appbar className="title-item">
            <div className="header">PaleoCAR</div>
            <div className="date">Run date:</div>
          </Appbar>

          <div className="column" >
            <div className="column-item">
              <img src="http://www.openskope.org/wp-content/uploads/2016/02/ScreenShot001.bmp"></img>
            </div>

            <div className="column-item">
              <p><b>Lastname</b>:{lastname}</p>
              <p><b>Firstname</b>:{firstname}</p>
            </div>
            <div className="column-item">
              <p><b>Balance</b>:{balance}</p>
              <p><b>Address:</b>{address}</p>
              <p><b>Email:</b>{email}</p>
            </div>
          </div>

          <div className="button">
            <Button className="button-item" variant="flat" color="primary">View Data</Button>
            <Button className="button-item" variant="flat" color="primary" >More Information</Button>
            <Button className="button-item" variant="flat" color="primary">Download</Button>
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
              id="state-list"
              title="State"
              field="state"
              operator="OR"
              size={4}
            />
            <NumericRefinementListFilter
              id="age-refine"
              title="Age Groups"
              field="age"
              options={[
                { title: 'All' },
                { title: 'up to 20', from: 0, to: 21 },
                { title: '21 to 25', from: 21, to: 26 },
                { title: '26 to 30', from: 26, to: 31 },
                { title: '31 to 35', from: 31, to: 36 },
                { title: '36 to 40', from: 36, to: 41 },
              ]}
            />
            <RangeFilter
              field="age"
              id="age-range"
              min={0}
              max={100}
              showHistogram
              title=""
            />
            <RefinementListFilter
              id="gender-list"
              title="Gender"
              field="gender"
              operator="OR"
              size={2}
            />
            <RefinementListFilter
              id="city-list"
              title="City"
              field="city"
              operator="OR"
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
