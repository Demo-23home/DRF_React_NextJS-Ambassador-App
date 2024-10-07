# Use the official Python image for the backend
FROM python:3.9 AS backend

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Set the working directory in the container
WORKDIR /app

# Copy requirements file and install dependencies
COPY backend/requirements.txt /app/requirements.txt
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend application files
COPY backend /app

# Start the backend server
CMD ["sh", "-c", "python manage.py wait_for_db && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
