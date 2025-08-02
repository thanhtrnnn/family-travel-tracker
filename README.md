# Family Travel Tracker

A web application that allows families to track countries they've visited together. Each family member can have their own profile with a unique color, and the application displays visited countries on an interactive world map.

## Features

- **Multi-user support**: Multiple family members can have individual profiles
- **Interactive world map**: Visual representation of visited countries
- **Country search**: Add countries by name or country code
- **Color-coded visualization**: Each family member has their own color on the map
- **PostgreSQL database**: Persistent storage of user data and visited countries

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Frontend**: EJS templating, HTML5, CSS3
- **Styling**: Custom CSS with responsive design

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- PostgreSQL
- npm (comes with Node.js)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd family-travel-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your PostgreSQL database:
   - Create a database named `world`
   - Import the countries data (you'll need a countries table with country_code and country_name columns)
   - Run the SQL commands from `queries.sql` to set up the required tables

4. Configure environment variables:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update `.env` with your database credentials:
     ```
     DB_USER=your_username
     DB_HOST=localhost
     DB_NAME=world
     DB_PASSWORD=your_password
     DB_PORT=5432
     PORT=6969
     ```
     ```
     database: "world",
     password: "your_password",
     port: 5432,
      ```

## Database Schema

The application uses the following tables:

### users
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR(15) UNIQUE NOT NULL)
- `color` (VARCHAR(15))

### visited_countries (or user_visited_countries)
- `id` (SERIAL PRIMARY KEY)
- `country_code` (CHAR(2) NOT NULL)
- `user_id` (INTEGER REFERENCES users(id))

### countries
- `country_code` (CHAR(2) PRIMARY KEY)
- `country_name` (VARCHAR(100))

## Usage

1. Start the server:
   ```bash
   npm start
   ```
   or for development:
   ```bash
   node index.js
   ```

2. Open your browser and navigate to `http://localhost:6969`

3. Add family members by clicking "Add Family Member"

4. Select a family member and start adding countries they've visited

5. View the interactive map showing all visited countries color-coded by family member

## Features in Detail

### Adding Countries
- Enter country names (full or partial match)
- Enter country codes (2-letter ISO codes)
- Duplicate prevention with user-friendly error messages

### Family Member Management
- Add new family members with custom colors
- Switch between family members to view their individual travel history
- Each member's visited countries are displayed in their chosen color

### Error Handling
- Invalid country names show helpful error messages
- Duplicate country entries are prevented
- Database connection error handling

## API Endpoints

- `GET /` - Main page displaying the world map and visited countries
- `POST /add` - Add a new country to the current user's visited list
- `POST /user` - Switch between users or navigate to add new user page
- `POST /new` - Create a new family member

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## TODO

- [x] Validate existing users before adding a new one
- [x] Copy validation logic from individual travel tracker to family travel tracker
- [ ] Add delete user functionality
- [ ] Add country statistics and analytics
- [ ] Implement user authentication
- [ ] Add export functionality for travel data
