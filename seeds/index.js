const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');
const { title } = require('process');


mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 10);
        const camp = new Campground({
            author: '68c255f4a03988ec9c4c296f',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                        {
                        url: 'https://res.cloudinary.com/daqglcdzy/image/upload/v1757989305/YelpCamp/ynjsvwr8mdb9xtipxm2o.jpg',
                        filename: 'YelpCamp/ynjsvwr8mdb9xtipxm2o',
                        },
                        {
                        url: 'https://res.cloudinary.com/daqglcdzy/image/upload/v1757989311/YelpCamp/bisxxhdgq6xc0xqid4t4.jpg',
                        filename: 'YelpCamp/bisxxhdgq6xc0xqid4t4',
                        }
                    ]

        })
       await camp.save();
    }

}

seedDB().then(() => {
    mongoose.connection.close();
})
