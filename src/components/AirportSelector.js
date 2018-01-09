// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Autocomplete } from './';
import type { RootState, Airport } from '../state/state';
import * as actions from '../state/actions';
import { Row, Col } from 'react-flexbox-grid';

const mapStateToProps = (state: RootState) => {
    return {
        originAirports: state.airports.origin,
        destinationAirports: state.airports.destination,
        origin: state.filters.origin,
        destination:  state.filters.destination,
    };
};

class AirportSelector extends Component<{ originAirports?: Array<Airport>, destinationAirports?: Array<Airport>, origin?: Airport, destination?: Airport }
    , { originSearchTerm: String, destinationSearchTem: String }> {
    static defaultProps = {
        originAirports: [],
        destinationAirports: [],
        origin: null,
        destination: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            originSearchTerm: '',
            destinationSearchTem: '',
        };
    }

    onOriginChange = (searchTerm: String) => {
        this.setState({ originSearchTerm: searchTerm })

        const { destination, dispatch } = this.props;
        dispatch(actions.Airports.fetchOrigin(searchTerm, destination));

        // clear when no selection
        if (!searchTerm) {
            dispatch(actions.Filters.selectOrigin(null, destination));
        }
    };

    onOriginSelect = (code: String) => {
        const { originAirports, destination, dispatch } = this.props;

        const airport = originAirports.filter(a => a.code === code)[0];

        this.setState({ originSearchTerm: `${airport.code} - ${airport.city}` })
        dispatch(actions.Filters.selectOrigin(code, destination));
    };

    onDestinationChange = (searchTerm: String) => {
        this.setState({ destinationSearchTem: searchTerm })

        const { origin, dispatch } = this.props;
        dispatch(actions.Airports.fetchDestination(searchTerm, origin));

        // clear when no selection
        if (!searchTerm) {
            dispatch(actions.Filters.selectDestination(origin, null));
        }
    };

    onDestinationSelect = (code: String) => {
        const { destinationAirports, origin, dispatch } = this.props;

        const airport = destinationAirports.filter(a => a.code === code)[0];

        this.setState({ destinationSearchTem: `${airport.code} - ${airport.city}` })
        dispatch(actions.Filters.selectDestination(origin, code));
    };

    getHighlightedText(text, highlight) {
        let parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return <span> { parts.map((part, i) =>
            <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold', color: '#E93E6B' } : {} }>
            { part }
        </span>)
        } </span>;
    };

    render() {
        const { originSearchTerm, destinationSearchTem } = this.state;
        const { originAirports, destinationAirports } = this.props;

        return (
            <Row start="xs">
                <Col xs>
                    <Autocomplete
                        getItemValue={(item) => item.code}
                        items={originAirports}
                        renderItem={(item, isHighlighted) =>
                            <div key={item.code} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                {this.getHighlightedText(`${item.code} - ${item.city}`, originSearchTerm)};
                            </div>
                        }
                        value={originSearchTerm}
                        onChange={(e) => this.onOriginChange(e.target.value, 'origin')}
                        onSelect={(value) => this.onOriginSelect(value, 'destination')}
                        inputProps={{ placeholder: 'From – City or Airport' }}
                        menuStyle={autocompleteStyle}
                    />
                    <Autocomplete
                        getItemValue={(item) => item.code}
                        items={destinationAirports}
                        renderItem={(item, isHighlighted) =>
                            <div key={item.code} style={{ textAlign: 'left', background: isHighlighted ? '#F4F7F9' : 'white' }}>
                                {this.getHighlightedText(`${item.code} - ${item.city}`, destinationSearchTem)};
                            </div>
                        }
                        value={destinationSearchTem}
                        onChange={(e) => this.onDestinationChange(e.target.value, 'destination')}
                        onSelect={(value) => this.onDestinationSelect(value, 'destination')}
                        inputProps={{ placeholder: 'To – City or Airport' }}
                        menuStyle={autocompleteStyle}
                    />
                </Col>
            </Row>
        );
    }
}

const autocompleteStyle = {
    borderRadius: '3px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '2px 0',
    fontSize: '90%',
    position: 'fixed',
    overflow: 'auto',
    maxHeight: '50%',
    zIndex: 9999,
};

export default connect(mapStateToProps)(AirportSelector);
