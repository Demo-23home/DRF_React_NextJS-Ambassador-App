# Ambassador Management Application

![Ambassador Logo](./ambassador360-high-resolution-logo%20(1).png)
## Table of Contents

- [Overview](#overview)
- [Features](#features)
  - [Ambassadors](#ambassadors)
  - [Admins](#admins)
  - [Payments](#payments)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Project Setup](#project-setup)
  - [Docker Setup](#docker-setup)
- [API Documentation](#api-documentation)

## Overview

The **Ambassador Management Application** is a full-stack web application designed to facilitate the management of ambassadors who promote and sell products. Admins can manage products, ambassadors, and track orders, while ambassadors can purchase products and track their sales. The application integrates Stripe for payment processing and uses Docker for containerization.

## Features

### Ambassadors

- **Product Browsing:** View and search through available products.
- **Purchase Products:** Add products to the cart and complete purchases.
- **Profile Management:** Update personal information and view sales rankings.
- **Order Tracking:** Monitor order statuses and view purchase history.

### Admins

- **Product Management:** Create, read, update, and delete products.
- **Ambassador Management:** Manage ambassador profiles and track their performance.
- **Order Tracking:** View and manage all orders and order items.
- **Revenue Tracking:** Monitor revenue generated from orders.

### Payments

- **Stripe Integration:** Secure payment processing for product purchases.
- **Order Confirmation:** Automatically confirm orders upon successful payment.
- **Email Notifications:** Send order confirmation emails using MailHog for testing.

## Technologies Used

### Frontend

- **React:** Frontend library for building user interfaces.
- **Next.js:** Framework for server-side rendering and handling payment flows.
- **Redux:** State management.
- **Material UI:** UI component library for styling.
- **Axios:** HTTP client for API requests.

### Backend

- **Django:** Web framework for backend development.
- **Django REST Framework (DRF):** Toolkit for building Web APIs.
- **PostgreSQL:** Relational database.
- **Redis:** In-memory data store for caching.
- **Stripe:** Payment gateway integration.
- **MailHog:** Email testing tool.
- **JWT:** JSON Web Tokens for authentication.

### DevOps

- **Docker:** Containerization of the application.
- **Docker Compose:** Orchestration of multi-container Docker applications.

## Architecture

The application follows a **client-server architecture** with a **RESTful API** backend built using Django and DRF, and a **React/Next.js** frontend. Docker is used to containerize the application, facilitating easy deployment and scalability.

## Installation

### Prerequisites

- **Docker & Docker Compose:** Ensure Docker is installed on your machine. [Install Docker](https://docs.docker.com/get-docker/)


### Project Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Demo-23home/DRF_React_NextJS-Ambassador360.git
   cd DRF_React_NextJS-Ambassador360.git
   ```
2. **.env File**

Create a file named `.env` in the root directory of your project and add the following variables:
```bash
SECRET_KEY=your_django_secret_key
DEBUG=True
DATABASE_NAME=your_db_name
DATABASE_USER=your_db_user
DATABASE_PASSWORD=your_db_password
DATABASE_HOST=db
DATABASE_PORT=5432
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```


1. ***Build and Run Containers:***

### Docker Setup
```bash
docker-compose up --build
```
2. ***Access Services:***

* Backend API: http://localhost:8000/api/
* Admin Application: http://localhost:3000/
* Ambassador Application: http://localhost:4000/
* Payment Gateway Application: http://localhost:5000/
* MailHog UI: http://localhost:8025/

### API Documentation
The project includes Swagger and DRF-YASG for API documentation. Access the API docs at:

* Postman API Docs: https://documenter.getpostman.com/view/29368996/2sAXqzYeaV
* Swagger UI: http://localhost:8000/api/docs/


