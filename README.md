# StockSimulator

A Next.JS App allowing users to simulate the Stock Market - start with $100,000 and see how you would fare against the Stock Market!

### LocalStorage Configuration for Stock Information:

stockSimulatorUser: {
currentBalance: int,
stocks: {
nameOfStock: int (Amount owned)
}
}

### Authentication Layout:

DynamoDB: userID | userData
userData: { password: string, balance: string, stocks: {}, apiKey: string }

Every Page: authenticate user using username and password OR API KEY
API Routes: Do the same
Upon Registration: Generate API Key, store password and issue APIKey to Client using a cookie
