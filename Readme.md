# DevPulse
DevPulse is an Internal Tech Issue & Feature Tracker.

A collaborative platform for software teams to report bugs, suggest features, and coordinate resolutions.

## Table of content
- [Live URL](#live-url)
- [Features](#features)
- [Setup Steps](#setup-steps)
- [Database Schema](#database-schema)
- [Tech Stack](#tech-stack)
- [API Endpoints](#api-endpoints)
- [Project Architecture](#project-architecture)



## Live URL
https://dev-pulse-0fim.onrender.com/

## Features
- User signup & login
- Issue management
    - create issue
    - get all issue
    - get single issue
    - update issue
    - delete issue

## Setup steps
By running these commands into terminal you can run the project:

1. clone github repo
```
git clone https://github.com/mohammadhasansojib/dev-pulse
```

2. go to the folder
```
cd dev-pulse
```

3. Install dependencies and compile typescript
```
pnpm run build
```

4. run the server
```
pnpm start
```

## Database Schema
users table:
```
id -> auto increment, primary key
name -> text max 20 characters & required
email -> unique text & required
password -> normal text, required
role -> role enum("maintainer" or "contributor), default "contributor"
created_at -> time stamp default current time & date
updated_at -> time stamp default current time & date
```

issues table:
```
id -> auto increment, primary key
title -> text max 150 characters & required
description -> text minimum 20 characters, required
type -> issue type enum("bug", "feature_request")
status -> issue status enum("open", "in_progress", "resolved"), default 'open'
reporter_id -> integer, foreign key for id field in users table, on delete cascade
created_at -> time stamp default current time & date
updated_at -> time stamp default current time & date
```

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

