# X-MERN APP

## Abstract
This is a project created by 5 students of Electrical and Computer Engineering in National Technical University of Athens in terms of course "Software Engineering". The application uses energy consuming data in Europe that are provided as Open Data from <href>https://transparency.entsoe.eu/. These data are crucial and we implented an application that use,visualize and analyze these data.
The pilot runs with 3 datasets:
  * Actual Total Load Data: The real energy that was consumed in a certain daytime and country.
  * Day Ahead Total Load Forecast Data: The forecast for the energy to be consumed in a certain daytime and country.
  * Aggregated Generation Per Type: The real energy that was consumed grouped by the way of production.
 
## About the App

The application was built in Master-Slave Architecture. That means that we have a server with the data and we can access them via clients. In our project we use a ReST API server so as to have different clients as Browser, Mobile App or a CLI App. Also data are provided only to the signed members of the system.
