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

<img width="935" alt="Screenshot 2023-02-14 at 3 30 54 PM" src="https://user-images.githubusercontent.com/65979426/218887812-a38d1070-7af3-4839-ba1c-647b89c51300.png">

<img width="1209" alt="Screenshot 2023-02-14 at 3 30 23 PM" src="https://user-images.githubusercontent.com/65979426/218887802-3a8fb304-2f5b-48b6-bf0e-d97c4643fe4c.png">

<img width="660" alt="Screenshot 2023-02-14 at 3 48 40 PM" src="https://user-images.githubusercontent.com/65979426/218888722-ae700433-0c97-4118-80b5-1674ece7c79a.png">

<img width="653" alt="Screenshot 2023-02-14 at 3 48 30 PM" src="https://user-images.githubusercontent.com/65979426/218888719-be3ef693-c059-4ad3-8bea-57e5433947c4.png">

<img width="1209" alt="Screenshot 2023-02-14 at 3 34 54 PM" src="https://user-images.githubusercontent.com/65979426/218887863-82080d85-8dc9-496f-a3a6-f0d2967fec8f.png">

<img width="1077" alt="Screenshot 2023-02-14 at 3 36 00 PM" src="https://user-images.githubusercontent.com/65979426/218888045-3fdb8df5-7304-4927-aaa0-cfe0b568f055.png">

<img width="741" alt="Screenshot 2023-02-14 at 3 36 34 PM" src="https://user-images.githubusercontent.com/65979426/218888081-54dfab7f-b123-46b1-bdbd-48b838cd1953.png">

<img width="1016" alt="Screenshot 2023-02-14 at 3 39 19 PM" src="https://user-images.githubusercontent.com/65979426/218888085-fe5ea473-11d0-4551-87dd-6a6664728660.png">
