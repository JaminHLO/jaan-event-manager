const db = require('./connection');
const { User, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Soccer' },
    { name: 'Football' },
    { name: 'Basketball' },
    { name: 'Baseball' },
    { name: 'Gymnastics' },
    { name: 'Cardio' },
    { name: 'Yoga' },
    { name: 'Swimming' },
    { name: 'Weight Lifting' },
    { name: 'Tennis' },
    { name: 'Cycling' },
    { name: 'Martial Arts' },
  ]);

  console.log('categories seeded');

  await User.deleteMany();

  const users = [
    {
      name:"Pham",
      email:"pham@mail.com",
      password:"pham1234",
      address:"123 Elm Street, Springfield, NY 12345",
    },
    {
      name:"Jamin",
      email:"jamin@mail.com",
      password:"jamin1234",
      address:"456 Oak Avenue, Lakeside, CA 67890",
    },
    {
      name:"Alyssa",
      email:"alyssa@mail.com",
      password:"alyssa1234",
      address:"789 Maple Lane, Willowville, TX 45678",
    },
    {
      name:"Anabel",
      email:"anabel@mail.com",
      password:"anabel1234",
      address:"101 Pine Street, Cedarville, FL 98765",
    },
    {
      name:"Saurav",
      email:"saurav@mail.com",
      password:"saurav1234",
      address:"234 Birch Road, Mountainview, WA 54321",
    },
    {
      name:"Andre",
      email:"andre@mail.com",
      password:"andre1234",
      address:"567 Walnut Avenue, Riverdale, IL 23456",
    },
  ]

  await User.insertMany(users);

  console.log('users seeded');

  process.exit();
});
