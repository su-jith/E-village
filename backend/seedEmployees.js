const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const User = require("./models/User"); // Adjust the path as necessary

// Define an array of 5 employee objects without assigned wards (ward is null)
const employees = [
  {
    name: "Employee One",
    email: "emp1@gmail.com",
    password: "emp1@123",
    role: "employee",
    ward: null, // Ward not assigned yet
  },
  {
    name: "Employee Two",
    email: "emp2@gmail.com",
    password: "emp2@123",
    role: "employee",
    ward: null,
  },
  {
    name: "Employee Three",
    email: "emp3@gmail.com",
    password: "emp3@123",
    role: "employee",
    ward: null,
  },
  {
    name: "Employee Four",
    email: "emp4@gmail.com",
    password: "emp4@123",
    role: "employee",
    ward: null,
  },
  {
    name: "Employee Five",
    email: "emp5@gmail.com",
    password: "emp5@123",
    role: "employee",
    ward: null,
  },
];

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to the database.");

    for (const emp of employees) {
      // Check if the employee already exists
      const existingEmployee = await User.findOne({ email: emp.email });
      if (!existingEmployee) {
        const newEmployee = new User(emp);
        await newEmployee.save();
        console.log(`Added: ${emp.email}`);
      } else {
        console.log(`Employee already exists: ${emp.email}`);
      }
    }
    console.log("Seeding complete.");
    process.exit();
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  });
