#!/bin/bash

# Start FFmpeg
ffmpeg -i "https://d1g8wgjurz8via.cloudfront.net/bpk-tv/Zeebangla1/default/zeebangla1.m3u8" \
-vf scale=426:240 \
-c:v libx264 \
-preset veryfast \
-c:a aac \
-hls_time 20 \
-hls_list_size 100 \
-hls_flags delete_segments \
-f hls /var/www/html/output.m3u8 &

# Start Apache
apachectl -D FOREGROUND
