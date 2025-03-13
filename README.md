# Music App - Django rest framework + React Fullstack app

## Overview
This is a full-stack Music App built using the Python, Django, React, Postgresqlstack. The app allows users to explore music content, subscribe to premium plans, create playlists, discover artists, and browse genres. This app is designed to provide a seamless music streaming experience.

### Features:
- **User Authentication**: Secure user login/signup with JWT token authentication.
- **Subscriptions**: Users can subscribe to different music plans (Free, Premium).
- **Playlists**: Create, update, delete, and share custom playlists.
- **Artists & Genres**: Browse music by artist or genre.
- **Search**: Search for songs, artists, and albums.
- **Music Player**: In-app music player for streaming songs.
- **Responsive UI**: Mobile-friendly design built with React.
- **Admin Panel**: Admin users can manage artists, albums, songs, and subscriptions.

## Tech Stack
- **Frontend**: React.js, Redux for state management, React Router for navigation, Material-UI for design components.
- **Backend**: Python, Django, SIMPLE-JWT for authentication, and RESTful API.
- **Database**: sqllite, Postgresql.
- **Authentication**: JSimple (JWT) for secure login.

## Installation

### Prerequisites
- Django >= 1.0
- PostgreSQl (local or cloud instance)

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/cyrus-nodejs/musicapp.git
   cd music-app
Install dependencies for both frontend and backend:

bash
Copy
# Install backend dependencies
cd server
pip install -r requirements.txt

# Install frontend dependencies
cd ../client
npm install
Configure environment variables:

Create a .env file in the backend folder with the following variables:
bash
Copy
CLOUDINARY =<your-mongodb-connection-string>
STRIPE=<stripe-secret-key>
 CLOUD_NAME = <cloudinary name>
 CLOUDINARY_KEY= <cloudinary api key>
CLOUDINARY_SECRET = <cloudinary-key>
STRIPE_PUBLISHABLE_KEY = <stripe-pub-key>
STRIPE_SECRET = <stripe-secret-key>
SECRET_KEY=<django-secret-key>
Run the application:

bash
Copy
# In the backend folder, run:
npm run dev

# In the frontend folder, run:
npm start
Visit http://localhost:3000 to access the app.

Features
1. User Subscription
Users can choose between a free or premium subscription. Premium users have access to exclusive content, ad-free streaming, and unlimited skips.

2. Playlists
Users can create and manage playlists by adding songs from their library. They can share playlists with friends and make them public or private.

3. Artists and Genres
Discover new artists and browse music based on genres. Each artist has a dedicated page with their albums and tracks.

4. Music Streaming
In-app streaming for seamless playback. The music player supports features like shuffle, repeat, and volume control.

5. Search Functionality
Search for your favorite songs, albums, or artists. The search results will dynamically update as you type.

6. Admin Panel
Admins have the ability to upload new music, manage users, and handle subscriptions.

API Endpoints
User Routes
POST /api/register: Register a new user
POST /api/login: User login (returns JWT token)
GET /api/: Get the currently logged-in user’s details

Music Routes
GET /api/artists: Get a list of all artists
GET /api/genres: Get all available genres
GET /api/search: Search for songs
POST /api/createplaylist: Create a new playlist
GET /api/playlist/:id: Get a playlist by ID
Subscription Routes
POST /api/currentsub: Subscribe to a premium plan

Contributing
Contributions are welcome! Please fork the repo and submit pull requests for bug fixes, new features, or improvements.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
For any inquiries or issues, feel free to open an issue on GitHub or contact the project owner.

vbnet
Copy

This README provides a high-level description of your MERN-based music app, along with its features, tech stack, installation instructions, and API endpoint details. You can adapt it to fit your app's specific features.


