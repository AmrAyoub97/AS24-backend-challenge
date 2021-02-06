# Coding Challenge: AutoScout24 Listing Report

### Goal of this task
Support Needed Reports From Provided CSV files

### Tech Used
* [TypeScript](https://www.typescriptlang.org) - TypeScript extends JavaScript by adding types.
* [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
* [PostgreSQL](https://www.postgresql.org/) - PostgreSQL: The World's Most Advanced Open Source Relational Database.


### Requirments
* [Docker](https://www.docker.com/)
* API Test Tool, ex:([Postman](https://www.postman.com/))

### Installation
1. make sure that ```docker``` and ```docker-compose``` are installed on your machine.
2. Clone repository ```git clone https://github.com/AmrAyoub97/AS24-backend-challenge.git```
3. Open repo root folder ``` cd AS24-backend-challenge```
4. From CMD run ```docker-compose build```, This will build an image for our rails app.
5. From CMD run ```docker-compose up -d```, This will pull the required images and run them in docker containers.

### Docker Containers Used
* Express App
* PostgreSQL Database

### Upload CSV From Postman in ```form-data``` Requet Body Format
![alt text](https://github.com/AmrAyoub97/AS24-backend-challeng/blob/capture.png?raw=true)  
### API Description
| Action | Endpoint URL | Verb |
| ------ | ------------ | ---- | 
| Upload Listing CSV|/applications |POST|
| Upload Contacts CSV|/applications|POST|
| Report Average Listing Selling Price per Seller Type| /reports/average-listing-selling-price-per-seller-type |GET|
| Report Percentual distribution of available cars by Make| /reports/percentual-distribution-of-available-cars-by-make |GET|
| Report Average price of the 30% most contacted listings| /reports/average-price-of-the-30%-most-contacted-listings |GET|
| Report The Top 5 most contacted listings per Month| /reports/the-top-5-most-contacted-listings-per-month |GET|


