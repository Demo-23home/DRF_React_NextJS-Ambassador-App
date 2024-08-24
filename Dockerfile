# FROM python:3.9
# ENV PYTHONUNBUFFERED 1
# WORKDIR /app
# COPY requirements.txt /app/requirements.txt
# RUN pip install -r requirements.txt
# COPY . /app

# CMD python manage.py runserver 0.0.0.0:8000


# Use the official Python image from Docker Hub
FROM python:3.9

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt /app/requirements.txt

# Install dependencies from the requirements file
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . /app

# Run the Django server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
