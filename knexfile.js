module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./src/db/users.db3"
    },
    migrations: {
      directory: "./src/migrations"
    },
    seeds: {
      directory: "./src/seeds"
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    }
  }
};
