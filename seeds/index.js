const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // Your user ID, yes you, the web developer
            author: '63b424add6d365f0280e2dc8',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia eligendi maiores dolore mollitia, quas asperiores?',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dfk4bidkm/image/upload/v1674050774/YelpCamp/f3fvgdb8ks7powtwgq6g.jpg',
                    filename: 'YelpCamp/lbw4xcdo7tbehz7rn8nh'
                },
                {
                    url: 'https://res.cloudinary.com/dfk4bidkm/image/upload/v1673569178/YelpCamp/fbcjw8nggapcuwlsbztc.jpg',
                    filename: 'YelpCamp/fbcjw8nggapcuwlsbztc'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})