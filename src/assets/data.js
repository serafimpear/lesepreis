// ChatGPT
const students = [
    {
        uid: 1,
        name: "Hans",
        surname: "Schmidt",
        class: "1AN",
        points: 80,
        readed_books: 5,
        passed: true,
        multiplied: false,
        books: [
            {
                id: 101,
                date_added: 1678477200000, // UNIX timestamp for the date (example: 2023-07-24)
                passed: true,
                was_multiplied: false,
            },
            {
                id: 103,
                date_added: 1678477200000,
                passed: true,
                was_multiplied: true,
            },
        ],
    },
    {
        uid: 2,
        name: "Greta",
        surname: "Müller",
        class: "1BN",
        points: 70,
        readed_books: 4,
        passed: true,
        multiplied: false,
        books: [
            {
                id: 102,
                date_added: 1678477200000,
                passed: true,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
            {
                id: 104,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
        ],
    },
    {
        uid: 3,
        name: "Fritz",
        surname: "Wagner",
        class: "1AT",
        points: 90,
        readed_books: 6,
        passed: true,
        date_multiplied: 1678477200000,
        multiplied: true,
        multiplied_points: 12,
        multiplied_books: [ 101, 106 ],
        books: [
            {
                id: 105,
                date_added: 1678477200000,
                passed: true,
                was_multiplied: true,
            },
            {
                id: 107,
                date_added: 1678477200000,
                passed: true,
                was_multiplied: false,
            },
        ],
    },
    {
        uid: 4,
        name: "Anna",
        surname: "Becker",
        class: "1BT",
        points: 85,
        readed_books: 7,
        passed: true,
        date_multiplied: 1678477200000,
        multiplied: true,
        multiplied_points: 12,
        multiplied_books: [ 101, 106 ],
        books: [
            {
                id: 106,
                date_added: 1678477200000,
                passed: true,
                was_multiplied: true,
            },
            {
                id: 101,
                date_added: 1678477200000,
                passed: true,
                was_multiplied: false,
            },
        ],
    },
    {
        uid: 5,
        name: "Max",
        surname: "Schulz",
        class: "1AR",
        points: 75,
        readed_books: 3,
        passed: false,
        multiplied: false,
        books: [
            {
                id: 108,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
        ],
    },
    {
        uid: 6,
        name: "Sophie",
        surname: "Hoffmann",
        class: "1BR",
        points: 95,
        readed_books: 8,
        passed: true,
        date_multiplied: 1678477200000,
        multiplied: true,
        multiplied_points: 12,
        multiplied_books: [ 101, 106 ],
        books: [
            {
                id: 101,
                date_added: 1678477200000,
                passed: true,
                was_multiplied: false,
            },
            {
                id: 106,
                date_added: 1678477200000,
                passed: true,
                was_multiplied: true,
            },
        ],
    },
    {
        uid: 7,
        name: "Lukas",
        surname: "Keller",
        class: "2AN",
        points: 88,
        readed_books: 5,
        passed: true,
        multiplied: false,
        books: [
            {
                id: 103,
                date_added: 1678477200000,
                passed: true,
                was_multiplied: true,
            },
            {
                id: 105,
                date_added: 1678477200000,
                passed: true,
                was_multiplied: true,
            },
        ],
    },
    {
        uid: 8,
        name: "Emma",
        surname: "Wolf",
        class: "2BN",
        points: 82,
        readed_books: 6,
        passed: true,
        multiplied: false,
        books: [
            {
                id: 102,
                date_added: 1678477200000,
                passed: true,
                was_multiplied: true,
            },
        ],
    },
    {
        uid: 9,
        name: "Ben",
        surname: "Lehmann",
        class: "2AT",
        points: 79,
        readed_books: 4,
        passed: false,
        multiplied: false,
        books: [
            {
                id: 107,
                date_added: 1678477200000,
                passed: false,
                was_multiplied: false,
            },
        ],
    },
    {
        uid: 10,
        name: "Mia",
        surname: "Schneider",
        class: "2BT",
        points: 91,
        readed_books: 7,
        passed: true,
        date_multiplied: 1678477200000,
        multiplied: true,
        multiplied_points: 12,
        multiplied_books: [ 101, 106 ],
        books: [
            {
                id: 104,
                date_added: 1678477200000,
                passed: true,
                was_multiplied: true,
            },
        ],
    },
];

// List of books
const books = [
    {
        id: 101,
        title: "Der Vorleser",
        author: "Bernhard Schlink",
        language: "German",
        foreign_language: false,
        points: 10,
        isbn: "9783257229535",
    },
    {
        id: 102,
        title: "Das Parfum",
        author: "Patrick Süskind",
        language: "German",
        foreign_language: false,
        points: 8,
        isbn: "9783499209387",
    },
    {
        id: 103,
        title: "Faust",
        author: "Johann Wolfgang von Goethe",
        language: "German",
        foreign_language: false,
        points: 12,
        isbn: "9783423341546",
    },
    {
        id: 104,
        title: "Effi Briest",
        author: "Theodor Fontane",
        language: "German",
        foreign_language: false,
        points: 9,
        isbn: "9783150000090",
    },
    {
        id: 105,
        title: "Siddhartha",
        author: "Hermann Hesse",
        language: "German",
        foreign_language: false,
        points: 11,
        isbn: "9783518366758",
    },
    {
        id: 106,
        title: "Der Steppenwolf",
        author: "Hermann Hesse",
        language: "German",
        foreign_language: false,
        points: 11,
        isbn: "9783518366759",
    },
    {
        id: 107,
        title: "Der Prozess",
        author: "Franz Kafka",
        language: "German",
        foreign_language: false,
        points: 7,
        isbn: "9783257261054",
    },{
        id: 108,
        title: "The Rabbits",
        author: "Vladimir Putin",
        language: "Ukrain",
        foreign_language: false,
        points: 7,
        isbn: "9783257261054",
    },
];

export { students, books };
