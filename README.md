# 🏡 HomeScape

**HomeScape** is a responsive full-stack web application built with the **MVC architecture**. It allows users to browse, review, and manage property listings. It features secure **user authentication**, **session management**, and a dynamic UI that adapts to all screen sizes.

---

## 🚀 Features

- 🔐 **User Authentication**: Login & Register securely with Passport.js and bcrypt
- 🏡 **Listings Management**: Users can create, view, edit, and delete listings *(only when logged in)*
- 📍 **Location Display**: Each listing shows the property location on the page
- ✍️ **Review System**: Authenticated users can add **multiple reviews** for each listing
- 🔒 **Authorization Control**:
  - Only logged-in users can create, edit, or delete listings or reviews
  - Unauthorized actions are blocked with error messages
- 🧭 RESTful Routing and MVC project structure
- 🔎 **Search Listings**: Users can search for listings by their **exact title name**
- 🛠️ Built using Express.js, Node.js, MongoDB, and Mongoose
- 📂 Modular routing for listings, reviews, and user routes
- 💾 MongoDB Atlas for remote database management
- 🔁 Session Management with secure cookies and `express-session`
- 📦 Flash messaging with `connect-flash`
- 🗄️ MongoDB session store using `connect-mongo`
- 🧠 Clean codebase with middlewares and utilities
- 🎨 Server-side rendering with EJS and `ejs-mate`
- 📱 Fully responsive design (works on mobile, tablet, and desktop)
- 🤖 After logging in, the user can view his profile

---

## 🧰 Tech Stack

- **Frontend:** HTML, CSS, Bootstrap, EJS, Responsive Design
- **Backend:** Node.js, Js, Express.js
- **Database:** MongoDB Atlas with Mongoose
- **Authentication:** Passport.js with Local Strategy
- **Middlewares Used:**
  - `express-session`
  - `connect-flash`
  - `connect-mongo`
  - `passport`, `passport-local`
  - `method-override`
  - `dotenv` (for environment variable management)
  - Custom error handling (`ExpressError`)

---


## 🖼️ Screenshots

### 📱 HomeScape Features
![Homepage Screenshot](./images/Macbook-Pro-home.png)

![Sign-up page Screenshot](./images/Macbook-Air-signup-front.png)

![Login Screenshot](./images/Macbook-Pro-login.png)

![Show Screenshot](./images/Macbook-Air-show-listing-front.png)

![Map & Review Screenshot](./images/Macbook-Air-map-front.png)


### 📱 Responsive Homepage

![Mobile View](./images/iPhone-14-Pro-home.png)

![Laptop View](./images/Macbook-Pro-home.png)

![Tablet View](./images/iPad-home.png)
