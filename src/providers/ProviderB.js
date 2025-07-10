
class ProviderB{
    constructor(successRate = 0.6){
        this.successRate = successRate
    }
    async send(email , subject , body){
        if(Math.random() < this.successRate) return true;
        throw new Error("ProviderB failed");
    }
}

module.exports = ProviderB;