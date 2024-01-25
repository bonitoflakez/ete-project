# [ETE Project] MERN Blog App

## Functionalities

- **Secure Authentication:** Implement a robust user authentication system for enhanced security.
- **Effortless Blog Creation:** Quickly generate and publish your blogs through an intuitive and user-friendly interface.
- **Blog Deletion:** Easily eliminate unwanted blogs with a straightforward delete option.
- **Blog Updates:** Seamlessly edit and update your blogs to reflect evolving content.
- **Discover Other Users' Blogs:** Explore and read blogs published by fellow users for a diverse and engaging experience.

## Project Showcase

Check screenshots of project: **[Project Showcase]("extras/showcase.md)**

## Getting Started

> NOTE: Backend will require your mongo URI create a `.env` file in `server` directory and add `MONGO_URI="<your-mongo-uri-here>"`

To initiate this project, follow these steps:

1. **Fork and Clone the Repository:**
   - Begin by forking and cloning this repository to your local machine.

2. **Install Dependencies:**
   - Navigate to the project directory and install the required dependencies for both the backend and frontend:

     ```bash
     cd ete-project
     cd server && yarn
     cd client && yarn
     ```

3. **Configure Database Connection:**
   - Set up the database connection in the backend. You can opt for MongoDB Atlas or a local MongoDB server.

4. **Start Backend Server:**
   - Launch the backend server:

     ```bash
     cd server && yarn start
     ```

5. **Start Frontend Application:**
   - Initiate the frontend application:

     ```bash
     cd client && yarn start
     ```

6. **Access the Application:**
   - Open your web browser and go to [http://localhost:3000](http://localhost:3000) to access the application.
