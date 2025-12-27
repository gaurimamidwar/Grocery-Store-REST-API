FROM python:3.10-slim

WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy project files
COPY . .

# Collect static files
RUN python manage.py collectstatic --noinput

# Expose port
EXPOSE 9000

# Start Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:9000", "grocery_store.wsgi:application"]