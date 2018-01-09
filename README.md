# FlightSearch

## Running the app
    cd dist/
    python -m SimpleHTTPServer

Now point your browser to http://localhost:8000/index.html.

To run in development mode:

    npm run start

## Implementation details

This project was developed on deployed using [create-react-app](https://github.com/facebookincubator/create-react-app)

The following tools were used:

* [ESLint](https://eslint.org/docs/user-guide/getting-started): Suggests a coding style to keep it clean.
* [Flow](https://flow.org/en/docs/react/): Static type checker to identify bugs at development time.
* [Redux](https://redux.js.org/docs/introduction/): State management.
* [React Redux](https://github.com/reactjs/react-redux): Connect React components with Redux in a High Order Component style.
* [Redux Thunk](https://github.com/gaearon/redux-thunk): Middleware to allow dispatching actions without passing redux all the way down the component tree.
* [D3 Fetch](https://github.com/d3/d3-fetch):  Convenient CSV parsing on top of Fetch to handle the sample data.
* [React Autocomplete](https://github.com/reactjs/react-autocomplete):  Autocomplete component for airport selectors.
* [React Flexbox Grid](https://github.com/roylee0704/react-flexbox-grid): Wrapper components for layout with CSS's flexbox.

## TODO

* Unit tests.
* Implement logic to handle flights ending the next day. This currently triggers some display and sorting issues on the `FlightChart` component.
* Enhance the `FlightChart` component using an advanced Gantt chart component.
* Render `FlightDetails` component on hover only for each row
* Display the time scale dynamically (according to the flights on screen)
* In the results table, show both the timetable duration of the flight and the average duration calculated from historical data.
* When showing results in the autocomplete, make the matching fragment stand out.
* In the timescale above the results, display times both in the origin and destination timezones.
* Make the airport/cities autocomplete tolerate typos (eg. typing “Nwe York” should return results for New York).
* Allow the user to parametrize your timeliness algorithms – for example, putting more weight on cancellations.
* Instant resorting of results may be confusing for the user. Make clicking a button sort the results in a visual way (animate the reshuffling of the results).
* Present more statistics: include not only the average but also the median delay.

## Data

Uncompress the data:

    tar -xzf data.tar.gz

Now you should have a `data` directory with one file, `2015-AA-UA-DL-flights.csv`.

`2015-AA-UA-DL-flights.csv` contains a row for every American Airlines, United Airlines or Delta flight in the US in 2015. It has the following columns:

- `FL_DATE` flight date, in YYYY-MM-DD format.
- `UNIQUE_CARRIER` carrier code
- `FL_NUM` flight number
- `ORIGIN` origin airport code
- `ORIGIN_CITY_NAME` origin city name
- `ORIGIN_STATE_ABR` origin state 2 letter code
- `DEST` destination (airport code)
- `DEST_CITY_NAME` destination city name
- `DEST_STATE_ABR` destination state 2 letter code
- `CRS_DEP_TIME` CRS departure time
- `DEP_TIME` actual departure time
- `DEP_DELAY` departure delay
- `CRS_ARR_TIME` CRS arrival time
- `ARR_TIME` actual arrival time
- `ARR_DELAY` arrival delay in minutes
- `CANCELLED` cancellation status (0 not cancelled, 1 cancelled)
- `DIVERTED` diversion status (0 for not diverted, 1 for diverted)
- `CRS_ELAPSED_TIME` CRS elapsed time in minutes
- `ACTUAL_ELAPSED_TIME` actual elapsed time in minutes
- `DISTANCE` distance in miles
- `CARRIER_DELAY` carrier delay, in minutes
- `WEATHER_DELAY` weather delay, in minutes
- `NAS_DELAY` National Air System delay, in minutes		
- `SECURITY_DELAY` security delay, in minutes.
- `LATE_AIRCRAFT_DELAY` late aircraft delay, in minutes.

`CRS` in field names means _computer reservation system_, and it refers to the timetable times. All times are *local*. The format is military time with leading zeros missing (so `1` means `00:01` – one minute after midnight).
