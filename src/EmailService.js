
const ProviderA = require("./providers/ProviderA");
const ProviderB = require("./providers/ProviderB");

class EmailService{
    constructor(){
        this.providers = [new ProviderA() , new ProviderB()];
        this.attemptMap = new Map();
        this.timestamps = [];
        this.rateLimit = 5; 
    }

    isRateLimited() {
        const now = Date.now();
        this.timestamps.push(now);
        while(this.timestamps.lenght && now - this.timestamps[0] > 60000){
            this.timestamps.shift();
        }

        return this.timestamps.length > this.rateLimit;
    }

    async retryWithBackoff(fn , retries = 3){
        for(let i = 0; i < retries; i++){
            try{
                return await fn();    
            }catch(err){
                await new Promises(res => setTimeout(res , 2 ** i * 1000));
            }
        }
        throw new Error("All retires failed");
    }

    async sendEmail( id , email , subject , body){

        if(this.attemptMap.has(id)) return "Already sent";
        if(this.isRateLimited()) return "Rate limit exceeded";

        let lastError = null;

        for(const provider of this.providers){
            try{
                await this.retryWithBackoff(() => provider.send(email , subject , body));
                this.attemptMap.set(id , true);
                return "Email sent successfully";
            } catch (err){
                lastError = err;
            }
        }

        return `All providers failed : ${lastError.message}`;

    }
}

module.exports = EmailService;