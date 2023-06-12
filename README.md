# Latest News
This project is a global news viewer, designed as a web application to keep users up-to-date with the latest happenings from around the world. Built using React and Redux for efficient state management, the application taps into the comprehensive resources of newsdata.io via an external API. The application's strength lies in its robust filtering capabilities; users can personalize their news feed by selecting filters and closing all menus, a feature that also extends to the sidebar on smaller devices. By combining modern technology with user-friendly design, this application offers an engaging and personalized news experience.

> Api keys in older version of this repository, when this repository wasn't public yet, aren't valid.

> It can show the same result when scrolling down since 
*newsdata.io* sometimes sends results with nextPage=None, which results in the app sending them request with the keyword argument page=None. I have reported that, and they are working on it.

## Preview
The preview of this project is available under this address: spotlatestnews.com

## Installation
You can:
- install it and run it on *node server* using **npm install** and **npm start**
- run it on *nginx server* without ssl in development using *docker-compose.dev.yml* file with the command: **docker compose -f ./docker-compose.dev.yml up -d**
- run it on *nginx server* with ssl in production using *docker-compose.yml* file with the command: **docker compose up -d**

If you running it on *node server* you need to add *.env* file with the variable *REACT_APP_API_KEY* to wich you add value of your *api key* from *newsdata.io*.

If you are running it on *nginx server* you need to add *.env.apikey* file with the variable *API_KEY*.

If you are running it in *production* with *ssl* you need copy the content of *default.conf.template* to another *conf* file which you bind into a file in *docker container* in *conf.d* directory in *docker-compose.yml* with replacing *API_KEY* variable with your valid *api key*. Then you run the script from: *https://pentacent.medium.com/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71* with the instructions in this article.
> When running it using *envsubst* for *default.conf.template* challanges fail. I haven't solved out how to rewrite the script to work with *envsubst* yet.
