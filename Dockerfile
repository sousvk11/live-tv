# Base image
FROM ubuntu:latest

# Install required packages: FFmpeg and Apache
RUN apt-get update && apt-get install -y \
    ffmpeg \
    apache2 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create directory for HLS stream
RUN mkdir -p /var/www/html

# Create a startup script
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Expose port 80 for Apache
EXPOSE 80

# Use the startup script as the command
CMD ["/start.sh"]
