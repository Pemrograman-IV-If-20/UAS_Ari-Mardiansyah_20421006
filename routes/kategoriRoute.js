const router = require('express').Router()
const controllerKategori = require('../controllers/kategoriController')

router.post('/input', (req, res)=> {
    controllerKategori.input(req.body)
    .then((result) => {
        res.json(result) 
    }).catch(err =>{
        res.json(err)
    })
})


router.get("/get-all-kategori", (req, res)=> {
    controllerKategori.getAllKategori()
    .then((result) => {
        res.json(result) 
    }).catch(err =>{
        res.json(err)
    })
})


router.get("/get-all-kategori-by-id/:idKategori", (req, res)=> {
    controllerKategori
    .getKategoriById(req.params.idKategori)
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });
});


router.put("/update/:idKategori", (req, res)=> {
    controllerKategori
    .update(req.params.idKategori, req.body)
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });
});

router.delete("/delete/:idKategori", (req, res)=> {
    controllerKategori.delete(req.params.idKategori)
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });
});

module.exports = router;