const mongoose = require('mongoose')

const kategoriSchema = new mongoose.Schema({
    namaKategori:  {
        type: String,
    },
    keterangan: {
        type: String
    }

})

module.exports = mongoose.model('kategori', kategoriSchema)