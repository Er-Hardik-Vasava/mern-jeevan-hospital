# Jeevan Hospital - Hospital Website

A **MERN stack-based Hospital Management System** with separate dashboards for **Admin** and **Patient**. Admins can manage users, appointments, and messages, while doctors can view and manage their appointments and patient records. Patients can book appointments and send messages, but only **Admin**  have dedicated dashboards.

## Features

- **Admin Dashboard:**
  - Manage users (Doctors, Patients).
  - View and manage appointments.
  - View messages from patients.
  - Role-based access control for secure management.
  - Accept or reject appointments.
  - View patient details and medical history.

- **Patient Features:**
  - Book appointments with doctors.
  - Choose a doctor by department.
  - Send messages to Admin or Doctors.

- **Authentication:**
  - Role-based authentication using JWT (Admin, Doctor, and Patient).
  - Secure login/signup for all users.

- **Styling:**
  - TailwindCSS for responsive and modern UI design.

## Tech Stack

- **Frontend:**
  - React.js
  - TailwindCSS for styling
  - Axios for API requests
  - React Router for routing

- **Backend:**
  - Node.js with Express.js
  - MongoDB for data storage
  - JWT for authentication

- **Authentication:**
  - JWT (JSON Web Tokens) for secure login and session management
