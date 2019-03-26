import Mongoose from 'Mongoose';
import TagSchema from '../schemas/project';

export default Mongoose.model('project', TagSchema);
