const { createClient } =  require('redis');

const client = createClient({
    username: 'default',
    password: 'n4rNWAY2YA2CWS2IBCqbYXDlMt4sbQvF',
    socket: {
        host: 'redis-14488.c44.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 14488
    }
});

client.on('error', err => console.log('Redis Client Error', err));

 client.connect();

client.on('connect', () => {
  console.log('Redis Database connected Successfully')
})

client.set('name', 'manish uchit');


