# covid-19-api

Covid 19 api for Portugal data served directly from [https://github.com/dssg-pt/covid19pt-data](https://github.com/dssg-pt/covid19pt-data) as a rest API.

## Available Endpoints

- [x] Data - The main data about new covid19 cases.

This api is only for reading data, therefore it only supports `GET` requests.

- Get all historic data: `'/api/v1/data'`
- Get the last data entry: `'/api/v1/data/last`
- Get data for the last X days `/api/v1/data/last/:days` (ex: /api/v1/data/last/3 will return the data for the last 3 days.)
- Get the data update, this will try to see how much numbers have increased/decreased over the last 2 days `/api/v1/data/update`

## To be implemented

- [] Vaccines
- [] Data by county

---

[LICENSE - GNU GENERAL PUBLIC LICENSE](LICENSE)
