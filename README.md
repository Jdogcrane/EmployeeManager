<h1 style="text-align: center;">Employee Manager</h1>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[[Demo-Video]](https://www.youtube.com/watch?v=IDQN3WAwS_4)

[[Preview]](#Preview)

## General overview: 

<p style="font-family:georgia"> 
For this project my goal was to create a Employee-Management Tool that will allow the user to add departments, roles and employees. Along with Viewing departments, roles, employees and update them all using Node.js, mysql 2, inquirer & JavaScript. Using prompts in the terminal you can build and manage a large database instantly after making a few personal choices. After filling out the prompts the script will take in user inputs and determine what to view/create/update. The menu uses a switch case to trigger each function for specific tasks. Once completed the user will be given a notice that the action was successful and the view/create/update will be done.
<p>

<h3 style="text-align:center;">Instructions</h3>

1. Initialize the app in the terminal using: `node app.js`
2. Select a what you want to do from the menu
3. After following the prompts and inputs are filled and terminal logs `Success` your changes will be made!
4. Review and enjoy your newly custom built employee manager!

<h3 style="text-align:center;">JS-Summary</h3>

* Added Packages needed for the application
* Added database seed and department database with tables needed
* Added gitignore
* Added ascii generator
* Added prompts in terminal for the user to input data for the app to collect
* Added function that collects data from each input
* Added switch case for menu
* Added setup mysql connection
* Added function the creates new department based off user input
* Added function the creates new role based off user input
* Added function the creates new employee based off user input
* Added function the displays tables depending on user input
* Added function the updates role based off user input
* Added function the updates assigned manager based off user input
* Added validator for prompts

>Notes: Had some confusion on what was needed to do for this assignment. Gif showed more than what was written in the HW readme. I followed readme the best I could, although it would of been nice to see the normal layout for the assignment for better clarity.

## Preview
![alt link= this is the place for the site preview](./assets/preview.gif)
