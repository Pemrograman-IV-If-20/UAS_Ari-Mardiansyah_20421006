const keranjangModel = require("../models/keranjangModels")
const objectId = require("mongoose").Types.ObjectId

exports.input = (data) =>
    new Promise((resolve, reject) => {
        keranjangModel
            .create(data)
            .then(() => {
                resolve({
                    status: true,
                    msg: "Berhasil input barang",
                });
            })
            .catch((err) => {
                reject({
                    status: false,
                    msg: "Terjadi kesalahan pada server",
                })
            })
    })


    exports.getAllKeranjang = (idUser) =>
    new Promise((resolve, reject) => {
        keranjangModel.aggregate([
            {
                $match: {idUser: objectId(idUser)}
            },
            {
                $lookup: {
                    from: "users",
                    localField: "idUser",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $lookup: {
                    from: "barangs",
                    localField: "idBarang",
                    foreignField: "_id",
                    as: "barang",
                },
            },
            {
                $unwind : "$user",
            },
            {
                $unwind : "$barang",
            }
        ]).then((keranjang) => {
            if (keranjang.length > 0) {
                resolve({
                    status: true,
                    msg: "Berhasil memuat data",
                    data: keranjang,
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


    exports.getKeranjangById = (idKeranjang) => 
    new Promise((resolve, reject) => {
        keranjangModel.aggregate([
            {
                $match: {_id: objectId(idKeranjang)}
            },
            {
                $lookup: {
                    from: "users",
                    localField: "idUser",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $lookup: {
                    from: "barangs",
                    localField: "idBarang",
                    foreignField: "_id",
                    as: "barang",
                },
            },
            {
                $unwind : "$user",
            },
            {
                $unwind : "$barang",
            }
        ]).then((keranjang) => {
            if (keranjang.length > 0) {
                resolve({
                    status: true,
                    msg: "Berhasil memuat data",
                    data: keranjang,
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

exports.updateKeranjang = (idKeranjang, data) =>
    new Promise((resolve, reject) => {
        keranjangModel
        .updateOne({
            _id: objectId(idKeranjang),

        },data, 
        )
        .then(() => {
                resolve({
                    status: true,
                    msg: "Data berhasil di update",
                });        
        })
        .catch((err) => {
            reject({
                status: false,
                msg: "Terjadi kesalahan pada server"
            });
        });    
    })

exports.deleteKeranjang = (idKeranjang) =>
new Promise((resolve, reject) => {
    keranjangModel
    .deleteOne({
        _id: objectId(idKeranjang),
    })
    .then(() => {
        resolve({
                status: true,
                msg: "Barang berhasil di delete",
            })
        
    })
    .catch((err) => {
        reject({
            status: false,
            msg: "Terjadi kesalahan pada server"
        });
    });

})