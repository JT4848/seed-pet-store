const client = require('./db.js');

const dropTables = async() => {
  try {
    await client.query(`
    DROP TABLE IF EXISTS pets_products;
    DROP TABLE IF EXISTS pets;  
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS owners;  
    `);

    console.log('TABLES DROPPED!');
  } catch(error) {
    console.log(error);
  }
}

const createTables = async() => {
  try {
    await client.query(`
      CREATE TABLE owners(
        Id SERIAL PRIMARY KEY,
        Name VARCHAR(30) NOT NULL
      );

      CREATE TABLE pets(
        Id SERIAL PRIMARY KEY,
        Name VARCHAR(20) NOT NULL,
        Type VARCHAR(20) NOT NULL,
        Owner_Id INTEGER REFERENCES owners(Id)
      );

      CREATE TABLE products(
        Id SERIAL PRIMARY KEY,
        Name VARCHAR(20) NOT NULL
        );

      CREATE TABLE pets_products(
        Pets_Id INTEGER REFERENCES pets(Id),
        Products_Id INTEGER REFERENCES products(Id)
        );

    `);

    console.log('TABLES CREATED!');
  } catch(error) {
    console.log(error);
  }
}

const createOwner = async(ownersName) => {
  try {
    await client.query(`
      INSERT INTO owners (Name)
      VALUES ('${ownersName}');
    `);

    console.log('OWNER CREATED');
  } catch(error) {
    console.log(error)
  }
}


const createPets = async(petsName, petsType, ownersId) => {
  try{
    await client.query(`
      INSERT INTO pets (Name, Type, Owner_Id)
      VALUES ('${petsName}', '${petsType}', ${ownersId});
    `);
    console.log('PET CREATED')
  } catch(error){
    console.log(error)
  }
}

const createProducts = async(productsName) => {
  try{
    await client.query(`
      INSERT INTO products(Name)
      VALUES ('${productsName}')
    `)
    console.log(`PRODUCT CREATED`);
  }catch(error){
    console.log(error);
  }
}

const createPetsProducts = async(petsId, productsId) => {
  try{
    await client.query(`
      INSERT INTO pets_products (Products_Id, Pets_Id)
      VALUES ('${petsId}', '${productsId}');
    `)
    console.log(`PET ID CREATED`)
  }catch(error){
    console.log(error);
  }
}

const syncAndSeed = async() => {
  try {
    await client.connect();
    console.log('CONNECTED TO THE DB!');

    await dropTables();
    await createTables();
    
    await createOwner('Greg');
    await createOwner('Herbert');
    await createOwner('Bill');
    
    await createPets('Stinky', 'Skunk', 1);
    await createPets('Harry', 'Horse', 2);
    await createPets('Floppy', 'Fish', 3);
    
    await createProducts('water');
    await createProducts('shampoo');
    await createProducts('brush');
    
    await createPetsProducts(3 , 1);
    await createPetsProducts(1, 2);
    await createPetsProducts(2, 3);
    
  } catch(error) {
    console.log(error);
  } 
}

syncAndSeed();