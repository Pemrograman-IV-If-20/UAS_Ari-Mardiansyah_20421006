const transaksiModel = require("../models/transaksiModels")
const keranjangModel = require("../models/keranjangModels")
const barangModel = require("../models/barangModels")

const objectId = require("mongoose").Types.ObjectId


exports.inputTransaksi = (data) =>
new Promise((resolve, reject) => {
    transaksiModel.create(data)
    .then(async () => {
        const {detailTransaksi} = data;
        for (let i=0; i < detailTransaksi.length; i++) {
            await barangModel.updateOne(
                { _id: objectId(detailTransaksi[i].idBarang)},
                {$inc: {stok: -Number(detailTransaksi[i].jumlahBeli)}},
            );

            await keranjangModel.deleteOne({
                _id: objectId(detailTransaksi[i]._id)
            });
        }

        resolve({
            status: true,
            message:  "Transaksi Berhasil",
        });
    }).catch((err) =>{
        reject({
            status: false,
            message:  "Terjadi kesalahan saat transaksi",
        })
    })
})


exports.getAllTransaksi = () =>
    new Promise((resolve, reject) => {
        transaksiModel.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "idUser",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $unwind : "$user",
            }
        ]).then((data) => {
            if (data.length > 0) {
                resolve({
                    status: true,
                    msg: "Berhasil memuat data",
                    data: data,
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

exports.getTransaksiById = (idTransaksi) =>
new Promise((resolve, reject) => {
    transaksiModel.aggregate([
        {
            $match: {_id: objectId(idTransaksi)}
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
            $unwind : "$user",
        }
    ]).then((data) => {
        if (data.length > 0) {
            resolve({
                status: true,
                msg: "Berhasil memuat data",
                data: data,
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

exports.getTransaksiByIdUser = (idUser) =>
new Promise((resolve, reject) => {
    transaksiModel.aggregate([
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
            $unwind : "$user",
        }
    ]).then((data) => {
        if (data.length > 0) {
            resolve({
                status: true,
                msg: "Berhasil memuat data",
                data: data,
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


exports.deleteTransaksi = (idTransaksi) =>
        new Promise((resolve, reject) => {
            transaksiModel.deleteOne({_id: objectId(idTransaksi)})
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