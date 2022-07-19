const express = require('express');
const app = express();
const dbConfig = require('./config/db_config')
const mongoose = require("mongoose");


app.use(express.json())
app.use(express.urlencoded({
    extended : true
}))

mongoose.connect(dbConfig.mongoUrl, {
  useUnifiedtopology: true,
  useNewUrlParser: true
}).then(() => {
  console.log('mongodb terkoneksi');
}).catch(err => {
  console.log(err)
  console.log("Gagal TErkoneksi dengan mongodb");
})

app.use('/gambar-barang', express.static('public/images'))
app.use('/users', require('./routes/userRoute'))
app.use('/kategoris', require('./routes/kategoriRoute'))
app.use('/barang', require('./routes/barangRoute'))
app.use('/keranjang', require('./routes/keranjangRoute'))
app.use('/transaksi', require('./routes/transaksiRoute'))

// app.get("/", function (req, res) {
//   res.send('Hello World')
// });

// //params
// app.get("/nama/:nama/:umur", (req,res) => {
//     let nama = req.params.nama;
//     let umur = req.params.umur;

//     res.send("Nama:" +nama+"Umur" +umur)
// });

// //body
// app.post("/dataDiri", (req,res) => {
//   let dataDiri = req.body;
//   res.json(dataDiri)
  
// });

// app.get("/query", (req,res) => {
//       let nama = req.query.nama;
//       let umur = req.query.umur;
  
//       res.send("Nama:" +nama+" Umur: " +umur)
//   });
  


app.listen(4000,()=>{
    console.log("Server berjalan di port 4000");
    
});