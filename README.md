Online Drive - File Upload and Management System

A web application for uploading, managing, and downloading files securely. This project allows users to upload files such as images, PDFs, videos, and songs to the cloud, view their files, and download them remotely. The application is built using Node.js, Express.js, Mongoose, JWT Authentication, and Multer for file handling.
Features

    User registration and authentication (login/logout).
    Secure JWT-based authentication.
    File uploads with support for images, PDFs, and other formats.
    View a list of uploaded files.
    Download files from the server.
    Clean and modern UI using Tailwind CSS and EJS templates.
    Server-side validation for file uploads.

Tech Stack

    Backend: Node.js, Express.js, Mongoose
    Authentication: JWT (JSON Web Tokens)
    File Upload: Multer
    Frontend: EJS (Embedded JavaScript Templates), Tailwind CSS
    Database: MongoDB
    CSS Framework: Tailwind CSS

Getting Started
Prerequisites

Make sure you have the following installed:

    Node.js (v14+)
    MongoDB (local or MongoDB Atlas for remote DB)

Installation

    Clone the repository

git clone <repository-url>
cd OnlineDrive

Install dependencies

npm install

Set up environment variables
Create a .env file in the project root with the following:

PORT=3000
MONGO_URI=<your-mongo-uri>
JWT_SECRET=<your-secret-key>

Create uploads directory
Ensure there’s a directory to store uploaded files:

    mkdir uploads

Run the Application

    Start the server

npm run dev

The server will run at http://localhost:3000.

Access the application in your browser:

    http://localhost:3000

API Endpoints
Authentication

    Register a user
        POST /user/register
        Body:

    {
      "username": "exampleUser",
      "email": "example@example.com",
      "password": "securepassword"
    }

Login a user

    POST /user/login
    Body:

        {
          "username": "exampleUser",
          "password": "securepassword"
        }

File Management

    Home page
        GET /home
        Authentication required

    Upload file
        POST /upload
        Headers:
        Authorization: Bearer <JWT_TOKEN>
        Form Data:
            file: File to upload (e.g., image, PDF)

    Download file
        GET /download/:filePath

Project Structure

OnlineDrive/
│
├── models/
│   ├── files.models.js    # File schema for MongoDB
│   └── user.model.js      # User schema for MongoDB
│
├── routes/
│   ├── index.routes.js    # Routes for file upload and download
│   └── user.routes.js     # Routes for user authentication
│
├── config/
│   └── multer.config.js   # Multer configuration for file uploads
│
├── views/
│   └── *.ejs              # EJS templates for frontend
│
├── uploads/               # Directory for storing uploaded files
│
├── .env                   # Environment variables
├── server.js              # Main server file
└── README.md              # Project documentation

Middleware
1. Authentication Middleware (auth.js)

    Verifies the JWT token from cookies.
    Decodes user information and attaches it to req.user.

2. Multer Middleware (multer.config.js)

    Handles file uploads.
    Configures storage location and file naming.

Known Issues

    ValidationError: file validation failed: path is required
        Ensure req.file is properly populated by multer.
        Debug using console.log(req.file) in the /upload route.

    Unauthorized Error
        Verify that the token is being sent correctly in cookies.
        Ensure the JWT secret in .env matches across the application.

Contributing

    Fork the repository.
    Create a new branch for your feature or bugfix:

git checkout -b feature-name

Commit your changes:

git commit -m "Add some feature"

Push to the branch:

    git push origin feature-name

    Open a Pull Request.

License

This project is licensed under the MIT License.
Contact

For any questions or issues, feel free to reach out:

    Author: Subodh Raturi
    Email: subhi420@gmail.com

