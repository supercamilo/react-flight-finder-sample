# FlightSearch

## Running the app
    cd dist/
    python -m SimpleHTTPServer

Now point your browser to http://localhost:8000/index.html.

This is also how we will be testing your app, so please put all the files necessary for the app to run in `dist`.

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
