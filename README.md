# Install module

```bash

npm install

```

# Client connect and Message

Client Connect websocket at localhost

```bash
 ws://localhost:8080
```

## Client message send control start or stop record

For start record

{"event":"answer","payload":{"uuid":"axssfaf-cwfwer"}}

For stop record

{"event":"hangup","payload":{"uuid":"axssfaf-cwfwer"}}

# Config .env

client temp path screen record

TEMP_PATH="/Users/phonthakorn/project/screen-record/rec/"

server store file screen record

REMOTE_PATH="/var/voice_record/"

```
FFMPEG PARAM for macos "-f avfoundation -i 2 -framerate 15"
for windows "ffmpeg -f dshow -i video='screen-capture-recorder' -framerate 15 "
ref: https://trac.ffmpeg.org/wiki/Capture/Desktop
```

FFMPEG_PARAM="-f avfoundation -i 2 -framerate 15"

Format file out put

FFMPEG_OUT_FORMAT="mkv"

## SFTP upload file from client to server

SFTP_HOST="127.0.0.1"

SFTP_PORT="22"

SFTP_USERNAME="dev"

SFTP_PASSWORD="dev"
