import express from "express";
import mongoose from "mongoose";
import EventModel from './models/events.js'
import { eventsData } from "./DB/EventsData.js";
import CollectionModel from "./models/collections.js"
import { collectionsData } from "./DB/CollectionsData.js";
import ArticleModel from "./models/articles.js"
import { articlesData } from "./DB/ArticlesData.js";
import cors from "cors"
mongoose.connect(
	'mongodb+srv://admin:admin@cluster0.b5t38a4.mongodb.net/blog?retryWrites=true&w=majority'
)
	.then(() => console.log('DB ok'))
	.catch((err) => console.log('DB error ', err))


const app = express();

app.use(express.json()); // чтобы читать ин-фу из req.body
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  // headers: 'Content-Type,Authorization',
  credentials: true
}));

app.get('/articles', async (req, res) =>{
	try {
		const articles = await ArticleModel.find();
		res.json(articles);
		updateMongoDB(ArticleModel, articlesData);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Ошибка при получении коллекций' });
	}
})

app.get('/collections', async (req, res) => {
	try {
		const collections = await CollectionModel.find();
		res.json(collections);
		updateMongoDB(CollectionModel, collectionsData);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Ошибка при получении коллекций' });
	}
});

app.get('/events', async (req, res) => {
	try{
		const events = await EventModel.find();
		res.json(events);
		updateMongoDB(EventModel, eventsData);
	}catch(error){
		console.log(error);
		res.status(500).json({message: 'Ошибка при получении информации о мероприятиях'})
	}
})

// 	try {
// 			const currentCollections = await CollectionModel.find();
			
// 			if (!arraysAreEqual(currentCollections, collectionsData)) {
// 					await CollectionModel.deleteMany({}); // Очистить коллекцию
// 					await CollectionModel.insertMany(collectionsData); // Вставить новые данные
// 					console.log('Данные успешно обновлены в базе данных.');
// 			} else {
// 					console.log('Данные не изменились.');
// 			}
// 	} catch (error) {
// 			console.log('Ошибка при обновлении данных в базе данных:', error);
// 	}
// };
const updateMongoDB = async (Model, data) => {
	try {
			const currentCollections = await Model.find();
			
			if (!arraysAreEqual(currentCollections, data)) {
					await Model.deleteMany({}); // Очистить коллекцию
					await Model.insertMany(data); // Вставить новые данные
					console.log('Данные успешно обновлены в базе данных.');
			} else {
					console.log('Данные не изменились.');
			}
	} catch (error) {
			console.log('Ошибка при обновлении данных в базе данных:', error);
	}
};

const arraysAreEqual = (array1, array2) => {
	
	if (array1.length !== array2.length) {
		// console.log(array1.length, array2.length);
			return false;
	}

	let keys = [];
	keys = Object.keys(array2[0]);
	for(let i = 0; i < array1.length; i++){
		for(let j = 0; j < keys.length; j++){
			if( array1[i][keys[j]] !== array2[i][keys[j]]){
				return false
			};
		}
	}

	
	return true;
};



app.listen(4444, (err) => {
	if (err) {
		return console.log(err);
	}

	console.log('Server OK')
});