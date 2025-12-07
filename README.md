# PantryPal

PantryPal is a full-stack web application designed to help users manage their kitchen pantry, discover recipes, organize shopping lists, and track their food budget and item expiration dates.

## Features

- **Inventory Management**: Keep track of ingredients in your pantry.
- **Recipe Management**: Browse and view detailed recipes.
- **Shopping List**: Manage items you need to buy.
- **User Insights**: Gain insights into your consumption habits.
- **Budget Tracking**: Monitor your spending on food.
- **Expiry Alerts**: Get notified about items nearing their expiration date.
- **Secure Authentication**: User signup, login, and password reset functionality.

## Tech Stack

**Frontend:**
- React (Vite)
- TypeScript
- TailwindCSS
- React Router DOM
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js installed on your machine.
- MongoDB installed and running locally, or a MongoDB Atlas connection string.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd PantryPal
    ```

2.  **Install Frontend Dependencies:**
    ```bash
    npm install
    ```

3.  **Install Backend Dependencies:**
    ```bash
    cd server
    npm install
    ```

### Configuration

1.  **Backend Environment:**
    Create a `.env` file in the `server/` directory and add your MongoDB connection string:
    ```env
    MONGODB_URI=mongodb://localhost:27017/pantrypal
    ```
    (Replace with your actual MongoDB URI if different)

2.  **Frontend Configuration:**
    The frontend is currently configured to look for the backend at `http://127.0.0.1:3000/api`. If your server runs on a different port or host, update `src/services/api.ts`.

### Running the Application

1.  **Start the Backend Server:**
    Open a terminal, navigate to the `server` directory, and run:
    ```bash
    cd server
    npm start
    ```
    The server should start on `http://localhost:3000`.

2.  **Start the Frontend:**
    Open a new terminal window in the project root directory and run:
    ```bash
    npm run dev
    ```
    The application will typically run on `http://localhost:5173` (check the terminal output).

## Project Structure

- **`/src`**: Contains the React frontend code.
    - **`components`**: Reusable UI components.
    - **`pages`**: Application views/routes.
    - **`services`**: API service configuration.
- **`/server`**: Contains the Node.js/Express backend code.
    - **`models`**: Mongoose data models.
    - **`routes`**: API route definitions.