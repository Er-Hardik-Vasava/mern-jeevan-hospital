# Hospital Management System (MERN Stack)

## Overview

This **Hospital Management System** is a **full-stack web application** built using the **MERN stack** (MongoDB, Express.js, React.js, and Node.js). It is designed to manage various hospital operations, including user roles (Admins and Patients), appointment management, and message handling. 

The system provides **separate dashboards** for **Admins** and **Patients**. Admins have full control over the platform, allowing them to manage users (Doctors and Patients), appointments, and messages. Patients can book appointments, track their status, and communicate with Admins or Doctors.

**Admin Dashboard:** Admins have the ability to manage users, view and handle appointments, and monitor communication.

**Patient Dashboard:** Patients can view available doctors by department, book appointments, and send messages to Admins or Doctors.

The application uses **TailwindCSS** to ensure a modern and responsive UI, providing users with a seamless experience across devices.

---

## Features

### **1. Admin Dashboard**
- **Manage Users**: Admins can create, update, and delete user profiles for **Doctors** and **Patients**.
- **Appointment Management**: Admins have full control over all **appointments**. They can:
  - View all appointments.
  - Approve or reject appointments.
  - Mark appointments as pending or completed.
- **Message Center**: Admins can read and respond to messages sent by patients.
- **User Role Management**: Admins can assign or change user roles (e.g., admin, doctor, patient).
  
### **2. Patient Dashboard**
- **Appointment Booking**: Patients can:
  - Choose from a list of doctors by department (e.g., Cardiology, Dermatology, etc.).
  - Book appointments based on doctor availability.
  - Track the status of their appointments (Pending, Accepted, Rejected).
- **Messaging**: Patients can send messages to **Admin** or **Doctors** to inquire about appointments or other concerns.
  
### **3. Authentication & Authorization**
- **Role-Based Authentication**: Secure user authentication using **JWT (JSON Web Tokens)**. Roles are assigned based on the user type (Admin, Patient).
- **Secure Login**: The login process ensures that each user type (Admin or Patient) has access to their respective dashboards and functionalities.
  
### **4. UI & UX Design**
- **TailwindCSS**: A utility-first CSS framework is used to create a **responsive, modern UI**. Tailwind allows for custom styling, ensuring a consistent look and feel across both the **Admin** and **Patient** dashboards.

### **5. Database & Backend**
- **MongoDB**: A NoSQL database is used to store user data, appointments, messages, and other system configurations. The database is flexible and scalable, making it ideal for storing patient and appointment data.
- **Express.js & Node.js**: The backend is powered by Express.js and Node.js, which handle API requests, authentication, and business logic.

---

## Tech Stack

### **Frontend:**
- **React.js**: A powerful JavaScript library for building dynamic user interfaces. It’s used to create the patient and admin dashboards with a smooth, interactive user experience.
- **TailwindCSS**: A utility-first CSS framework that helps to design responsive and modern UIs without writing custom CSS from scratch. It’s used for styling the frontend.
- **React Router**: A routing library for React that allows you to handle navigation between the different pages (Admin Dashboard, Patient Dashboard, etc.).
- **Axios**: A promise-based HTTP client used for making API requests from the frontend to the backend.

### **Backend:**
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**

### **Authentication:**
- **JWT (JSON Web Tokens)**
