// test-db.js
require('dotenv').config();
const UserModel = require('./src/models/userModel');
const { testConnection } = require('./src/config/database');

const testModel = async () => {
  try {
    // Verificar conexión
    await testConnection();
    
    console.log('\n🧪 Probando UserModel...\n');
    
    // 1. Crear usuario de prueba
    console.log('1️⃣ Creando usuario...');
    const userId = await UserModel.create({
      name: 'Juan Pérez',
      email: 'juan@test.com',
      password: 'password123' // En la próxima clase lo encriptaremos
    });
    console.log(`✅ Usuario creado con ID: ${userId}`);
    
    // 2. Buscar por email
    console.log('\n2️⃣ Buscando por email...');
    const user = await UserModel.findByEmail('juan@test.com');
    console.log('✅ Usuario encontrado:', user);
    
    // 3. Buscar por ID
    console.log('\n3️⃣ Buscando por ID...');
    const userById = await UserModel.findById(userId);
    console.log('✅ Usuario encontrado:', userById);
    
    // 4. Listar todos
    console.log('\n4️⃣ Listando todos los usuarios...');
    const allUsers = await UserModel.findAll();
    console.log(`✅ Total usuarios: ${allUsers.length}`);
    
    // 5. Actualizar
    console.log('\n5️⃣ Actualizando usuario...');
    const updated = await UserModel.update(userId, {
      name: 'Juan Pérez Actualizado',
      email: 'juan@test.com'
    });
    console.log(`✅ Usuario actualizado: ${updated}`);
    
    // 6. Verificar email existe
    console.log('\n6️⃣ Verificando si email existe...');
    const exists = await UserModel.emailExists('juan@test.com');
    console.log(`✅ Email existe: ${exists}`);

    //7 delete
    console.log('borrando...');
    const delet= await UserModel.delete(userId);
    console.log('borrado');

    console.log('\n✅ Todas las pruebas pasaron correctamente\n');
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error en las pruebas:', error);
    process.exit(1);
  }
};

testModel();

