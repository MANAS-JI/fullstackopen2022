# Blog List App Back End (PostgreSQL)
My project for [Part 13](https://fullstackopen.com/en/part13) of Full Stack Open from the University of Helsinki. It is a recreation and extension of the back end [blog app](https://github.com/ruelneuman/full-stack-open/blob/master/README.md#part-7---react-router-custom-hooks-styling-apps-with-css-and-webpack) from Parts 4 and 7 using PostgreSQL and Sequelize instead of MongoDB and Mongoose.

The application is used for creating, reading, updating or deleting blog post and author data. Users can also create reading lists and mark blogs posts as read.

## How It's Made

**Tech used:** JavaScript, Node.js, Express, PostgreSQL, Sequelize

This RESTful backend is built using Express. Sequelize ORM is used to run SQL queries to a PostgreSQL database. Sequelize migrations are used to make database changes and to keep a log of those changes.

Complex data are returned using table joins, query strings to specify data subsets, and aggregate SQL functions to provide data summaries.

User authentication is accomplished using JSON web tokens. Tokens can also be blacklisted to prevent further use and users can be disabled entirely. 

## Lessons Learned
One of the main advantages of JSON web tokens is that they are stateless. Using a token blacklist (as I did) requires additional database queries for any protected routes to determine token validity. This eliminates the advantage of statelessness. If I reimplimented this back end I might consider using a refresh token in addion to a short-lived access token. The refresh token would permit the user to receive a new access token when the previous one expires. It would be possible to blacklist a refresh token if desired to prevent access as soon as the access token expires. This would provide a good solution for reducing the number of requests if blacklisting does not need to occur immediately and can wait until the short-lived access token expires.
