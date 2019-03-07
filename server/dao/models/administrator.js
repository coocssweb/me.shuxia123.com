import Mongoose from 'mongoose';
import AdministratorSchema from '../schemas/administrator';

export default Mongoose.model('administrator', AdministratorSchema);
