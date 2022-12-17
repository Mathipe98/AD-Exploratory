# AD-Exploratory
Repo for AD Lab 5 - Exploratory lab w/Docker

# Starting the containers & initializing database

We have 3 containers:

* Backend (server)
* Frontend (client)
* Database (Apache Derby)

Normally, you'd run these as combined or separate containers individually. We have split them up like this for simplicity, and 
we've made use of docker-compose in order to run and configure them all at the same time.

Each container has its corresponding Dockerfile and section in the file docker-compose.yml

The database-container is taken from [this Github-repo](https://github.com/aditosoftware/docker-derby).

In order to run the containers, you just have to navigate into the root-folder of the github repo (after cloning),
and run the following command:

```
docker-compose up --build
```

..and that's it! The client will now be available at `http://localhost:3000`, the server at `http://localhost:8080`,
and the database at `http://localhost:1527`. However the containers themselves don't use these URLs directly as they
communicate between themselves within a Docker network.

## Database
The database isn't initialized when starting the application. And we also didn't want to add a startup-code which would reset
the database upon every start (since we want the database to persist).

Therefore one has to manually initialize it when building the containers. The way to do that, is simply to access the following
URL (after having ran the previous docker-compose command):

```
http://localhost:8080/RestADServer4/api/admin/init?pass=supersecretpassword123
```

This triggers a specific endpoint we created for this purpose. So accessing this URL will make sure that the user- and 
image-tables are created and reset.