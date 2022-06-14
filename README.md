## NestJS-Prisma-PostgreSQL-React-ReduxJS/Toolkit

### Installation

1. Install dependencies: `npm install`
2. Start a PostgreSQL database with docker using: `docker-compose up -d`. 
    - If you have a local instance of PostgreSQL running, you can skip this step. 
3. Create a `.env` file and add the `DATABASE_URL` environment variable with a [PostgreSQL connection string](https://www.prisma.io/docs/concepts/database-connectors/postgresql#connection-details).
    - The `.env.example` file is provided as reference. 
4. Apply database migrations: `npm run setup` 
5. Start the project:  `npm run start:dev`
6. Access the project at http://localhost:5000/ for the built react app or http://localhost:5000/docs for the swagger docs and http://localhost:5000/api for accessing api endpoints
7. Run the React app in dev out of the `frontend` directory with `npm run start`