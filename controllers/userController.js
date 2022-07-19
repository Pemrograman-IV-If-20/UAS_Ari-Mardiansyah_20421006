const userModel = require('../models/userModels')
const bcrypt = require('bcrypt')

exports.registrasi = (data) =>
    new Promise((resolve, reject) => {
        userModel.findOne({
            email: data.email
        }).then( async (SudahadaUser) => {
            if (SudahadaUser) {
                reject({
                    status: false,
                    msg: 'email sudah terdaftar'
                })
            }else {
                const saltRounds = 10;
                const hash = await bcrypt.hash(data.password, saltRounds);
                data.password = hash;

                userModel
            .create(data)
            .then(() => {
                resolve({
                    status: true,
                    msg: "Berhasil Registrasi",
                });
            })
            .catch((err) => {
                reject({
                    status: false,
                    msg: "Terjadi kesalahan pada server",
                });
            });
            }
        })


        
    });


exports.login = (data) =>
    new Promise((resolve, reject) => {
        userModel.findOne({ userName: data.userName }).then(async (user) => {
            if (user) {
                const isValid = await bcrypt.compare(data.password, user.password);
                if(isValid) {
                    resolve({
                        status: true,
                        msg: "Berhasil Login",
                        data: user,
                    }); 
                }else {
                    reject({
                    status: false,
                    msg: "password anda salah"
                });
                }
                
            } else {
                reject({
                    status: false,
                    msg: "username tidak terdaftar"
                });
            }

        })
        .catch((err) => {
            reject({
                status: false,
                msg: "Terjadi kesalahan pada server"
            });
        });
    });