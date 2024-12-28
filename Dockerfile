FROM node:20

WORKDIR /stock-simulator
COPY stock-simulator/package*.json ./
RUN npm install
COPY stock-simulator/ ./
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
