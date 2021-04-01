# covid-19-api

Covid 19 api for Portugal data served directly from [https://github.com/dssg-pt/covid19pt-data](https://github.com/dssg-pt/covid19pt-data) as a rest API.

*This api is only for reading data, therefore it only supports `GET` requests.*

## Available Endpoints

- [x] Data - The main data about new covid19 cases.
- [ ] Vaccines
- [ ] Data by county

## /data

- Get all historic data:
  - [https://covid-19-data.azurewebsites.net/api/v1/data](https://covid-19-data.azurewebsites.net/api/v1/data)
- Get the last data entry:
  - [https://covid-19-data.azurewebsites.net/api/v1/data/last](https://covid-19-data.azurewebsites.net/api/v1/data/last)
- Get data for the last X days (ex: `/api/v1/data/last/3` will return the data for the last 3 days.)
  - [https://covid-19-data.azurewebsites.net/api/v1/data/last/:days](https://covid-19-data.azurewebsites.net/api/v1/data/last/:days)
- Get the data update, this will try to see how much numbers have increased/decreased over the last 2 days
  - [https://covid-19-data.azurewebsites.net/api/v1/data/update](https://covid-19-data.azurewebsites.net/api/v1/data/update)

## /vaccines


## /county

---

[LICENSE - GNU GENERAL PUBLIC LICENSE](LICENSE)
