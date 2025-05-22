# SACCO Management System

A simple SACCO (Savings and Credit Cooperative Organization) management application built with **Flask** and **SQLAlchemy**. The app allows members to create accounts, apply for loans, make repayments, and manage transactions. Admins can manage members, approve or reject loan requests, and receive notifications about SACCO activities.

## Features

### SACCO Management System

A simple SACCO (Savings and Credit Cooperative Organization) management application built with **Flask** and **SQLAlchemy**. The app allows members to create accounts, apply for loans, make repayments, and manage transactions. Admins can manage members, approve or reject loan requests, and receive notifications about SACCO activities.

## Features

### Member Features
- Register and log in as a SACCO member
- View account balance and loan status
- Apply for loans
- Repay loans
- View transaction and repayment history
- Receive notifications when loan status is updated

### Admin Features
- View all members and their account balances
- Approve, reject, or update the status of loans
- View and manage loan repayments
- Receive notifications when:
  - A member applies for a loan (with member details and account balance)
  - A member repays a loan
- Send notifications to individual members or broadcast to all members

## Tech Stack

- **Backend:** Flask, SQLAlchemy, Python
- **Database:** SQLite (or your preferred DBMS)
- **Authentication:** JWT (Token-based authentication)
- **Notifications:** System-based notification model
- **Frontend:** (Optional) React or any frontend that consumes the Flask API


## User Interface

### Home Page
The homepage provides easy navigation, displaying the services, about, and access to various categories:

![Alt text](/frontend/public/home.png "Home Page")

## Getting Started

### Prerequisites

- Javascript
- React(Vite)
- NPM
- Tailwind CSS
- Toastify

##  Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/Brianjoseph8132/sacco-app
   cd sacco-app

# For backend

2. **Install dependencies**
   ```
   cd backend
   pipenv install
   pipenv shell
   ```

3. **Run database migrations**
    ```
    flask db init
    flask db migrate
    flask db upgrade
    ```


3. **Start the server**
   ```
   flask run --debug
   ```

# For frontend

4. **Install dependencies**
   ```
   cd frontend
   npm install
   ```

5. **Start the frontend development server:**
   ```
   npm run dev
   ```

##  Future Improvements
    1. Add email/SMS notifications
    2. Add role-based permissions (admin, member, super admin)
    3. Integrate mobile support (React Native or Flutter frontend)
    4. Add charts and analytics dashboard for admins


## Contributing
Pull requests are welcome! If you'd like to make any improvements or add features, feel free to fork the repo and submit a PR.


