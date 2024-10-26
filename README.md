# DYN_QU_ASSESSMENT

## Prerequisites

- Docker
- Docker Compose

## Getting Started

Follow these instructions to get the project up and running with Docker Compose.

### Build and Run the Project

1. Clone the repository:

   ```sh
   git clone https://github.com/OAOisme/DYN_QU_ASSESSMENT.git
   cd DYN_QU_ASSESSMENT
   ```

2. Define environment for your database and node application in the docker-compose.yml file

3. Build and start the containers:

   ```sh
   docker-compose up --build
   ```

4. Open your browser and navigate to `http://localhost:80` (or the port specified in your Dockerfile).

### Stopping the Containers

To stop the running containers, use:

```sh
docker-compose down
```
