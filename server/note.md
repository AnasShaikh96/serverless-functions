
# docker run command



# docker pull postgres // pull postgres image
# docker run --name serverless-db -e POSTGRES_PASSWORD=pass@123 -p 5432:5432 -d postgres // create a new image set env and post
# docker ps  // lists down docker containers

# docker inspect <container_id>

<!-- run postgres terminal-->
# docker exec -it postgres-db psql -U postgres
# \l

<!-- Move to pgadmin now -->

register server
name of your server => serverless-db


<!-- pgAdmin -->
username: postgres

hostname: host.docker.internal
PASSWORD WHILE CREATING SERVER: admin 


<!-- misc -->


<!-- this outputs running if image is running else does nothing -->
docker ps --filter "ancestor=$container-name" --format '{{.State}}'