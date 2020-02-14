FROM node:latest
RUN npm i -g nodemon
COPY entrypoint.sh /
RUN chmod +x entrypoint.sh
ENTRYPOINT [ "/entrypoint.sh" ]
CMD ["npm" , "run", "dev"]