# Message Board Application

A simple message board application with a NodeJS backend and HTML/CSS/JS frontend.

## Features

- Post messages with username and timestamp
- View all messages
- Delete messages
- Toggle between light and dark themes
- Configure the microservice URL
- Set your username

## Project Structure

- `index.js`: NodeJS microservice for message management
- `index.html`: Frontend HTML structure
- `script.js`: Frontend JavaScript functionality
- `style.css`: Frontend styling

## API Endpoints

### Test Route
- `GET /test/*`: Returns a JSON object with the message

### Counter Routes
- `GET /cpt/query`: Returns the current counter value
- `GET /cpt/inc`: Increments the counter by 1 and returns `{"code": 0}`
- `GET /cpt/inc?v=X`: Increments the counter by X and returns `{"code": 0}` if X is an integer, otherwise returns `{"code": -1}`

### Message Routes
- `GET /msg/get/X`: Returns the message at index X
- `GET /msg/getAll`: Returns all messages
- `GET /msg/nber`: Returns the number of messages
- `GET /msg/post/MESSAGE?pseudo=USERNAME`: Posts a new message with the given username
- `POST /msg/post`: Posts a new message with JSON payload `{"msg": "message", "pseudo": "username"}`
- `GET /msg/del/X`: Deletes the message at index X

## Running Locally

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   npm start
   ```

3. Open your browser and navigate to `http://localhost:8080`

## Deployment

### Deploying to Render.com

1. Create a new GitHub or GitLab repository and push your code.

2. Sign up for [Render.com](https://render.com/).

3. Create a new Web Service:
   - Connect your GitHub/GitLab repository
   - Set the build command to `npm install`
   - Set the start command to `npm start`
   - Choose a free or paid plan based on your needs

4. Once deployed, you can access your application at the URL provided by Render.

## Configuration

The frontend can be configured to connect to any microservice URL by clicking the "Configure Service URL" button and entering the URL of your deployed microservice.
