const express = require('express');
const mongoose = require('mongoose');
const employeeRoutes = require('./routes/employee');
const hierarchyRoutes = require('./routes/hierarchy');
const routeRoutes = require('./routes/route');
const doctorRoutes = require('./routes/doctor');
const chemistRoutes = require('./routes/chemist');
const stockistRoutes = require('./routes/stockist');
//const tourProgrammeRoutes = require('./routes/tourProgramme');
const expenseMasterRoutes = require('./routes/expenseMaster');
const dayPlanRoutes = require('./routes/dayPlan');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://rohithbolt18:3JBY39L3ECTyUO18@cluster0.dntjg18.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api', employeeRoutes);
app.use('/api', hierarchyRoutes);
app.use('/api', routeRoutes);
app.use('/api', doctorRoutes);
app.use('/api', chemistRoutes);
app.use('/api', stockistRoutes);
//app.use('/api', tourProgrammeRoutes);
app.use('/api', expenseMasterRoutes);
app.use('/api/dayplan', dayPlanRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 

