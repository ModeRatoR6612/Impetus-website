import mongoose from 'mongoose';

let festivalsSchema = new mongoose.Schema({
  name: String,
  nominations: String,
  ageCategories: String,
  groupCategories: String,
  about: String,
  place: String,
  joinConditions: String,
  judges: String,
  moneyConditions: String,
  packet: String,
  contacts: String,
  img: String,
})
let Festivals = mongoose.model('festivals', festivalsSchema);

let newsSchema = new mongoose.Schema({
  title: String,
  img: String,
  text: String,
  date: String,
})
let News = mongoose.model('news', newsSchema);

let applicationsSchema = new mongoose.Schema({
  festivalId: String,
  festival: String,
  name: String,
  FIO: String,
  phone: String,
  email: String,
  stay: String,
  nomination: String,
  age: String,
  group: String,
  playName: String,
  dot: String,
  date: String,
});
let Applications = mongoose.model('applications', applicationsSchema);

let feedbacksSchema = new mongoose.Schema({
  text: String,
  avtor: String,
  date: String,
});
let Feedbacks = mongoose.model('feedbacks', feedbacksSchema);

export {
  Festivals,
  News,
  Applications,
  Feedbacks,
}