# Ada Capstone Project: readdit

## Deployed Web App
- https://capstone-bookclub.web.app/
- https://capstone-bookclub.firebaseapp.com/

## Capstone Learning Goals

- Complete product life cycle from conception to delivery and deployment while demonstrating self-direction and independent learning of new technology
- Practice React.js and learn new React tools (Router library, Context)
- Learn how to develop backend with an app development platform (Google Firebase)
- Learn other new technologies: noSQL database (Google Firestore), deployment though Google Cloud, user authenticatin  (Firebase), Bootstrap

## Problem Statement 

Readdit is a web app allows people to participate in book clubs virtually. Users can join to create and manage book clubs, discover new books, and participate in discussions.

### MVP Feature Set
1. Create book club
2. Search books
    - Users can search and add a book to a book club
    - Search results from Google Books API display cover, full title, author, release year
3. Post comment
    - Post and delete a comment on the selected book page
4. View comments
    - User will be able to view other members’ comments on a specific book

**Additional Features**
- Login and Sign up with email/password or Google provider
    - After logging in, users will be able to:
        - update and delete book clubs they created
        - post and delete comments on book club home page
    - Firebase rules allow reading data, but not update and delete operations if user not logged

### Technologies
1. Front-end: React.js
2. Back-end: Google Firebase
3. Database: Google Cloud Firestore 
4. Deployment: Google Firebase Hosting
5. External APIs: Google Books API
6. Additional: Google Firebase Authentication, Bootstrap

