module.exports = {
  registerDal: async (dbClient, userName, userEmail, hashPassword) => {
    const sqlQuery = `
    INSERT
      INTO
      Users ("userName",
      "userEmail",
      "userPassword")
    VALUES ($1, $2, $3)`;
    const parameters = [userName, userEmail, hashPassword];
    const queryResult = await dbClient.query(sqlQuery, parameters);
    return queryResult;
  },
  loginDal: async (dbClient, userEmail) => {
    const sqlQuery = `
      SELECT
        "userId",
        "userName",
        "userEmail",
        "userPassword"
      FROM
        Users
      WHERE
        "userEmail" = $1`;
    const parameters = [userEmail];
    const userDetails = await dbClient.query(sqlQuery, parameters);
    return userDetails.rows[0];
  }
};
