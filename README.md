# Caprae Capital AI-Readiness Challenge - Lead Generation Tool

A modern lead generation tool built for Caprae Capital's AI-Readiness Challenge. This tool helps identify and manage potential leads for AI implementation in businesses.

## Features

- Modern, responsive UI built with React and Material-UI
- Real-time lead filtering and search capabilities
- Lead scoring based on AI readiness criteria
- Export functionality for lead data
- RESTful API backend with FastAPI
- Secure authentication system
- Comprehensive lead management dashboard

## Tech Stack

- Frontend: React, Material-UI, TypeScript
- Backend: FastAPI, Python
- Database: SQLite (can be easily migrated to PostgreSQL)
- Authentication: JWT-based authentication

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 14+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/neha222222/LeadGen-AI.git
cd LeadGen-AI
```

2. Set up the backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. Set up the frontend:
```bash
cd frontend
npm install
```

4. Create a `.env` file in the backend directory with the following variables:
```
SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///./leads.db
```

### Running the Application

1. Start the backend server:
```bash
cd backend
uvicorn main:app --reload
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## API Documentation

Once the backend server is running, you can access the API documentation at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
