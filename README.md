# [Find Smithy](https://find-smithy.herokuapp.com/)


Find Smithy is an application that brings the community together. Not sure if that Nintendo Switch is still available at the local Walmart? Add what you want to our communal list and allow the crowd sourcing to do its magic.

What's to come - A system to reward points for those who contribute more.

## Getting Started

Follow these instructions to see the project up and running on your local machine for development and testing purposes. See the live version of the project [Find Smithy](https://find-smithy.herokuapp.com/) hosted on Heroku.

### Prerequisites

Things you need to before installing.


1. Create a secret.js file within the folder server/config.
2. Setup a [google developers api](https://console.developers.google.com/api)
3. Add the origin URI: http://localhost:8080 & http://localhost:5000
4. Add the redirect URI: http://localhost:8080/api/auth/google/callback & http://localhost:5000/auth/google/callback
5. Add the Client ID & the Client secret to the secret.js file.
6. Set up mongo database on mlab.
7. Store the MONGO_URI inside the secret.js file.


### Installing & Initializing

Follow step by step for installation in the command line.

1. In the root folder of the project ```npm install  ```
2. In the root folder of the project run ```npm run dev```
3. In the server folder, run ```npm run socket```


## Built With

* [JavaScript](https://stackoverflow.com/questions/tagged/javascript) - The web framework used
* [React](https://reactjs.org/) - Front End
* [Redux](http://redux.js.org/) - Front End
* [Node.js](https://nodejs.org/en/docs/) - Back End
* [MongoDB](https://docs.mongodb.com/) - Database
* [Socket.io](https://socket.io/docs/) - Communications client & server
* [Passport.js](http://passportjs.org/docs) - Authentication
* [Heroku](https://www.heroku.com//) - Host


## Versioning

We use [GitHub](https://github.com/) for versioning. For the versions available, see the [repository](https://github.com/joncancode/final_cap). 

## Authors

* **Jonathan Haines** - [joncancode](https://github.com/joncancode)
* **David Dinnison** - [daviddinnison](https://github.com/daviddinnison)
* **Daniel Kato** - [dankato](https://github.com/dankato)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

Special thanks to our mentor [Mark Learst](https://github.com/ipaintcode)
