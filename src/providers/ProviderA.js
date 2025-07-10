
class ProviderA{

    constructor(successRate = 0.7){
        this.successRate = successRate
    }
    async send(email , subject , body){
        if(Math.random() < this.successRate) return true;
        throw new Error("ProviderA failed");
    }
}

module.exports = ProviderA;