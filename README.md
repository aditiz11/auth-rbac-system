 Auth RBAC System
===================

Full-stack authentication system using **JWT + Role-Based Access Control**.

Features
-----------

*   Login & Register
    
*   JWT Authentication
    
*   USER / ADMIN roles
    
*   Protected routes
    
*   API integration (Axios)
    

Tech Stack
-------------

*   Frontend: React, TypeScript, Tailwind
    
*   Backend: Spring Boot, Spring Security, JWT
    

📁 Structure
------------

*   frontend/ # React app
    
*   backend/ # Spring Boot app
    

⚙️ Run Locally
--------------

### Backend

cd backend mvn spring-boot:run

### Frontend

cd frontend npm install npm run dev

🔑 API
------

*   POST /auth/register
    
*   POST /auth/login
    
*   GET /user (USER)
    
*   GET /admin (ADMIN)
    

🔐 Flow
-------

Login → JWT → localStorage → Axios header → Backend validates → Role-based access
