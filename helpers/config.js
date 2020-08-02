let config={
    dbUrl: 'postgres://mezmtygjrnpavo:a48cf9f92146b0aa870a0f5f9e0cec305607cdba4b940983f6d9557807a7b85a@ec2-54-217-224-85.eu-west-1.compute.amazonaws.com:5432/d12pide2qkscqq' || 'postgres://postgres:masterkey@localhost:5432/PathFinding',
    port:process.env.PORT || 3000
}

module.exports = config;