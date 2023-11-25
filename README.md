# Social Network API
![License Badge](https://img.shields.io/badge/License-MIT-yellow.svg)  


## Description 
[Video demo](https://drive.google.com/file/d/1k8T5vel8UAW7hQ9J-xrfid0w1qpxo8jf/view)

This project was to build an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list.

It uses Express.js for routing, a MongoDB database, and the Mongoose ODM. 


## Technology Used 

| Technology Used         | Resource URL           | 
| ------------- |-------------| 
| JavaScript    | [https://developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) | 
| node.js    | [https://nodejs.org/en](https://nodejs.org/en) | 
| Express.js    | [https://expressjs.com/](https://expressjs.com/) |  
| Mongoose | [https://www.npmjs.com/package/mongoose](https://www.npmjs.com/package/mongoose)     |  
| Git | [https://git-scm.com/](https://git-scm.com/)     |  



## Installation 
Install all the dependencies mentioned in package.json by running "npm i" from the root directory.
Run the command "npm run start" to run the server.

## API Routes

### /api/users

* `GET`     All users and their friends and thoughts data populated.
* `GET`     A single user using its id and friends and thoughts data populated.
* `POST`    Create a new user by specifying a unique username and email.
* `PUT`     Update a user with its id.
* `DELETE`  Delete a user with its id. Also remove that user from other users friends list. Also delete all the deleted user's thoughts.


### /api/users/:userId/friends/:friendId

* `POST`    Push a new user into the user's friends array.
* `DELETE`  Delete a user's friend by removing it from the user's friends array.

### /api/thoughts

* `GET`     All Thoughts and reactions populated.
* `GET`     A single thought using its id and its reactions data populated.
* `POST`    Create a new thought.
* `PUT`     Update a thought with its id
* `DELETE`  Delete a thought with its id. Also remove that thought from user's thoughts array.

### /api/thoughts/:thoughtId/reactions

* `POST`    Create a new reaction for a thought. This is added to the thought's reaction array.

### /api/thoughts/:thoughtId/reactions/:reactionId

* `DELETE`  Delete a reaction for a thought using its id. This also pulls this reaction out of the reactions array for that thought.

## Author Info

Deepak Sinha
* [Portfolio](https://dee-here.github.io/portfolio/)
* [Github](https://github.com/dee-here)
* [Questions ](mailto:deepakdilse@gmail.com)

## License
![License Badge](https://img.shields.io/badge/License-MIT-yellow.svg)  

[License Link](https://choosealicense.com/licenses/mit/)  


