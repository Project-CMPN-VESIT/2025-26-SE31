import bcrypt from 'bcrypt';
async function test() {
  try {
    const hash = await bcrypt.hash('password', 10);
    console.log('Hash:', hash);
    const match = await bcrypt.compare('password', hash);
    console.log('Match:', match);
  } catch (e) {
    console.error('Bcrypt Error:', e);
  }
}
test();
