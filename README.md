The goal of this challenge is to produce a web app that acts primarily as an API web service. There will be 3 main entities: User, Car and Location. You should create the database as you see fit and use any third-party libraries relevant for the purpose.

When evaluating the challenge, we look primarily at code structure, aesthetics, good programming practices, use of framework utilities and in general your way of thinking as a developer.


## User Stories:
● A User can either be a manager or a driver;
● A User can login into the platform;
● A manager can manage (create, update, delete) several drivers;
● A driver must have at least one car associated;
● A driver can manage (create, update, delete) his cars;
● A driver must have a location (home)
● A car is identified, at least, by: brand, model and plate number ;
● A car has a current geographical location;
● A guest can only view a map with the current geographical location of each car
● A guest can search cars by brand and by proximity (it must give a latitude, a longitude and a
radius)


As said above you should be developing this web app as an API web service so, all HTTP responses should contain valid JSON.