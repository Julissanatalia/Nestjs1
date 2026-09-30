import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import Database from 'better-sqlite3';
import * as bcrypt from 'bcryptjs';

// 1. Inicializar la base de datos local apuntando a dev.db
const sqlite = new Database('./dev.db');

// 2. Pasar el adaptador configurando explícitamente la URL para evitar el error de 'replace'
const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' });

// 3. Instanciar PrismaClient con el adaptador obligatorio
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting seed...');
  console.log('Cleaning existing data...');

  // Limpiar tablas existentes
  await prisma.user.deleteMany();
  console.log('Users deleted');
  
  await prisma.tenant.deleteMany();
  console.log('Tenants deleted');

  // Crear tenants de prueba
  console.log('Creating tenants...');
  const tenant1 = await prisma.tenant.create({
    data: { name: 'Tech Solutions' },
  });

  const tenant2 = await prisma.tenant.create({
    data: { name: 'Marketing Pro' },
  });

  // Crear usuario administrador
  const hashedPassword = await bcrypt.hash('password123', 10);

  await prisma.user.create({
    data: {
      email: 'admin@techsolutions.com',
      name: 'Admin User',
      password: hashedPassword,
      telephone: '12345678',
      role: 'ADMIN',
      tenantId: tenant1.id,
    },
  });

  console.log('Seed finished successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });