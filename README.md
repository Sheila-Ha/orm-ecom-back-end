# ORM E-Commerce Back End  <!-- omit from toc -->
by Sheila Hanson ![Github license](https://img.shields.io/badge/license-MIT-blue.svg)  
![alt text](assets/img/Logo.png)  
## Description <!-- omit from toc -->
- This applications serves as the  back-end for an e-commerce website. It is built with Object Relational Mapping (ORM). This design is made to be used with a front-end e-commerce application. It provides API's to manage products, categories, and tags. This application uses Express.js for the server, Sequelize as the ORM and MySQL for the database. Once you are set up, run the API locally, you can interact with it using Insomnia and perform CRUD operations.

## Table of Contents <!-- omit from toc -->
  
- [Installation](#installation)
  - [User Story](#user-story)
  - [Acceptance Criteria](#acceptance-criteria)
- [Usage](#usage)
- [Features](#features)
- [Challenges](#challenges)
- [Contributing](#contributing)
- [Testing](#testing)
- [Questions](#questions)
- [License](#license)
- [Badges](#badges)
    

## Installation
- Clone the repository to get your starter code  
- Install dependencies
  - npm init  
    - npm install Sequelize  
    - npm install dotenv package  
    -  npm install MySQL  
    -  npm install MySQL2  
    -  npm install Node.js  
 - Insomnia
   - Used for testing
  
  ### User Story
* AS A manager at an internet retail company  
I WANT a back end for my e-commerce website that uses the latest technologies  
SO THAT my company can compete with other e-commerce companies  

    
  
  ### Acceptance Criteria
* GIVEN a functional Express.js API  
  WHEN I add my database name, MySQL username, and MySQL password to an environment variable file  
  THEN I am able to connect to a database using Sequelize  

  WHEN I enter schema and seed commands  
  THEN a development database is created and is seeded with test data  

  WHEN I enter the command to invoke the application (npm start)  
  THEN my server is started and the Sequelize models are synced to the MySQL database  

  WHEN I open API GET routes in Insomnia Core for categories, products, or tags  
  THEN the data for each of these routes is displayed in a formatted JSON  

  WHEN I test API POST, PUT, and DELETE routes in Insomnia Core  
  THEN I am able to successfully create, update, and delete data in my database  

      
## Usage 
- Run schema
  -  Develop folder - db folder - right click schema.sql 
      -  Then open in an integrated terminal and type the following commands in  
           -  mysql -u root -p  
           -  password - [enter your password]  
           -  source db/schema.sql  
           -  quit (this is going to end the sql shell = Bye)  
   ![alt text](assets/img/mysqlstartup.png)
- Run seeds
  - JS server.js - right click server.js
      - Then open in an integrated terminal and type the follow commands in  
          - npm i (run to make sure all the dependencies are installed before you begin)
          - npm run seed  
      - Starting the server - type the following below in the command line
          - npm run watch  
           - response on last line = App listening on port 3001!  
  ![alt text](assets/img/npmi.png)  
![alt text](assets/img/npmrunwatch.png)
- Insomnia - testing will be done here

 - Database Model Diagram  
![alt text](<assets/img/EER Diagram.png>)  
  
  DEMO: (https://app.screencast.com/aU1b38urFTnJZ?tab=Details&conversation=BSNextaR1wvQJbayXelSyM)

## Features
- MySQL workbench database model EER diagram  
- Logo  
- Database Model Diagram  

## Challenges  
- Learning SQL Workbench  
- Gaining deeper knowledge of Insomnia  
- Testing and getting everything working with the correct syntx  
- Understanding how routes index.js and api index.js communicate to each other  
- belongsto, hasMany, belongsToMany was hard to grasp  


## Contributing
[NPM](https://www.npmjs.com/package/inquirer/v/8.2.4?activeTab=readme#installation)  
[Inquirer](https://www.npmjs.com/package/inquirer/v/8.2.4)  
[MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web)  
[Node.js](https://nodejs.org/docs/latest/api/)  
[Stack Overflow](https://stackoverflow.com/?newreg=67d94556b887449fa2885dadf54a5439)  
[JS Cheatsheet](https://htmlcheatsheet.com/js/)  
[W3school](https://www.w3schools.com/)  
[DEV](https://dev.to/envoy_/150-badges-for-github-pnk#contact)  
[Shields](https://shields.io/)  
[Sequelize](https://sequelize.org/docs/v6/getting-started/)  
[YouTube](https://youtube.com)  
[Insomnia](https://insomnia.rest)

## Testing
- Insomnia was used for testing this API  
![  ](assets/img/InsomniaTesting.png)

## Questions
![Ask me anything](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)
If you have any questions, or additional feedback, please feel free to email me and I will respond as soon as possible.
    
* Github -
[https://github.com/Sheila-Ha/orm-ecom-back-end.git](https://github.com/Sheila-Ha/orm-ecom-back-end.git)

* Email -
slhanson11@live.com

## License 

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)



## Badges
![MDN Web Docs](https://img.shields.io/badge/MDN_Web_Docs-black?style=for-the-badge&logo=mdnwebdocs&logoColor=white)  ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Insomnia](https://img.shields.io/badge/Insomnia-black?logo=insomnia&logoColor=5849BE) ![MYSQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)    
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)  ![.ENV Badge](https://img.shields.io/badge/.ENV-ECD53F?logo=dotenv&logoColor=000&style=flat-square) 
![Markdown](https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white)   
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)  ![Lenovo](https://img.shields.io/badge/lenovo-E2231A?style=for-the-badge&logo=lenovo&logoColor=white)  ![Sequelize Badge](https://img.shields.io/badge/Sequelize-52B0E7?logo=sequelize&logoColor=fff&style=flat-square)
![W3schools](https://img.shields.io/badge/W3Schools-04AA6D?style=for-the-badge&logo=W3Schools&logoColor=white) ![JSON](https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=red)  
![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E) ![Zoom](https://img.shields.io/badge/Zoom-2D8CFF?style=for-the-badge&logo=zoom&logoColor=white) ![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)  ![Google Chrome](https://img.shields.io/badge/Google_chrome-4285F4?style=for-the-badge&logo=Google-chrome&logoColor=white)  
![MYSQLITE](https://img.shields.io/badge/Sqlite-003B57?style=for-the-badge&logo=sqlite&logoColor=white) ![Stack Overflow](https://img.shields.io/badge/Stack_Overflow-FE7A16?style=for-the-badge&logo=stack-overflow&logoColor=white)  ![Lenovo](https://img.shields.io/badge/lenovo%20laptop-E2231A?style=for-the-badge&logo=lenovo&logoColor=white)  

