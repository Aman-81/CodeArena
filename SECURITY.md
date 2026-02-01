# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in CodeArena, please report it by emailing the project maintainer. **Do not** create a public GitHub issue for security vulnerabilities.

### What to Include

When reporting a vulnerability, please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response Time

We aim to respond to security reports within 48 hours and will keep you updated on the progress of fixing the vulnerability.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Security Best Practices

When deploying CodeArena:

1. **Environment Variables**
   - Never commit `.env` files to version control
   - Use strong, unique passwords for all services
   - Rotate API keys regularly

2. **Database Security**
   - Use MongoDB Atlas with IP whitelisting
   - Enable authentication on MongoDB
   - Use strong passwords for database users

3. **API Keys**
   - Store API keys securely in environment variables
   - Never expose API keys in client-side code
   - Use separate keys for development and production

4. **Redis**
   - Use password authentication
   - Enable TLS if your Redis instance supports it
   - Restrict network access to Redis

5. **JWT Tokens**
   - Use a strong, random JWT secret
   - Set appropriate token expiration times
   - Implement token refresh mechanisms

## Known Security Considerations

- This project uses third-party APIs (Judge0, Google Gemini) - ensure you understand their security policies
- User-submitted code is executed via Judge0 - this is sandboxed but review Judge0's security documentation
- Implement rate limiting in production to prevent abuse
