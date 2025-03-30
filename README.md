# Investment Project (Ancor)

Ancor is an investment management platform that enables users to track their investments, view top-performing funds, and make investments within single selected funds.

---

## Technologies Used

- **Frontend**: React with TypeScript, Vite for fast development, Tailwind CSS for styling, and Jest for unit testing.
- **Backend**: Node.js with Express for the API and SQLite as the database.

---

## Running the Backend

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the backend server:

   ```bash
   npm run start
   ```

   The server will run on `http://localhost:3000`.

---

## Running the Frontend

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The frontend will be available at the URL provided by Vite (e.g., `http://localhost:5173`).

---

## Notes

- Ensure the backend server is running before accessing the frontend.
- The backend uses SQLite for the database. The database file (`isa.db`) will be created automatically in the backend directory if it doesn't already exist. If it does exist, data will be persisted between server runs.
- For testing, run:

  ```bash
  npm test
  ```

  in the frontend directory.

- The URLs (`http://localhost:3000` for the backend and `http://localhost:5173` for the frontend) are defaults and may vary depending on your environment.

---

## Future Enhancements

With more time, I would implement the following features and improvements:

### **Security Enhancements**

- Add JWT/Bearer tokens for secure API authentication.
- Implement password encryption for user accounts.
- Add authentication and authorisation mechanisms for login and protected routes.

### **Data Visualisation**

- Add interactive graphs and growth charts to provide users with a way to track the performance of their funds and investments over time.
- Using libraries like Chart.js or D3.js.

### **Feature Completion**

- Finalise the "Coming Soon" pages to provide more features for users on the applicaiton.
- These pages could include:
  - **Portfolio**: A detailed breakdown of the user's investments, including performance metrics and historical investments.
  - **User Settings**: Enhanced profile management, including account details, and security settings.
  - **Fund Comparisons**: Allow users to compare multiple funds side-by-side to make informed decisions.

### **Testing**

- Add unit tests for the backend server to ensure API endpoints work as expected.
- Implement end-to-end (E2E) tests for the application using tools like Playwright or Cypress to validate the entire user flow.
- Expand unit tests for frontend pages to ensure all components and interactions are thoroughly tested.
