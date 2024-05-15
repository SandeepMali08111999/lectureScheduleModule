Lecture Scheduling Module Admin Panel README
Overview
This project aims to develop an admin panel for managing lecture schedules within a course management system. The admin panel allows administrators to add courses, define lectures (batches), assign instructors to these lectures, and manage scheduling to ensure no clashes between different lectures.

Features
Course Management: Administrators can add new courses with details such as name, level, description, and image.
Lecture Assignment: Courses can have multiple lectures (batches) which can be assigned to instructors on specific dates.
Conflict Resolution: The system prevents assigning the same instructor to multiple lectures on the same date.
Instructor Dashboard: Instructors can view their assigned lectures, including dates and associated courses.
File Structure
lecture-scheduling-module/
├── models/
│   ├── Course.js
│   ├── Lecture.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   ├── adminRoutes.js
│   └── instructorRoutes.js
├── controllers/
│   ├── adminController.js
│   ├── authController.js
│   └── instructorController.js
├── views/
│   ├── admin/
│   │   └── adminpanel.ejs
│   └── instructor/
│       └── instructorpanel.ejs
├── index.ejs
├── login.ejs
├── register.ejs
└── app.js
Functionality
Models
User: Represents both instructors and administrators. Includes fields like username, password, role (admin/instructor).
Course: Contains details about a course, including its name, level, description, image, and associated lectures.
Lecture: Stores information about individual lectures, including the course they belong to, the instructor assigned, and the date of the lecture.
Controllers
authController: Handles authentication-related logic, including registration, login, and session management.
adminController: Manages functionalities specific to the admin panel, such as adding courses and assigning lectures to instructors.
instructorController: Provides functionalities for instructors, allowing them to view their assigned lectures.
Routes
authRoutes: Defines routes for authentication processes, including registration (/register) and login (/login).
adminRoutes: Contains routes for administrative actions, such as adding courses (/courses/add) and assigning lectures (/lectures/assign).
instructorRoutes: Routes for instructor-specific functionalities, primarily viewing assigned lectures (/lectures/view).
Views
adminpanel.ejs: The main interface for the admin panel, where admins can manage courses and lectures.
instructorpanel.ejs: Displays the list of lectures assigned to the logged-in instructor, including dates and course names.
Setup and Configuration
Ensure Node.js and npm are installed on your system.
Clone the repository and navigate to the project directory.
Install dependencies using npm install.
Configure environment variables in .env file according to your database setup.
Run the application using node app.js.
Development Notes
This project uses EJS for templating and Express.js for handling HTTP requests.
Database interactions are abstracted through Mongoose models.
Authentication is handled using JSON Web Tokens (JWT) for secure sessions.
Contributing
Contributions to this project are welcome. Please follow the standard Git workflow for submitting pull requests.

This README provides an overview of the lecture scheduling module's admin panel, detailing its features, file structure, and setup instructions.
