# Dtrade

A stock trade simulation program. With this applciaton the user can gain knowledge and practice trading stock on Dtrade before starting an investment with real money. It allows the user to buy and sell stocks on credit rather than money on real prices. This application will give a chance to learn how stocks work and the risks involved in investment. The purpose of the application is to serve the users who are new to stock investment and looking for a platform to gain some experience without the risk of losing any real money. The application gives a chance to the user to start investment and practice trading with real-time stock prices and makes sure that the users know what they are doing before they start investing. 

* *Date Created*: 2022/05/01
* *Last Modification Date*: 2022/07/20
* *Backend Git URL*: https://git.cs.dal.ca/ugandhi/dtradeapi
* *Frontend Git URL*: https://git.cs.dal.ca/qsun/csci5709-group23
* *Deploy URL*: https://app-dtrade.herokuapp.com/

## Authors

* [Udit Gandhi](udit.gandhi@dal.ca ) - *developer*
* [Dharmik Soni](dharmaysureja@dal.ca ) - *developer*
* [Sampada Thakkar](email@dal.ca) - *developer*
* [Sanika Tamhankar](email@dal.ca) - *developer*
* [Qiwei Sun](email@dal.ca) - *developer*
* [Prakrut Suthar](email@dal.ca) - *developer*
* [Dharmay Sureja](email@dal.ca) - *developer*



## Getting Started

Get frontend source code to local <br />
git clone https://git.cs.dal.ca/qsun/csci5709-group23.git<br />
get backend source code to local<br />
git clone https://git.cs.dal.ca/ugandhi/dtradeapi.git


### Prerequisites

To have a local copy of this project up and running on your local machine, you will first need to install the following software / libraries / plug-ins

Back end libraries
```
    "compression": "^1.7.4",
    "concurrently": "^7.2.2",
    "cors": "^2.8.5",
    "dotenv": "^16.0.1",
    "envalid": "^7.3.1",
    "express": "^4.18.1",
    "googleapis": "^105.0.0",
    "helmet": "^5.1.0",
    "joi": "^17.6.0",
    "module-alias": "^2.2.2",
    "mongodb": "^4.7.0",
    "mongoose": "^6.4.1",
    "mongoose-unique-validator": "^3.1.0",
    "morgan": "^1.10.0",
    "nodemailer": "^6.7.7",
    "nodemon": "^2.0.18",
    "random-number": "^0.0.9"
    "@types/compression": "^1.7.2",
    "@types/express": "^4.17.13",
    "@types/morgan": "^1.9.3",
    "@types/node": "^18.0.0",
    "@typescript-eslint/eslint-plugin": "^5.30.0",
    "@typescript-eslint/parser": "^5.30.0",
    "eslint": "^8.18.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "^4.2.1",
    "prettier": "^2.7.1",
    "tsc-watch": "^5.0.3",
    "typescript": "^4.7.4"

```


Frontend
```
    "@date-io/date-fns": "^2.14.0",
    "@emotion/react": "^11.9.0",
    "@emotion/styled": "^11.8.1",
    "@material-ui/core": "^4.12.4",
    "@mui/icons-material": "^5.8.3",
    "@mui/lab": "^5.0.0-alpha.85",
    "@mui/material": "^5.8.1",
    "@mui/styled-engine-sc": "^5.8.0",
    "@mui/system": "^5.8.1",
    "@mui/x-data-grid": "^5.11.1",
    "@mui/x-date-pickers": "^5.0.0-alpha.6",
    "@splidejs/react-splide": "^0.7.7",
    "@types/date-fns": "^2.6.0",
    "@types/node": "^16.11.36",
    "@types/react-dom": "^18.0.5",
    "@types/styled-components": "^5.1.25",
    "axios": "^0.27.2",
    "bcryptjs": "^2.4.3",
    "bootstrap": "^5.1.3",
    "chart.js": "^3.8.0",
    "d3": "^7.4.4",
    "date-fns": "^2.28.0",
    "express": "^4.18.1",
    "framer-motion": "^6.3.5",
    "json-2-csv": "^3.17.1",
    "npm": "^8.11.0",
    "react": "^18.1.0",
    "react-bootstrap": "^2.4.0",
    "react-chartjs-2": "^4.2.0",
    "react-csv": "^2.2.2",
    "react-dom": "^18.1.0",
    "react-fast-marquee": "^1.3.2",
    "react-grid-system": "^8.1.5",
    "react-modal": "^3.15.1",
    "react-redux": "^8.0.2",
    "react-router-dom": "^6.3.0",
    "react-scripts": "5.0.1",
    "react-simple-chatbot": "^0.6.1",
    "react-toastify": "^9.0.4",
    "react-tooltip": "^4.2.21",
    "reactjs-popup": "^2.0.5",
    "styled-components": "^5.3.5",
    "typescript": "^4.6.4"


```

See the following section for detailed step-by-step instructions on how to install this software / libraries / plug-ins

### Installing

A step by step series of examples that tell you how to get a development env running

```
1. Install node js
2. Verify installation by running node -v and npm -v on the terminal.
3. npm install
4. npm start
```
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3100] to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

###Code Integration
Buying and selling a stock is dependedent on the user profile module. If a user has credits then only he can buy stocks. Also, when the user buys a stock, credits gets deducted from the user. If the user credits are not enough, he/she wont be able to buy a stock. When the user sells a stock, the amount at that time for that stock gets credited to the user account.

### Deployment
We have hosted our application on the Heroku Platform. We have first build our react application using the npm run build command. Then on the backend express server we have served the link to our static application that we have built using the npm run build command. Once we have successfully tested our application locally we have finally hosted the application on Heroku platform.

```
1. Create a heroku account and create a empty applciaton
2. In terminal run "heroku login"
3. Enter local project folder run following command to initialize git
    $ cd my-project/
    $ git init
    $ heroku git:remote -a test-qiwei
4. commite your changes and deploy to heroku
    $ git add .
    $ git commit -am "make it better"
    $ git push heroku master
```
## Sources used

- Compression - https://www.npmjs.com/package/compression
- Concurrently - https://www.npmjs.com/package/concurrently
- Cors - https://www.npmjs.com/package/cors
- DotEnv - https://www.npmjs.com/package/dotenv
- Envalid - https://www.npmjs.com/package/envalid
- Express - https://www.npmjs.com/package/express
- Helmet - https://www.npmjs.com/package/helmet
- Joi - https://www.npmjs.com/package/joi
- Module-alias - https://www.npmjs.com/package/module-alias
- MongoDB - https://www.npmjs.com/package/mongodb
- Mongoose - https://www.npmjs.com/package/mongoose
- Mongoose-unique-validator - https://www.npmjs.com/package/mongoose-unique-validator
- Morgan - https://www.npmjs.com/package/morgan
- Nodemon - https://www.npmjs.com/search?q=nodemon
- Random-number -https://www.npmjs.com/package/random-number


## Built With

* [React] (https://reactjs.org/) - Frontend framework
* [Heroku] (https://dashboard.heroku.com/login) - Cloud platform to deploy application
* [Express] (https://expressjs.com/) - Web framework for Nodejs
* [Postman] (https://www.postman.com/) - API testing software
* [MongoCompass] - Tool used to check the collections and data on the database
* [MongoDB] (https://www.mongodb.com/) - NoSQL Database for data storage
* [NPM] (https://www.npmjs.com/) - Nodejs package manager
* [Nodejs] (https://nodejs.org/en/) - Backend Javascript Runtime
* [VSCode] (https://code.visualstudio.com/) - IDE used for development
* [Gitlab] (https://git.cs.dal.ca/) - Repository and version control system
* [MicrosoftEdge] (https://www.google.com/intl/en_ca/chrome/) - Browser of choice for testing frontend changes


## Acknowledgments

* [MUI](https://mui.com/material-ui/) - Frontend UI components
* [Cacco.com]( https://cacoo.com ) - Flow chart
* [ Xtensio.com ](https://xtensio.com/user-persona-template/) - User Personal
* [Draw.io](https://app.diagrams.net/) - Wireframe tools
* [Wireframe.Cc](https://wireframe.cc/) - Wireframe
* [Balsamiq Wireframes]( https://balsamiq.com/wireframes/?gclid=Cj0KCQjw1tGUBhDXARIsAIJx01lmbtHc9AJC4JTWw46YYzyqkKjO6rhmUBz9xHxAZ7dzOHVfhoNZdB4aAkHBEALw_wcB.) - Wireframe
* [Stock screener]( https://www.nasdaq.com/market-activity/stocks/screener) - UI reference
* [Stock analytics](https://dribbble.com/search/stock-analytics) - UI reference 

## References

- [1] “How to pass multiple state through link in ReactJS,” Stack Overflow. [Online]. Available: https://stackoverflow.com/questions/47484406/how-to-pass-multiple-state-through-link-in-reactjs. [Accessed: 08-Jun-2022].

- [2] S. Hall, “Implementing a search bar feature in React - Sam hall,” Medium, 25-Mar-2021. [Online]. Available: https://samhalll.medium.com/implementing-a-search-bar-feature-in-react-10739d594f79. [Accessed: 08-Jun-2022].

- [3] G. Singhal, “How to router redirect after Login,” Pluralsight.com. [Online]. Available: https://www.pluralsight.com/guides/how-to-router-redirect-after-login. [Accessed: 09-Jun-2022].

- [4] “Data grid,” Mui.com. [Online]. Available: https://mui.com/x/react-data-grid/. [Accessed: 09-Jun-2022].

- [5] “How to display image in a @mui/x-data-grid table?,” Stack Overflow. [Online]. Available: https://stackoverflow.com/questions/70449488/how-to-display-image-in-a-mui-x-data-grid-table. [Accessed: 10-Jun-2022].

- [6] Programming with Mosh, “How to build a REST API with Node js & Express,” 08-Mar-2018. [Online]. Available: https://www.youtube.com/watch?v=pKd0Rpw7O48. [Accessed: 10-Jul-2022].

- [7] “Express basic routing,” Expressjs.com. [Online]. Available: https://expressjs.com/en/starter/basic-routing.html. [Accessed: 10-Jul-2022].

- [8] D. Landup, “Building a REST API with Node and express,” Stack Abuse, 14-Oct-2019. [Online]. Available: https://stackabuse.com/building-a-rest-api-with-node-and-express/. [Accessed: 11-Jul-2022].
    
