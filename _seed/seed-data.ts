import { seedAdmins } from './seed-admins';
import { seedUsers } from './seed-users';
import { seedOptions } from './seed-options';
import { seedDistributors } from './seed-distributors';
import { seedShippingPolicies } from './seed-shipping-policies';
import { seedCosmetics } from './seed-cosmetics';
import { seedCarts } from './seed-carts';
import { seedAddresses } from './seed-addresses';
import { seedOrders } from './seed-orders';
import { seedPosts } from './seed-posts';

export async function main() {
  await seedAdmins();
  const users = await seedUsers();
  await seedPosts(users);
  await seedOptions();
  await seedDistributors();
  await seedShippingPolicies();
  const { allVariants } = await seedCosmetics();
  await seedCarts(users, allVariants);
  const addressMap = await seedAddresses(users);
  await seedOrders(users, addressMap);
}

if (require.main === module) {
  main()
    .then(() => {
      console.log('✅ All seed steps completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Seed failed:', error);
      process.exit(1);
    });
} 
