CS-546 Lab 5
JSON Routes
For this lab, you will create a simple server that will provide data from an API.

For this lab, you will not need to use a database. 

For this lab, you must use the async/await keywords (not Promises). You will also be using axios (Links to an external site.), which is a HTTP client for Node.js; you can install it with npm i axios. You will use it just as you did in lab 3.

Network JSON Data
You will be downloading JSON files from the following GitHub Gists:

people.json (Links to an external site.) (Links to an external site.)
stocks.json (Links to an external site.)
Your routes
/people

When making a GET request to http://localhost:3000/people, this route will return the JSON data that is returned from the axios call to the URL endpoint. You will use people.json for the list of people. You MUST return the data in JSON format.  

/stocks

When making a GET request to http://localhost:3000/stocks, this route will return the JSON data that is returned from the axios call to the URL endpoint. You will use stocks.json for the list of stocks. You MUST return the data in JSON format. 

/people/:id

When making a GET request to http://localhost:3000/people/:id, this route will return the JSON data. You will use people.json Where :idis the parameter that is passed to the route: http://localhost:3000/people/4c570a2a-5f3d-4309-b81c-2f6b36965ecc  This endpoint returns a JSON object that has all the details for the person with that with the supplied :id If the ID cannot be found in the Data(i.e. there is no person with that ID), or if the URL parameter is any other data type besides a valid string, you will throw an error. You MUST return the data in JSON format.  

 

/stocks/:id

When making a GET request to http://localhost:3000/stocks/:id, this route will return the JSON data that is returned from the axios call to the URL endpoint. You will use stocks.json Where :idis the parameter that is passed to the route: http://localhost:3000/stocks/929686a2-dd3a-42c7-a88d-b170e2590252  This endpoint returns a JSON object that has all the details for the stock with that with the supplied :id If the ID cannot be found in the Data(i.e. there is no stock with that ID), or if the URL parameter is any other data type besides a valid string, you will throw an error. You MUST return the data in JSON format.  

Packages you will use:
You will use the express package as your server.

You will use the axios package to get data from the API.

You can read up on express (Links to an external site.) on its home page. Specifically, you may find the API Guide section on requests (Links to an external site.) useful.

You may use the lecture 5 code (Links to an external site.) as a guide.

You must save all dependencies to your package.json file

Requirements
You must not submit your node_modules folder
You must remember to save your dependencies to your package.json folder
You must remember to update your package.json file to set app.js as your starting script!
You must submit a zip archive or you will lose points, named in the following format: LastName_FirstName_CS546_SECTION.zip. You will lose points for not submitting an archive named this way.