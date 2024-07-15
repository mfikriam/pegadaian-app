const { Pegawai, Pengaju } = require('./../models');
const { NasabahLama, NasabahBaru } = require('./../models');
const catchAsync = require('./../utils/catchAsync');

function convertRupiah(num) {
  const mil = num * 1000000;
  return `Rp${mil.toLocaleString()}`;
}

function convertRiwayatPembayaran(num) {
  switch (num) {
    case 1:
      return 'Tepat Waktu';
    case 2:
      return 'Terlambat 1 Bulan';
    case 3:
      return 'Terlambat 2 Bulan';
    case 4:
      return 'Terlambat 3 Bulan';
    case 5:
      return 'Terlambat >3 Bulan';
    default:
      return 'Unknown';
  }
}

function convertPotensial(num) {
  switch (num) {
    case 0:
      return 'Tidak';
    case 1:
      return 'Ya';
    default:
      return 'Unknown';
  }
}

//**************************** EXPORTED FUNCTIONS *********************************/
exports.getBlankPage = (req, res) => {
  res.status(200).render('blank', {
    title: 'Blank Page',
  });
};

exports.getNasabahLamaPage = catchAsync(async (req, res, next) => {
  const resultQuery = await NasabahLama.findAll();
  const resultQueryArr = resultQuery.map((instance) => instance.dataValues);

  res.status(200).render('nasabah-lama', {
    title: 'Halaman Nasabah Lama',
    modelName: 'nasabah-lama',
    nasabahLamaObjArr: resultQueryArr,
    convertRupiah,
    convertRiwayatPembayaran,
    convertPotensial,
  });
});

exports.getNasabahBaruPage = catchAsync(async (req, res, next) => {
  const resultQuery = await NasabahBaru.findAll();
  const resultQueryArr = resultQuery.map((instance) => instance.dataValues);

  res.status(200).render('nasabah-baru', {
    title: 'Halaman Nasabah Baru',
    modelName: 'nasabah-baru',
    nasabahBaruObjArr: resultQueryArr,
    nasabahLamaObjArr: (await NasabahLama.findAll()).map((instance) => instance.dataValues),
    convertRupiah,
    convertRiwayatPembayaran,
    convertPotensial,
  });
});

exports.getPegawaiPage = catchAsync(async (req, res, next) => {
  const resultQuery = await Pegawai.findAll({
    order: [['nama', 'ASC']],
  });
  const resultQueryArr = resultQuery.map((instance) => instance.dataValues);

  res.status(200).render('pegawai', {
    title: 'Halaman Pegawai',
    modelName: 'pegawai',
    pegawaiObjArr: resultQueryArr,
  });
});

exports.getPengajuPage = catchAsync(async (req, res, next) => {
  const resultQuery = await Pengaju.findAll();
  const resultQueryArr = resultQuery.map((instance) => instance.dataValues);

  res.status(200).render('pengaju', {
    title: 'Halaman Pengaju',
    modelName: 'pengaju',
    pengajuObjArr: resultQueryArr,
    pegawaiObjArr: (await Pegawai.findAll()).map((instance) => instance.dataValues),
  });
});
