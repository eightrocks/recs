# Use Python 3.9 slim image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy requirements.txt and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the dbt project
COPY . .

# Copy profiles.yml to ~/.dbt/
RUN mkdir -p ~/.dbt && cp .dbt/profiles.yml ~/.dbt/

# Install dbt dependencies
RUN dbt deps

# Default command (can be overridden in compose)
CMD ["dbt", "run"]