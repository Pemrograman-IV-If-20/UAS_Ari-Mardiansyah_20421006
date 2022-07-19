const router = require("express").Router();
const keranjangController = require("../controllers/keranjangController");

router.post('/input-keranjang', (req, res)=> {
    keranjangController.input(req.body)
    .then((result) => {
        res.json(result) 
    }).catch(err =>{
        res.json(err)
    })
})


router.get("/get-all-keranjang/:idUser", (req, res)=> {
    keranjangController.getAllKeranjang(req.params.idUser)
    .then((result) => {
        res.json(result) 
    }).catch(err =>{
        res.json(err)
    })
})

router.get("/get-keranjang-by-id/:idKeranjang", (req, res)=> {
    keranjangController.getKeranjangById(req.params.idKeranjang)
    .then((result) => {
        res.json(result) 
    }).catch(err =>{
        res.json(err)
    })
})

router.put("/update-keranjang/:idKeranjang", (req, res)=> {
    keranjangController.updateKeranjang(req.params.idKeranjang, req.body)
    .then((result) => {
        res.json(result) 
    }).catch(err =>{
        res.json(err)
    })
})

router.delete("/delete-keranjang/:idKeranjang", (req, res)=> {
    keranjangController.deleteKeranjang(req.params.idKeranjang)
    .then((result) => {
        res.json(result) 
    }).catch(err =>{
        res.json(err)
    })
})

module.exports = router;