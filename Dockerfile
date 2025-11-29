FROM node:20-alpine 
# AS builder

WORKDIR /app

COPY src/test-node.js /app/test-node.js

EXPOSE 3010

CMD ["node", "test-node.js"]