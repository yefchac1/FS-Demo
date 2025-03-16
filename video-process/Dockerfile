# Use Official Node.js image

FROM node:18

# Set the working directory in the container to /app

WORKDIR /app

# Copy package.json and package-lock.json to the working directory

COPY package*.json ./

# Install ffmpeg

RUN apt-get update && apt-get install -y ffmpeg

# Install any needed pacakges specified in package.json

RUN npm install

# Copy all files from the current directory to the working directory in the container

COPY . .

#Make port 3000 available to the world outside this container

EXPOSE 3000

# Define the command to run the application using CMD (which is npm start). CMD is used to provide default values for an executing container and can be used only once in a Dockerfile.

CMD [ "npm" , "start" ]
