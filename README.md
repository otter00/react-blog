# The diploma project blog platform for book reviews

Front End application performed to make it easier to communicate with users by sharing your mind about literature and possibly something else which can be appropriate to personal blog platform. 

Sign-up/sign-in opportunity implemented with access rights check in order to provide admin/non-admin account permissions 

## Technologies used
* Axios to simplify requests
* React-router-dom v.6 to set up routing between pages
* Sass/Scss (CSS preprocessrs)
* React-query to move requests as a separate file (useQueries.js)
* Antd library for forms and pages styles
* Mui library for icons/btns/etc.
* BEM convention
* Custom react hooks (useAuth to check whether the user is authorized)

## Setup the project

1. To install the project dependencies use:
`npm install` or `yarn install` (depends on package used)

2. In the project directory, you can run:
`npm start` or `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## CSS preprocessor

This project implements SASS via node-sass, as per the suggestion of Create React App's documentation.

The styles for each component are therefore located in their corresponding <component_name>+Style.scss file.

## BEM convention

The components try to follow a BEM naming convention (Block Element Modifier). Hence, you can leverage the & (ampersand) operator in SASS to reference the parent component in a concise way.

## Deployment

The `auth-branch` is the main branch

To be continued...