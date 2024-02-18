# Mobile and Web Application Development final project
This repository presents the final version of the project Mobile and Web Application Development course at Warsaw University of Technology. This project aimed to create an
application that would enable users to store notes, add new notes, delete notes, and search notes. The additional feature in this application that had to be included was to add 
registration and logging via some authentication provider like OAuth2/Keycloak and create the application on mobile as well as on a web environment.

For creating the application login, I used the following stack:
- Java 17
- SpringBoot
- Spring Security with Keycloak authentication server

To create the visual representation of the application I used the following technologies:
- Angular 14
- Nginx
- React Native for mobile app development

In application code, we can also find tests written in Selenium and Cypress to test the working frontend web application and its communication with logic on the backend side. Selenium tests were written in Java code and Cypress in plain Typescript.

## How to run the application
Thanks to the containerization and using docker we can easily run the application by pulling the repository from GitHub and running docker-compose up in the main directory. It should run firstly the keycloak initialization and then initialize the authentication-server with a new realm. Then backend with the frontend should be created. When the container is up, you can find a working web application on port 4200 of localhost and start using the application. \
If it comes to running the mobile application, I have run the application by running the backend instance on docker and then running the mobile application using for instance ExpoGo or some built-in mobile simulators like XCODE.
