const { createClient } =  require('redis');

const client = createClient({
    username: 'default',
    password: 'n4rNWAY2YA2CWS2IBCqbYXDlMt4sbQvF',
    socket: {
        host: 'redis-14488.c44.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 14488
    }
});

// tokenDenyList = [ ] => expire krane h 

client.on('error', err => console.log('Redis Client Error', err));

 client.connect();

client.on('connect', () => {
  console.log('Redis Database connected Successfully')
})

const memory = new Map();

const gcMemory = () => {
   const now = Date.now();
   for( const [k, exp] of memory.entries()){
        if(exp <= now){
           memory.delete(k)
        }
   }
}

setInterval(gcMemory, 60_000).unref();

// why ++
const deny = async(jti, ttlSeconds) => {
   if(!jti || !ttlSeconds){
    return;
   };
  
   if(client) {
     await client.set(`deny:${jti}`, '1', 'EX', ttlSeconds);
   }else{
      memory.set(jti, Date.now() + ttlSeconds * 1000)
   }
};

const isDenied = async(jti) => {
   if(!jti){
    return;
   }

   if(client){
      return (await client.exists(`deny:${jti}`) === 1)
   }else{
      const exp = memory.get(jti);
      if(!exp){
        return false;
      }

      if(exp <= Date.now()){
        memory.delete(jti);
        return false;
      }

      return true;
   }
}


module.exports = {
  deny,
  isDenied
}

