var neo4j = require('../../databases/neo4j'),
    session = neo4j.session();

card_list = (req, res) => {

    let response = [];

    console.log(req.params.collectionId);
    session.run(
        'MATCH (c:Card) ' +
        'WHERE c.collectionId = $collectionId ' +
        'RETURN c',
        {
            collectionId: req.params.collectionId
        }
    ).then(node => {
        console.log(node.records);
        node.records.forEach(record => {
            console.log(record);
            let card = {
                _id: record.get('c').identity.low,
                title: record.get('c').properties.title,
                definition: record.get('c').properties.definition,
                transliteration: record.get('c').properties.transliteration
            };
            console.log(card);
            response.push(card);
        });
        res.status(200).json(response);
    })
};

card_create = (req, res) => {

    let response;

    session.run(
        'CREATE (c:Card { title : $title, definition : $definition, transliteration : $transliteration, collectionId : $collectionId })' +
        'RETURN c',
        {
            title: req.body.title,
            definition: req.body.definition,
            transliteration: req.body.transliteration,
            collectionId: req.body.collectionId
        }
    ).then(node => {
        console.log(node);
        node.records.forEach(record => {
            console.log(record.get('c'));
            let card = {
                _id: record.get('c').identity.low,
                title: record.get('c').properties.title,
                definition: record.get('c').properties.definition,
                transliteration: record.get('c').properties.transliteration
            };
            response = card;
        });
        console.log(response);
        res.status(200).json(response);
    })
};

card_update = (req, res) => {

    let response;

    session.run(
        'MATCH (c:Card) ' +
        'WHERE ID(c) = $id ' +
        'SET c.title = $title, c.definition = $definition, c.transliteration = $transliteration ' +
        'RETURN c',
        {
            id: req.body._id,
            title: req.body.title,
            definition: req.body.definition,
            transliteration: req.body.transliteration
        }
    ).then(result => {
        console.log(result.records);
        result.records.forEach(record => {
            console.log(record);
        });
        res.status(200).json(result.records);
    })

};

card_delete = (req, res) => {

    let id = Number(req.params.id);

    session.run(
        'MATCH (c:Card) ' +
        'WHERE ID(c) = $id ' +
        'DETACH DELETE c ',
        {
            id: id
        }
    ).then(result => {
        console.log(result);
        res.status(200).json(result);
    })

};

module.exports = {
    card_list,
    card_create,
    card_update,
    card_delete
};