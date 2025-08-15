# Chai Aur ChitChat

A chat application where you can interact with AI mentors Hitesh (React Expert) and Piyush (System Design).

## Setup

### Prerequisites
- Node.js (v14 or higher)
- Google Gemini API key

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Ai-persona
```

2. Install dependencies for both frontend and backend
```bash
npm run install-all
```

3. Set up environment variables
```bash
cd backend
cp env.example .env
```

4. Set up environment variables

**Backend (.env):**
```env
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/
```

**Frontend (.env):**
```env
REACT_APP_API_URL=http://localhost:5000
```

5. Start the application
```bash
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Features

- Chat with two AI mentors: Hitesh (React) and Piyush (System Design)
- Separate conversation history for each mentor
- Modern UI with gradient design
- Responsive design for desktop and mobile
- Profile pictures for mentors

## Tech Stack

- Frontend: React, Axios, CSS
- Backend: Node.js, Express, Google Gemini AI

## Project Structure

```
Ai-persona/
├── frontend/          # React application
├── backend/           # Node.js server
└── README.md
```

## API

Send a message to a mentor:

**POST** `/chat`
```json
{
  "persona": "hitesh" | "piyush",
  "message": "Your message here"
}
```

## License

ISC License
