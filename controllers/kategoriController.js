//const kategoriModels = require('../models/kategoriModels');
const kategoriModel = require('../models/kategoriModels');
const objectId = require("mongoose").Types.ObjectId

exports.input = (data) =>
    new Promise((resolve, reject) => {
        kategoriModel.create(data)
        .then(() => {
            resolve({
              status: true,
              msg: 'berhasilmenambahkan kategori'
            })
          }).catch(err => {
            reject({
              status: false,
              msg: 'terjadi kesalahan pada server'
            })
          })
    })

exports.getAllKategori = () =>
    new Promise((resolve, reject) => {
        kategoriModel.find().then((kategoris) => {
            if (kategoris.length > 0) {
                resolve({
                    status: true,
                    msg: "Berhasil memuat data",
                    data: kategoris,
                });
            }else {
                reject({
                    status: false,
                    msg: "Tidak ada data"
                })
            }
        })
        .catch((err) => {
            reject({
                status: false,
                msg: "Terjadi kesalahan pada server"
            });
        });
    });


    exports.getKategoriById = (idKategori) =>
        new Promise((resolve, reject) => {
            kategoriModel.findOne({_id: objectId(idKategori)})
            .then((kategoris) => {
                if(kategoris) {
                    resolve({
                        status: true,
                        msg: "Berhasil memuat data",
                        data: kategoris,
                    })
                }else {
                    reject({
                        status: false,
                        msg: "Tidak ada data"
                    })
                }
            })
            .catch((err) => {
                reject({
                    status: false,
                    msg: "Terjadi kesalahan pada server"
                });
            });
        });


exports.update = (idKategori, data) =>
        new Promise((resolve, reject) => {
            kategoriModel.updateOne({_id: objectId(idKategori)}, data).then((kategoris) => {
                resolve({
                        status: true,
                        msg: "Data berhasil di update",
                        
                    })
                
            })
            .catch((err) => {
                reject({
                    status: false,
                    msg: "Terjadi kesalahan pada server"
                });
            });
        
        })


        exports.delete = (idKategori) =>
        new Promise((resolve, reject) => {
            kategoriModel.deleteOne({_id: objectId(idKategori)}).then((kategoris) => {
                resolve({
                        status: true,
                        msg: "Data berhasil di delete",
                        
                    })
                
            })
            .catch((err) => {
                reject({
                    status: false,
                    msg: "Terjadi kesalahan pada server"
                });
            });
        
        })