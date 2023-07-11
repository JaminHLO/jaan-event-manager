# Sports Connect

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)


## Description

This application is a full-stack sports club management solution. It is built with Javascript, React, and GraphQL with a MongoDB backend. 
It uses the following libraries: apollo-server-express, express, axios, bcrypt, graphql, mongoose, stripe, dotenv, dayjs, node-fetch, react-calendar, @react-google-maps/api, and react. API access to Stripe and Google Maps has also proven invaluable.

Sports Connect offers users access to registered Clubs and Events in their area of interest. <br>
- Clubs: users may search, create, edit, or purchase access to clubs. Club owners may post and edit notifications to club members. <br>
- Events: users may search events and join if they are members of the event's club. Club owners may create and edit events.


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)


## Installation

This application runs on the browser.

To run the code locally:<br>
>Clone the repository.<br>
>Download required packages: npm i.<br>
>Seed the database: npm run seed.<br>
>Start the program: npm run develop.<br>
>The local application may be accessed on your browser using: http://localhost:3000/


## Usage

The link to access the deployed application is: XXhttps://home-hub-management.herokuapp.com/XX
 
- Finding Clubs and Events:
    * Click the 'Search' menu dropdown in the navigation bar to select either Clubs or Events for your search.
    * Enter a search term or a single white space ' ' if you would like to see all clubs or events.
    * Under the 'List' click 'View Details' of any club or event of interest.
    * After viewing the details, a prospective user is required to create an account or login to join.

- Creating an Account:
    * Users who are not logged in may create an account by clicking the 'Signup' button on the nav bar.
    * Emails must be unique to the user.
    * A user's name, profile image, and address may be updated from the 'Update your Profile' option.
    * Users may also add participants to their account in case they are signing up for a Club on behalf of minor children.
      
- Creating a Club & Event:
    * After creating an account or signing in, a user may create a Club from the button beneath their profile.
    * Enter the required Club information, a user is now a Club owner and may update the details of their Club.
    * Club owners may post or delete a club-wide Announcement viewable by all Club members.
    * Club owners may create and edit the Club's Events as well as join them.
    * Editing an Event also gives the Club owner the ability to change the event status to unavailable.
 
- Joining a Club & Event:
    * Users may either create a Club or join the Club of another for a fee.
    * Once a member of a Club, a user will have access to join all the Club's Events.

Screenshots of the app in use:

<img src=https://raw.githubusercontent.com/Anabel-Espinoza/HomeHub/main/public/images/screenshots/hh-home-02.png width=30% margin=10px alt="HomeHub Homepage"> <img src=https://raw.githubusercontent.com/Anabel-Espinoza/HomeHub/main/public/images/screenshots/landlord-properties.png width=30% margin=10px alt="Landlord Dashboard"> <img src=https://raw.githubusercontent.com/Anabel-Espinoza/HomeHub/main/public/images/screenshots/landlord-convo.png width=30% margin=10px alt="Landlord Convo"> <img src=https://raw.githubusercontent.com/Anabel-Espinoza/HomeHub/main/public/images/screenshots/tenant-dashboard.png width=30% margin=10px alt="Tenant Dashboard"> <img src=https://raw.githubusercontent.com/Anabel-Espinoza/HomeHub/main/public/images/screenshots/tenant-add-ticket.png width=30% margin=10px alt="Tenant Add Ticket"> 


## Credits

Team:
- Alyssa Geria (https://github.com/alyssageria)
- Anabel Espinoza (https://github.com/Anabel-Espinoza)
- Jamin Hogan (https://github.com/JaminHLO)
- Nick Pham (https://github.com/NganPham89)

Instruction Team:
- Instructor: Saurav Khatiwada
- TAs: Andres Inciarte, Morgan Riley, Constan Fernando, Andres Jimenez.


## License

This Project is covered by the GPL License.
