from kthse/kth-nodejs:12.0.0

COPY jstemplates jstemplates
COPY app.js app.js
COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install
RUN npm audit fix

CMD node app.js
