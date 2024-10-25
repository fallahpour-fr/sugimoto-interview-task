# Books and Authors Project

This project manages a database of books and authors, where each book can have multiple authors, and each author can write multiple books. The application provides an interface to retrieve data on books and authors with various filtering and sorting options.

## Table of Contents
1. [Project Structure](#project-structure)
2. [Setup Instructions](#setup-instructions)
3. [Design Choices](#design-choices)
4. [Query Logic](#query-logic)

## Project Structure

- **models/**: Contains Sequelize models for `Author`, `Book`, and `AuthorBooks` (pivot table for many-to-many relationship).
- **controllers/**: Contains functions for handling database queries.
- **routes/**: Defines API routes for retrieving books and authors.
- **migrations/**: Contains Sequelize migrations to set up the database schema.

## Setup Instructions

### Prerequisites
1. **Node.js**: Ensure Node.js (v12 or later) is installed.
2. **PostgreSQL**: Ensure PostgreSQL is installed and running.
3. **Sequelize CLI**: Install the Sequelize CLI globally for running migrations.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/books-authors-project.git
   cd books-authors-project


2.Install dependencies
npm install

3.Configure Database

4.Run Migrations
npx sequelize db:create
npx sequelize db:migrate

5.Start the Server
npm start

6.API Endpoints

-Retrieve all books with author names, sorted by price:
GET /books?year=2023&sort=price_desc

-Retrieve authors with more than 5 books:
GET /authors?min_books=5

## Design Choices

Database Structure:
Books and Authors: This project uses a many-to-many relationship between books and authors. We use a pivot table, AuthorBooks, to link Authors and Books tables, allowing each book to have multiple authors and each author to have multiple books.
Sequelize ORM:
We chose Sequelize for ORM functionality, which simplifies database operations and manages migrations effectively.
Flexible Filtering and Sorting:
Implemented query parameters for filtering by year of publication and sorting by price in descending order to ensure efficient retrieval based on user requirements.