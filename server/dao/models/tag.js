import Mongoose from 'Mongoose';
import TagSchema from '../schemas/tag';

export default Mongoose.model('tag', TagSchema);
