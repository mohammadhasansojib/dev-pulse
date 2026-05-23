# DevPulse
DevPulse is an Internal Tech Issue & Feature Tracker.

A collaborative platform for software teams to report bugs, suggest features, and coordinate resolutions.

## Table of content
- [Tech Stack](#tech-stack)
- [API Endpoints](#api-endpoints)
- [Project Architecture](#project-architecture)


## Tech Stack
- TypeScript
- NodeJS
- ExpressJS
- PostGreSQL
- bcrypt
- jsonwebtoken


## API Endpoints
### auth
- User Signup: `POST`-`/api/auth/signup`
- User Login: `POST`-`/api/auth/login`

### issue
- create issue: `POST`-`/api/issues`
- get all issues: `GET`-`/api/issues`
- get single issue: `GET`-`/api/issues/:id`
- update issue: `PATCH`-`/api/issues/:id`
- delete issue: `DELETE`-`/api/issues/:id`


## Project Architecture
```
dev-pulse/
├── .gitignore
├── package.json
├── pnpm-lock.yaml
├── src/
│   ├── app.ts
│   ├── config/
│   │   └── index.ts
│   ├── database/
│   │   └── index.ts
│   ├── middlewares/
│   │   └── auth.ts
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.interface.ts
│   │   │   ├── auth.route.ts
│   │   │   └── auth.service.ts
│   │   └── issue/
│   │       ├── issue.controller.ts
│   │       ├── issue.interface.ts
│   │       ├── issue.route.ts
│   │       └── issue.service.ts
│   ├── server.ts
│   └── utils/
│       ├── isOwnOpenIssue.ts
│       ├── removePassword.ts
│       └── response.ts
├── Readme.md
└── tsconfig.json
```

