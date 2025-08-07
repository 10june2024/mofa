# Specify base image
FROM node:18-alpine

# Specify working directory
WORKDIR /Iiannxihw7shadbG

# Copy package.json 
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port 3000
EXPOSE 3000

# Run the app
CMD ["node", "app.js"]
