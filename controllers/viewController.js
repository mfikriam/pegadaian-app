const { Pegawai, Pengaju } = require('./../models');
const catchAsync = require('./../utils/catchAsync');

//**************************** EXPORTED FUNCTIONS *********************************/
exports.getBlankPage = (req, res) => {
  res.status(200).render('blank', {
    title: 'Blank Page',
  });
};

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
