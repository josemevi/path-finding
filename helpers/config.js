let config={
    dbUrl: process.env.DATABASE_URL || 'postgres://postgres:masterkey@localhost:5432/PathFinding',
    port:process.env.PORT || 3000
}

module.exports = config;