const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = 'okaymani105@gmail.com';
  const newPassword = 'Password123!'; // New temporary password
  const hashedPassword = await bcrypt.hash(newPassword, 12);

  const updated = await prisma.user.update({
    where: { email: email.toLowerCase().trim() },
    data: { hashedPassword }
  });

  console.log(`\n==========================================`);
  console.log(`Password successfully reset for: ${email}`);
  console.log(`Your new password is: ${newPassword}`);
  console.log(`==========================================\n`);
}

main()
  .catch(e => {
    console.error('Error resetting password:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
