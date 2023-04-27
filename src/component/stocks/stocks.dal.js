module.exports = {
  addStockDal: async (dbClient, parameters) => {
    const sqlQuery = `
    INSERT INTO stocks(
      "userId", symbol, "companyName", price, 
      "open", "high", "low"
    ) 
    VALUES 
      ($1, $2, $3, $4, $5, $6, $7)`;
    const result = await dbClient.query(sqlQuery, parameters);
    return result;
  },
  getStocksDal: async (dbClient, parameter) => {
    const sqlQuery = `
    SELECT 
      stocks."stockId",
      stocks.symbol, 
      stocks."companyName", 
      stocks.price, 
      stocks.open, 
      stocks.high, 
      stocks.low, 
      stocks."createAt" 
    FROM 
      stocks 
    WHERE 
      stocks."userId" = $1;
    `;
    const result = await dbClient.query(sqlQuery, parameter);
    return result;
  },
  deleteStockDal: async (dbClient, parameters) => {
    const sqlQuery = `
    DELETE FROM 
      stocks 
    WHERE
      stocks."userId" = $1
    AND   
      stocks.symbol = $2
    `;
    const result = await dbClient.query(sqlQuery, parameters);
    return result;
  },
  addTriggerDal: async (dbClient, parameters) => {
    const sqlQuery = `
     INSERT INTO triggers(
        "stockId", "category", "alertPrice"
      ) 
      VALUES 
        ($1, $2, $3);
     `;
    const result = await dbClient.query(sqlQuery, parameters);
    return result;
  },
  getTriggersDal: async (dbClient) => {
    const sqlQuery = `
    SELECT 
      triggers."triggerId",
      triggers."stockId", 
      triggers."category", 
      triggers."alertPrice", 
      stocks.symbol,
      stocks."companyName", 
      users."userName", 
      users."userEmail" 
    FROM 
      triggers 
    JOIN stocks ON triggers."stockId" = stocks."stockId" 
    JOIN users ON users."userId" = stocks."userId";
    `;
    const result = await dbClient.query(sqlQuery);
    return result.rows;
  },
  deleteTriggerDal: async (dbClient, parameter) => {
    const sqlQuery = `
    DELETE FROM 
      triggers 
    WHERE 
      triggers."stockId" = $1;
    `;
    const result = await dbClient.query(sqlQuery, parameter);
    return result.rows;
  }
};
