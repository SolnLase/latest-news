# Latest News
This is a web application based on React, Redux (for managing states, instead of keyword arguments in URL) and external API provied by newsdata.io to view the latest news from all around the globe, also based on filters and queries.
You can apply filters by checking them and closing all menus (including sidebar on smaller devices).
> It can show the same result when scrolling down since 
*newsdata.io* sometimes sends results with nextPage=None, which results in me sending them request with the keyword argument page=None. I have reported that, and they are working on it.

## Installation
You can:
- install it and run it on *node server* using **npm install** and **npm start**
- run it on *nginx server* without ssl in development using *docker-compose.dev.yml* file with the command: **docker compose -f ./docker-compose.dev.yml up -d**
- run it on *nginx server* with ssl in production using *docker-compose.yml* file with the command: **docker compose up -d**

If you running it on *node server* you need to add *.env* file with the variable *REACT_APP_API_KEY* to wich you add value of your *api key* from *newsdata.io*.

If you are running it on *nginx server* you need to add *.env.apikey* file with the variable *API_KEY*.

If you are running it in *production* with *ssl* you need copy the content of *default.conf.template* to another *conf* file which you bind into a file in *docker container* in *conf.d* directory in *docker-compose.yml* with replacing *API_KEY* variable with your valid *api key*. Then you run the script from: *https://pentacent.medium.com/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71* with the instructions in this article.
> When running it using *envsubst* for *default.conf.template* challanges fail. I haven't solved out how to rewrite the script to work with *envsubst* yet.
