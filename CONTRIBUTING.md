# Contributing to CodeArena

Thank you for your interest in contributing to CodeArena! This document provides guidelines for contributing to the project.

## Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/Aman-81/CodeArena.git
   cd CodeArena
   ```

3. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas account)
- Redis instance
- API keys for external services (Judge0, Google Gemini, Cloudinary)

### Backend Setup
```bash
cd backend
npm install
cp src/.env.example src/.env
# Edit src/.env with your actual credentials
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your backend URL
npm run dev
```

## Code Style Guidelines

- Use meaningful variable and function names
- Add comments for complex logic
- Follow existing code structure and patterns
- Use ES6+ features where appropriate

## Commit Message Guidelines

- Use clear and descriptive commit messages
- Start with a verb in present tense (e.g., "Add", "Fix", "Update")
- Keep the first line under 72 characters
- Add detailed description if needed

Example:
```
Add AI chat feature for problem hints

- Integrated Google Gemini API
- Created ChatAi component
- Added context-aware responses
```

## Pull Request Process

1. Update documentation if needed
2. Test your changes thoroughly
3. Create a pull request with a clear description
4. Link any related issues
5. Wait for code review

## Reporting Issues

When reporting issues, please include:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, Node version, etc.)

## Questions?

Feel free to open an issue for any questions or concerns.

---

**Thank you for contributing!** 🎉
