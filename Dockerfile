# Base image
FROM ubuntu:latest

# Install required packages: FFmpeg and Apache
RUN apt-get update && apt-get install -y \
    ffmpeg \
    apache2 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create directory for HLS stream
RUN mkdir -p /var/www/html/stream

# Expose port 80 for Apache
EXPOSE 80

# Start FFmpeg and Apache
CMD ffmpeg -i "https://d1g8wgjurz8via.cloudfront.net/bpk-tv/Zeebangla1/default/zeebangla1.m3u8" \
-vf scale=426:240 \
-c:v libx264 \
-preset veryfast \
-c:a aac \
-hls_time 20 \
-hls_list_size 100 \
-hls_flags delete_segments \
-f hls /var/www/html/stream/output.m3u8 && \
apachectl -D FOREGROUND
