#!/bin/bash

## Load demo data
curl -X "POST" "http://localhost:9200/skope/model/_bulk?pretty&refresh" \
     -H "Content-Type: application/json" \
     -u elastic:changeme \
     -d $'{"index":{}}
{ "modelName": "FedData", "creator": "System", "creationDate": "2017-06-24T23:41:19.056Z", "status": "Published", "rating": 5, "keywords": [ "Climate" ] }
{"index":{}}
{ "modelName": "PRISM", "creator": "System", "creationDate": "2017-06-23T23:41:19.056Z", "status": "Published", "rating": 5, "keywords": [ "Climate" ] }
{"index":{}}
{ "modelName": "NED", "creator": "System", "creationDate": "2017-07-10T23:41:19.056Z", "status": "Published", "rating": 5, "keywords": [ "Elevation" ] }
{"index":{}}
{ "modelName": "PaleoCAR", "creator": "Kyle", "creationDate": "2017-07-13T23:41:19.056Z", "status": "Published", "rating": 5, "keywords": [], "resultTypes": [ "GDD", "MAP", "PGS" ], "startDate": "2017-07-25T23:41:19.056Z", "endDate": "2017-07-25T23:41:19.056Z", "area": null, "inputs": [ "PRISM", "FedData", "NED" ] }
{"index":{}}
{ "modelName": "PaleoCAR", "creator": "Kyle", "creationDate": "2017-08-03T23:41:19.056Z", "status": "Published", "rating": 3, "keywords": [], "resultTypes": [ "GDD", "MAP", "PGS" ], "startDate": "2017-07-28T23:41:19.056Z", "endDate": "2017-07-28T23:41:19.056Z", "area": null, "inputs": [ "PRISM", "FedData", "NED" ] }
{"index":{}}
{ "modelName": "PaleoCAR", "creator": "Hao", "creationDate": "2017-09-05T23:41:19.056Z", "status": "Reviewed", "rating": 1, "keywords": [], "resultTypes": [ "GDD", "MAP", "PGS" ], "startDate": "2017-08-04T23:41:19.056Z", "endDate": "2017-08-04T23:41:19.056Z", "area": null, "inputs": [ "PRISM", "FedData", "NED" ] }
{"index":{}}
{ "modelName": "Model 2", "creator": "Jeff", "creationDate": "2017-06-04T23:41:19.056Z", "status": "Reviewed", "rating": 3, "keywords": [], "resultTypes": [ "MAP", "MAXTEMP", "MINTEMP" ], "startDate": "2017-05-30T23:41:19.056Z", "endDate": "2017-05-30T23:41:19.056Z", "area": null, "inputs": [ "NED", "FedData" ] }
{"index":{}}
{ "modelName": "Model 2", "creator": "Adam", "creationDate": "2017-10-10T23:41:19.056Z", "status": "Complete", "rating": 3, "keywords": [], "resultTypes": [ "MAP", "MAXTEMP", "MINTEMP" ], "startDate": "2017-10-08T23:41:19.056Z", "endDate": "2017-10-08T23:41:19.056Z", "area": null, "inputs": [ "NED", "FedData" ] }
{"index":{}}
{ "modelName": "Model 3", "creator": "Adam", "creationDate": "2017-10-10T23:41:19.056Z", "status": "Complete", "rating": 2, "keywords": [], "resultTypes": [ "Yield" ], "startDate": "2017-10-08T23:41:19.056Z", "endDate": "2017-10-08T23:41:19.056Z", "area": null, "inputs": [ "GDD", "PGS" ] }
{"index":{}}
{ "modelName": "Model 3", "creator": "Bertrum", "creationDate": "2017-10-10T23:41:19.056Z", "status": "Running", "rating": 5, "keywords": [], "resultTypes": [ "Yield" ], "startDate": "2017-10-09T23:41:19.056Z", "endDate": null, "area": null, "inputs": [ "GDD", "PGS" ] }
{"index":{}}
{ "modelName": "Model 3", "creator": "Jeff", "creationDate": "2017-08-01T23:41:19.056Z", "status": "Queued", "rating": 4, "keywords": [], "resultTypes": [ "Yield" ], "startDate": null, "endDate": null, "area": null, "inputs": [ "GDD", "PGS" ] }
'