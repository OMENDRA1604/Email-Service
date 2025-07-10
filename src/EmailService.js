
const ProviderA = require("./providers/ProviderA");
const ProviderB = require("./providers/ProviderB");
const logger = require('./utils/logger');

class EmailService{
    constructor(){
        this.providers = [new ProviderA(0.8) , new ProviderB(0.5)];
        this.attemptMap = new Map();
        this.timestamps = [];
        this.rateLimit = 5; 
    }

    isRateLimited() {
        const now = Date.now();
        this.timestamps.push(now);
       
        while(this.timestamps.length && now - this.timestamps[0] > 60000){
            this.timestamps.shift();
        }
        logger.info(`Rate limit check: ${this.timestamps.length}/5 in last 60s`);
        return this.timestamps.length > this.rateLimit;
    }

    async retryWithBackoff(fn , retries = 3){
        for(let i = 0; i < retries; i++){
            try{
                return await fn();    
            }catch(err){
                logger.warn(`Retry ${i + 1} failed : ${err.message}`)
                await new Promise(res => setTimeout(res , 2 ** i * 1000));
            }
        }
        throw new Error("All retries failed");
    }

    async sendEmail( id , email , subject , body){

        if(this.attemptMap.has(id)){
            logger.warn(`Email with ID ${id} already sent`);
            return "Already sent";
        }
        if(this.isRateLimited()){
            logger.warn(`Rate limit exceeded for request ${id}`);
            return "Rate limit exceeded";
        }

        let lastError = null;

        for(const provider of this.providers){
            const providerName = provider.constructor.name;
            logger.info(`Trying ${providerName} for ID ${id}`);
            try{
                await this.retryWithBackoff(() => provider.send(email , subject , body));
                logger.info(`Success : Email sent via ${providerName} for ID ${id}`);
                this.attemptMap.set(id , true);
                return "Email sent successfully";
            } catch (err){
                logger.warn(`${providerName} failed for ID ${id} : ${err.message}`);
                lastError = err;
            }
        }

        logger.error(`All providers failed for email ID ${id} : ${lastError.message}`);
        return `All providers failed : ${lastError.message}`;

    }
}

module.exports = EmailService;