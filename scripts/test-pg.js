const { Client } = require('pg');

const passwords = ['', 'postgres', 'admin', 'password', '1234', 'root'];
const users = ['postgres', 'root'];

async function testConnections() {
  for (const user of users) {
    for (const password of passwords) {
      const connectionString = `postgresql://${user}:${password}@localhost:5432/postgres`;
      const client = new Client({ connectionString });
      try {
        await client.connect();
        console.log(`SUCCESS: ${connectionString}`);
        await client.end();
        return;
      } catch (err) {
        // console.error(`Failed: ${connectionString} - ${err.message}`);
      }
    }
  }
  console.log("FAILED ALL");
}

testConnections();
