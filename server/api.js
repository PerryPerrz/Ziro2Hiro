'use strict';

let _ = require('underscore');
let HEROES = require('./data/heroes').heroes;

exports.listAll = function (req, res) {
    console.log('List all HEROES');
    if (!HEROES || HEROES.length == 0) {
        return res.status(204).json();
    }
    return res.status(200).json(HEROES);
};

exports.delete = function (req, res) {
    var id = getId(req);
    console.log('Delete hero : id=' + id);

    var index = _.findIndex(HEROES, function (p) {
        return p.id == id;
    });

    if (index == -1) {
        return res.status(404).json({ error: 'Le héro avec l\'id "' + id + '" n\'existe pas.' });
    }

    HEROES.splice(index, 1);

    if (!HEROES || HEROES.length == 0) {
        return res.status(204).json();
    }

    return res.status(200).json(HEROES);
};

exports.update = function (req, res) {
    var id = getId(req);
    console.log('Update hero : id=' + id);

    var hero = req.body;

    var index = _.findIndex(HEROES, function (p) {
        return p.id == id;
    });

    if (index == -1) {
        return res.status(404).json({ error: 'Le héro avec l\'id "' + id + '" n\'existe pas.' });
    }

    Object.assign(HEROES[index], hero);

    return res.status(200).json(HEROES[index]);
};

exports.create = function (req, res) {
    var hero = req.body;
    var name = hero.name;
    var nemesis = hero.nemesis;
    console.log('Create hero : name=' + name + ', nemesis=' + nemesis);

    var found = _.findWhere(HEROES, { name: name, nemesis: nemesis });
    if (found) {
        return res.status(409).json({ error: 'Le héro "' + name + '" existe déjà.' });
    }

    delete hero.id;
    hero.id = createId();
    HEROES.push(hero);

    return res.status(200).json(hero);
};

function getId(req) {
    var param = getParam(req, 'id');
    return param;
}

function createId() {
    return new Date().getTime() + '';
}

function getParam(req, param) {
    return req.params[param];
}
