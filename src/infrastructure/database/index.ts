import Datastore from 'nedb';
import path from 'path';

export default new Datastore({ filename: path.join(__dirname, '../../data/datafile'), autoload: true });