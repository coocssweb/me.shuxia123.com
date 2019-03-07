import Mongoose from 'mongoose';
import ArticleSchema from '../schemas/article';

export default Mongoose.model('article', ArticleSchema);
