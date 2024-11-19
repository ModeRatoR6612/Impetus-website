import express from 'express';
import fileUpload from 'express-fileupload'
import mongoose from 'mongoose';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { Festivals, News, Applications, Feedbacks } from './models.js'

const app = express();
const port = 3000;

// настройка работы с файловой системой
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app
  .use(express.json())
  .use(express.static('public'))
  .use(fileUpload())

app.use(cors({origin: 'http://localhost:5173'}));

mongoose.connect('mongodb://localhost:27017/Impetus_project')
  .then((res) => console.log('Conected to MongoDB'))
  .catch((error) => console.log(error));

let isAdmin = false;

app.listen(port, () =>{
  console.log(`localhost:${port}`);
})

                                                                      // Основная страница

app.get('/main', async (req, res) => {
  let cards = await Festivals.find({}, {name: 1, img:1});
  let news = await News.find();
  let object = {
    cards,
    news,
    isAdmin,
  }
  res.send(object);
});

app.post('/main/delFestival', async (req, res) => {
  let id = req.body.id;
  try {
    let data = await Festivals.findById(id, {img:1, _id:0});
    var imgName = data.img;
  } catch (error) {
    console.log('не найден фестиваль'+error);
  }

  try {
    await Festivals.findByIdAndDelete(id);
  } catch (error) {
    console.log('не удален фестиваль'+error);
  }

  try {
    await fs.unlink(path.join(__dirname, 'public/assets', imgName));
  } catch (error) {
    console.log('не удален или не найден файл'+error);
  }
  res.redirect('/main')
})

app.post('/main/delNews', async (req, res) => {
  let id = req.body.id;
  try {
    let data = await News.findById(id, {img:1, _id:0});
    let imgName = data.img;
    await News.findByIdAndDelete(id);
    await fs.unlink(path.join(__dirname, 'public/assets', imgName));
  } catch (error) {
    console.log(error);
  }
  res.redirect('/main')
});

app.post('/main/quitAdmin', (req, res) => {
  isAdmin = false;
  res.redirect('/main')
});

                                                                                        // Фестивали

app.get('/festival', async (req, res) => {
  let id = req.query.id;
  let fest = await Festivals.findById(id);
  res.send(fest)
})

app.post('/createFestival', async (req, res) => {
  let {name, nominations, ageCategories, groupCategories, about, place, joinConditions, judges, moneyConditions, packet, contacts} = req.body;
  let img = req.files ? req.files.file : null;
  if(img){
    img.mv(path.join(__dirname, 'public/assets', img.name))
  }
  let imgName = img.name
  let fest = new Festivals({
    name: name,
    nominations: nominations,
    ageCategories: ageCategories,
    groupCategories: groupCategories,
    about: about, 
    place: place,
    joinConditions: joinConditions, 
    judges: judges,
    moneyConditions: moneyConditions,
    packet: packet,
    contacts: contacts,
    img: imgName
  })
  
  await fest.save()
});

app.get('/createFestival', async (req, res) => {
  res.send(isAdmin)
});

                                                                                          // Новости
app.post('/createNews', async (req, res) => {
  let {title} = req.body;
  let {text} = req.body;
  let {date} = req.body;
  let img = req.files ? req.files.file : false;

  if(img){
    img.mv(path.join(__dirname, 'public/assets/news', img.name))
  }
  let imgName = img.name;
  let news = new News({
    title: title,
    img: imgName,
    text: text,
    date: date,
  })
  await news.save()
});

app.get('/createNews', async (req, res) => {
  res.send(isAdmin)
});

                                                                                              // Заявки

app.get('/application', async (req, res) => {
  let festivals = await Festivals.find({}, {name:1, nominations:1, ageCategories:1, groupCategories:1});
  let members = await Applications.find({}, {festival: 1, FIO:1, age:1, _id:0});
  let object = {
    festivals,
    members
  }
  res.send(object);
});

app.post('/application', async (req, res) => {
  let {festivalId, festival ,name, FIO, phone, email, stay, nomination, age, group, playName, dot, date} = req.body;
  let application = new Applications({
    festivalId: festivalId,
    festival: festival,
    name: name,
    FIO: FIO,
    phone: phone,
    email: email,
    stay: stay,
    nomination: nomination,
    age: age,
    group: group,
    playName: playName,
    dot: dot,
    date: date
  });
  await application.save();
});

app.get('/seeApplications', async (req, res) => {
  let applications = await Applications.find();
  let object = {
    applications,
    isAdmin
  }
  res.send(object)
});

app.post('/delApplications', async (req, res) => {
  let id = req.body.id;
  try {
    await Applications.findByIdAndDelete(id)
  } catch (error) {
    console.log(error);
  }
  res.redirect('/seeApplications')
});

                                                                                              // Галерея

app.get('/gallery', async (req, res) => {
  let files;
  try {
    files = await fs.readdir(path.join(__dirname, 'public/assets/gallery'));
    console.log(files);
  } catch (error) {
    console.log(error);
  }
  res.send({files, isAdmin})
});

app.post('/gallery', async (req, res) => {
  let img = req.files ? req.files.file : null;
  if(img){
    img.mv(path.join(__dirname, 'public/assets/gallery', img.name))
  }
  res.redirect('/gallery')
});

app.post('/gallery/delImg', async (req, res) => {
  let file = req.body.file;
  try {
    await fs.unlink(path.join(__dirname, 'public/assets/gallery', file));
  } catch (error) {
    console.log('не удален или не найден файл'+error);
  }
  res.redirect('/gallery')
});

app.get('/news', async (req, res) => {
  let news = await News.find();
  let object = {
    news,
    isAdmin,
  }
  res.send(object)
});

app.post('/delNews', async (req, res) => {
  let id = req.body.id;
  try {
    let data = await News.findById(id, {img:1, _id:0});
    if (data.img){
      let imgName = data.img;
      await fs.unlink(path.join(__dirname, 'public/assets/news', imgName));
    }
    await News.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
  res.redirect('/news')
});

                                                                                        // Отзывы
app.get('/createFeedback', async (req, res) => {
  res.send(isAdmin)
}); 
app.post('/createFeedback', async (req, res) => {
  let {text, avtor, date} = req.body;
  let feedback = new Feedbacks({
    text: text,
    avtor: avtor,
    date: date,
  });
  await feedback.save();
});

app.get('/feedbacks', async (req, res) => {
  let feedbacks = await Feedbacks.find();
  let object = {
    isAdmin, 
    feedbacks
  }
  res.send(object);
});

app.post('/delFeedback', async (req, res) => {
  let id = req.body.id;
  try {
    await Feedbacks.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
  res.redirect('/feedbacks')
});
                                                                                        // Логин в админку

app.post('/login', async (req, res) => {
  isAdmin = req.body.isAdmin;
  console.log(isAdmin);
})