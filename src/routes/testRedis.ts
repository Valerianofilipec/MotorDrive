import {createClient} from 'redis';

export const Redis = async ()=>{
    const client = createClient();
    client.on('error', (err) => console.log('Redis Client Errror', err));
    await client.connect();

    await client.set('key', 'value');
    const value = await client.get('key');
}
