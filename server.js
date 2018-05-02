const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/nodeappdatabase', {
    useMongoClient: true
});

// pobieranie głównego konstruktora

const Schema  = mongoose.Schema;

//tworzenie schematu

const userSchema = new Schema({
  name: String,
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  admin: Boolean,
  created_at: Date,
  updated_at: Date
});

// tworzenie modelu na postawie schematu za pomocą metody model - przyjmuje dwa parametry nazwę oraz schemat

const User =  mongoose.model('User', userSchema);

// metoda ????

userSchema.methods.manify = function(next) {
    this.name = this.name + '-boy';

    return next(null, this.name);
};

// metode pre-save

userSchema.pre('save', function(next) {
    //pobranie aktualnego czasu
    const currentDate = new Date();

    //zmiana pola na aktualny czas
    this.updated_at = currentDate;

    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});

// tworzenie instancji na podstawie modelu

const kenny = new User({
  name: 'Kenny',
  username: 'Kenny-the-boy',
  password: 'password'
});

kenny.manify(function(err, name) {
    if (err) throw err;
    console.log('Twoje nowe imię to: ' + name);
});

kenny.save(function(err){
  if (err) throw err;
  console.log('Uzytkownik zapisany pomyślnie');
});

const benny = new User({
  name: 'Benny',
  username: 'Benny-the-boy',
  password: 'password'
});

benny.manify(function(err, name){
  if (err) throw err;
  console.log("Twoje nowe imie to " + name);
});

benny.save(function(err){
  if (err) throw err;
  console.log('Uzytkownik ' + benny.name + 'zapisany pomyślnie');
});

const mark = new User({
    name: 'Mark',
    username: 'Mark_the_boy',
    password: 'password'
});

mark.manify(function(err, name) {
  if (err) throw err;
  console.log('Twoje nowe imię to: ' + name);
});

mark.save(function(err) {
  if (err) throw err;
  console.log('Uzytkownik ' + mark.name +  ' zapisany pomyslnie');
});
