const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Méthode non autorisée" };
    }

    const newMovie = JSON.parse(event.body);
    const filePath = path.join(__dirname, '..', 'movies.json');

    let movies = [];
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        movies = JSON.parse(data);
    }

    movies.push(newMovie);
    fs.writeFileSync(filePath, JSON.stringify(movies, null, 2));

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Film ajouté !" })
    };
};

