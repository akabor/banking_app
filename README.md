# <a href="https://amelia-kabor-fullstackbank.herokuapp.com/">Bank of Amelia </a>

## Project Description

This full stack banking application was created using MongoDB, Express, React, Node, Google Cloud Platform, and Firebase. Users are able to create accounts through firebase authentication, log in to their accounts, and deposit and/or withdraw funds from their account. Start by creating an account, then login to your account to access the deposit, withdraw, and account information features.

The program validates user entries in multiple ways including, but not limited to, ensuring password minimum length is met upon creation and funds in account are sufficient for withraw amount requested.

## Installation

Download all files to the same location on your computer. Navigate to the folder location in your terminal and install all dependencies. Create a firebase app and replace the information in the fire.js file (located under bank-frontend/src/Components) with your information. Replace the auth.js file with your firebase service account information. Create a MongoDB instance and update the URL in line 2 of dal.js. Alternatively, hook up a different datastore and update the functions in the data abstraction layer file (dal.js). Navigate inside the bank-frontend folder and run 'npm run build' - this will create a production ready build folder that is required by express to serve the files. Alternatively, reconfigure the server in the index.js file to serve static files from a different location. Once this step is completed, navigate to the parent folder and start program by running 'npm start' in terminal. The program should now be running on port 4000.

## Roadmap

Future updates to this program will include updating displayed number format, automatic rerouting to login page once account is created, hidden nav bar items if user is not logged in (i.e. withdraw and deposit), and combining the withdraw and deposit components into a single transaction component.

## License Information

Please read all information located in the LICENSE file in this repository.
