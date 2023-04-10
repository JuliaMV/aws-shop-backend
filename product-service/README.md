# Serverless - AWS Node.js Typescript

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `(v.16.13.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS

### Using Yarn

- Run `yarn` to install the project dependencies
- Run `yarn sls deploy` to deploy this stack to AWS

# Resouces

## Endpoints:

GET - https://lpps6lnric.execute-api.us-east-1.amazonaws.com/dev/products
GET - https://lpps6lnric.execute-api.us-east-1.amazonaws.com/dev/products/{id}
POST - https://lpps6lnric.execute-api.us-east-1.amazonaws.com/dev/products

All endpoints are intergeted with UI https://d2ybabzqbtwgmh.cloudfront.net/

## Functions:

getProductsList: product-service-dev-getProductsList
getProductsById: product-service-dev-getProductsById
createProduct: product-service-dev-createProduct
