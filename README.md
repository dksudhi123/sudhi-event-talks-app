# sudhi-event-talks-app

This is a simple web application that displays a schedule for a tech conference, allowing users to view talks and filter them by category.

## Features

*   **Event Schedule:** Displays a list of talks with titles, speakers, categories, durations, and descriptions.
*   **Search by Category:** Users can filter talks by entering a category in the search bar.
*   **Responsive Design:** The application is designed to be accessible on various screen sizes.

## Technologies Used

*   **Backend:** Node.js with Express.js
*   **Frontend:** HTML, CSS, JavaScript (Vanilla JS)

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/dksudhi123/sudhi-event-talks-app.git
    cd sudhi-event-talks-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the server:**
    ```bash
    node server.js
    ```

    The application will be accessible at `http://localhost:3000`.

## Project Structure

*   `server.js`: The main server file using Express.js.
*   `public/`: Contains static frontend assets.
    *   `public/index.html`: The main HTML page for the application.
    *   `public/style.css`: Styles for the application.
    *   `public/script.js`: Frontend logic for displaying and filtering the schedule.
*   `.gitignore`: Specifies intentionally untracked files to ignore.
*   `package.json`: Defines project metadata and dependencies.
*   `package-lock.json`: Records the exact dependency tree.
