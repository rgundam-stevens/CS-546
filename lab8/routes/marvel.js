const express = require("express");
const router = express.Router()
const data = require("../data/marvel");

router.get("/", async (req, res) => {
    try {
        res.render("marvel/first", { "title": "Character Finder", data: "All Characters" });
        return;
    }
    catch (e) {
        res.status(500).render("marvel/error", { "title": "error", error: e });
        return;
    }
});

router.get("/public/site.css", async (req, res) => {
    res.render("public/css/site.css");
    return;
});

router.get("/characters/:id", async (req, res) => {
    try {
        let character = await data.getCharacterById(req.params.id);
        console.log(character);
        if (!character) {
            res.render("marvel/error", { "title": "Not Found", error: e, error1: "Character is not valid" });

            return;
        }
        else {

            res.render("marvel/third", { "title": character.name, data: character.name, character });

            return;
        }
    }
    catch (e) {
        res.status(404).render("marvel/error", { "title": "error", error: e, error1: "No character found with this ID" });
        return;
    }
});







router.post("/search", async (req, res) => {
    try {
        if (!req.body.searchTerm) {
            throw "No input has been given in the search box ";
        }
        if (req.body.searchTerm.trim().length === 0) {
            throw "Input should not be empty spaces ";
        }
    }
    catch (e) {
        res.status(400).render("marvel/error", { "title": "error", error: e });
        return;
    }
    try {
        let character = await data.getCharacter(req.body.searchTerm);
        console.log(character.name)
        if (character) {
            res.render("marvel/second", { "title": "Characters Found", character, searchTerm: req.body.searchTerm });
            return;
        }

    }
    catch (e) {
        res.status(500).render("marvel/error", { "title": "error", error: e });
        return;
    }
});

module.exports = router;