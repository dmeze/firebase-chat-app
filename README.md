# Firebase Chat App

A real-time chat application built with React, Firebase, and Vite. This app features user authentication, real-time messaging, and profile management, serving as a modern foundation for scalable chat applications.

---

## 🖥️ Deployed App

You can view a live demo of the app at the following URL:
[Live Preview](https://dmezents-test-chat-bot.web.app)

## 🚀 Features

- 🔐 **Authentication**: Email/password and anonymous sign-in using Firebase Authentication.
- 💬 **Real-Time Messaging**: Messages are updated in real time using Firebase Firestore.
- 🖼️ **Profile Management**: Users can upload profile pictures.
- 🎨 **Responsive Design**: Fully responsive and mobile-friendly.
- 🧩 **Modular Architecture**: Organized and extensible codebase.

---

## 🛠️ Tech Stack

- **Frontend**: React with React Router for routing and Vite for development.
- **Backend**: Firebase (Firestore, Authentication, Analytics and Storage).
- **Styling**: Tailwind CSS.
- **Deployment**: Firebase Hosting.

---

## 📦 Installation

### Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) installed.

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/dmeze/firebase-chat-app.git
   cd firebase-chat-app
   ```
2. **Install Dependencies**:

    ```bash
    npm install
    ```
3. **Set Up Firebase**:
    - Create a new Firebase project.
    - Enable Firestore, Authentication, and Storage.
    - Copy the Firebase configuration object from the Firebase console.
4. **Add Environment Variables**:

    - Create a `.env` file in the root directory and add the following:
    ```env
      REACT_APP_FIREBASE_API_KEY=your-api-key
      REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
      REACT_APP_FIREBASE_PROJECT_ID=your-project-id
      REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
      REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
      REACT_APP_FIREBASE_APP_ID=your-app-id
      ```
5. **Start the Development Server**:

    ```bash
    npm run dev
    ```
   Open your browser and go to http://localhost:5173.
## 🔧 Project Structure:

   ```plaintext
   firebase-chat-app/
   ├── src/
   │   ├── components/        # Reusable React components
   │   ├── context/           # Context for authentication and app-wide state
   │   ├── lib/               # Firebase configuration and utilities
   │   ├── pages/             # Page-level components
   │   ├── App.jsx            # Main app component
   │   ├── index.css          # Global styles
   │   └── index.jsx          # Entry point
   ├── public/                # Static assets
   ├── .env                   # Environment variables
   ├── tailwind.config.js     # Tailwind CSS configuration
   ├── vite.config.js         # Vite configuration
   ├── firebase.json          # Firebase configuration for hosting
   ├── package.json           # Project dependencies and scripts
   └── README.md              # Project documentation
   ```
## 🌟 Features in Detail:

   - **Authentication**:
     - Users can sign up and log in using email/password.
     - Users can sign in anonymously.
     - Users can sign out.
   - **Real-Time Messaging**:
     - Users can send and receive messages in real time.
     - Messages are stored in Firestore.
   - **Profile Management**:
     - Users can upload profile pictures.
     - Profile pictures are stored in Firebase Storage.
   - **Responsive Design**:
     - The app is fully responsive and mobile-friendly.
   - **Modular Architecture**:
     - The codebase is organized and extensible.
