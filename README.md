## Available Scripts

In each of the component (admin, backend, backend) of project directory, you should run:


### `npm install`
## Admin and Frontend, **`npm run dev`**; 
## Backend, **`npm run server`**.

Runs the app in the development mode.\


### Description

This is a Full Stack Hospital Management Application with React and Tailwind CSS Frontend and Mongodb Cloud and Node Express Server Backend. 

### Features

- **Roles**: 
  - Admin, doctor, and user roles with different logins based on **JWT Authentication**.
  
- **User**:
  - Sign up and login to **book or cancel appointments**.
  - Update **User Info** in the profile section.
  - **Select doctors** by category and choose available slots based on days and hours.
  
- **Doctor**:
  - View and manage **appointments** specific to them.
  - Mark appointments as **complete** after the checkup.
  - Change their **active/inactive status**, which reflects on the slot booking process.
  
- **Admin**:
  - **Dashboard**: View **earnings**, **patients**, and **recent appointments**.
  - **Appointments Page**: 
    - View all appointments with details like **time slots**, **payment status**, **user info**, and **doctor info**.
    - **Server-side filtering** for appointments based on **status**, **booking date**, **patient name**, and **doctor name**.
  - **Appointment management**: Change **payment status** and **appointment status** for specific appointments.
  - **Doctor management**: Add new doctors with detailed profile information.
  
- **External Tools**:
  - **Cloudinary** for image storage and access.
  - **bcrypt** and **jsonwebtoken** for authentication.
  
- **Responsive Design**: 
  - The application adapts to various screen sizes, ensuring a consistent experience on both mobile and desktop.





