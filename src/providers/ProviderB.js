
class ProviderB{
    async send(email , subject , body){
        if(Math.random() < 0.6) return true;
        throw new Error("ProviderB failed");
    }
}

module.exports = ProviderB;