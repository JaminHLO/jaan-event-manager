# Sports Connect

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)


## Description

This application is a full-stack sports club management solution. It is built with Javascript, React, and GraphQL with a MongoDB backend. 
It uses the following libraries: apollo-server-express, express, axios, bcrypt, graphql, mongoose, stripe, dotenv, dayjs, node-fetch, and react. 
Sports Connect offers users access to registered Clubs and Events in their area of interest. <br>
- Clubs: users may search, create, edit, or purchase access to clubs. <br>
- Events: users  will be able to check their rental unit details, submit maintenance tickets to their landlord, and communicate with them through a messaging system.


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
>Run mysql from the /db directory.<br>
>SOURCE the schema.sql file to create the database.<br>
>Seed the tables from the main directory using: npm run seed.<br>
>Run the server: npm start.<br>
>The local application may be accessed on your browser using: http://localhost:3001/


## Usage

The link to access the deployed application is: https://home-hub-management.herokuapp.com/
 
- Landlord Usage:
    * Create a new landlord account or sign in as landlord. The dashboard has the following options:
    * Your properties(if any): Displays current units, allows landlord to add new property and invite tenants.
    * Maintenance tickets(if any): Displays a list of maintenance tickets for your properties. Allows the landlord to update them.
    * Your messages: Shows the conversations with your tenants. Allows the landlord to start a new conversation.
    * Update profile: Allows the landlord to update their profile info, including their password. Displays a list of their current tenants.

- Tenant Usage:
    * Sign in as a tenant while the tenant check box is checked. The dashboard has the following options:
    * Your unit: Lists information about your rental unit.
    * Your maintenance tickets: Displays a list of the maintenance tickets the tenant has sent.
    * Add maintenance ticket: Opens a window to create a new maintenance ticket.
    * Your messages: Shows tenant-landlord conversations. Allows tenant to start a new conversation.
    * Update your profile: The tenant can update email/password for their account.

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

This Project is covered by the MIT License.
