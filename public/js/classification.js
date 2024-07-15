/* eslint-disable */

//***************** Local Functions ********************/
const _countAttr = (dataset, attr, value) => {
  return dataset.reduce((acc, pegawai) => (pegawai[attr] === value ? acc + 1 : acc), 0);
};

const _calcAttrProbability = (dataset) => {
  const jabatanOptionValues = [
    'Generalis',
    'Officer Kinerja',
    'TL Teknik',
    'TL Rensis',
    'Team Leader Administrasi dan Umum',
    'TL SAR DAN YAN GAN',
    'JTC  Pengaturan Operasi',
    'Of Kinerja Transaksi Energi Listrik',
    'Plt. Manager ULP',
    'JO Pengendalian Piutang',
  ];
  const masaKerjaOptionValues = [
    '< 1 Tahun',
    '1 - 3 Tahun',
    '4 - 6 Tahun',
    '7 - 10 Tahun',
    '> 10 Tahun',
  ];
  const gradeGajiOptionValues = ['Grade 7 - 8', 'Grade 9 - 11', 'Grade 12 - 13'];
  const statusNikahOptionValues = ['Menikah', 'Belum Menikah', 'Cerai'];
  const jumlahAnakOptionValues = ['0 Anak', '1 - 2 Anak', '3 Anak', '> 3 Anak'];
  const hutangTempatLainOptionValues = ['Ya', 'Tidak'];
  const kelayakanOptionValues = ['Layak', 'Tidak Layak'];

  const probObj = {
    jabatan: jabatanOptionValues.reduce((obj, key) => {
      obj[key] = {};
      obj[key]['Layak'] =
        _countAttr(
          dataset.filter((el) => el.kelayakan === 'Layak'),
          'jabatan',
          key,
        ) / _countAttr(dataset, 'jabatan', key);
      obj[key]['Tidak Layak'] =
        _countAttr(
          dataset.filter((el) => el.kelayakan === 'Tidak Layak'),
          'jabatan',
          key,
        ) / _countAttr(dataset, 'jabatan', key);
      return obj;
    }, {}),
    masa_kerja: masaKerjaOptionValues.reduce((obj, key) => {
      obj[key] = {};
      obj[key]['Layak'] =
        _countAttr(
          dataset.filter((el) => el.kelayakan === 'Layak'),
          'masa_kerja',
          key,
        ) / _countAttr(dataset, 'masa_kerja', key);
      obj[key]['Tidak Layak'] =
        _countAttr(
          dataset.filter((el) => el.kelayakan === 'Tidak Layak'),
          'masa_kerja',
          key,
        ) / _countAttr(dataset, 'masa_kerja', key);
      return obj;
    }, {}),
    grade_gaji: gradeGajiOptionValues.reduce((obj, key) => {
      obj[key] = {};
      obj[key]['Layak'] =
        _countAttr(
          dataset.filter((el) => el.kelayakan === 'Layak'),
          'grade_gaji',
          key,
        ) / _countAttr(dataset, 'grade_gaji', key);
      obj[key]['Tidak Layak'] =
        _countAttr(
          dataset.filter((el) => el.kelayakan === 'Tidak Layak'),
          'grade_gaji',
          key,
        ) / _countAttr(dataset, 'grade_gaji', key);
      return obj;
    }, {}),
    status_nikah: statusNikahOptionValues.reduce((obj, key) => {
      obj[key] = {};
      obj[key]['Layak'] =
        _countAttr(
          dataset.filter((el) => el.kelayakan === 'Layak'),
          'status_nikah',
          key,
        ) / _countAttr(dataset, 'status_nikah', key);
      obj[key]['Tidak Layak'] =
        _countAttr(
          dataset.filter((el) => el.kelayakan === 'Tidak Layak'),
          'status_nikah',
          key,
        ) / _countAttr(dataset, 'status_nikah', key);
      return obj;
    }, {}),
    jumlah_anak: jumlahAnakOptionValues.reduce((obj, key) => {
      obj[key] = {};
      obj[key]['Layak'] =
        _countAttr(
          dataset.filter((el) => el.kelayakan === 'Layak'),
          'jumlah_anak',
          key,
        ) / _countAttr(dataset, 'jumlah_anak', key);
      obj[key]['Tidak Layak'] =
        _countAttr(
          dataset.filter((el) => el.kelayakan === 'Tidak Layak'),
          'jumlah_anak',
          key,
        ) / _countAttr(dataset, 'jumlah_anak', key);
      return obj;
    }, {}),
    hutang_tempat_lain: hutangTempatLainOptionValues.reduce((obj, key) => {
      obj[key] = {};
      obj[key]['Layak'] =
        _countAttr(
          dataset.filter((el) => el.kelayakan === 'Layak'),
          'hutang_tempat_lain',
          key,
        ) / _countAttr(dataset, 'hutang_tempat_lain', key);
      obj[key]['Tidak Layak'] =
        _countAttr(
          dataset.filter((el) => el.kelayakan === 'Tidak Layak'),
          'hutang_tempat_lain',
          key,
        ) / _countAttr(dataset, 'hutang_tempat_lain', key);
      return obj;
    }, {}),
    kelayakan: kelayakanOptionValues.reduce((obj, key) => {
      obj[key] = _countAttr(dataset, 'kelayakan', key) / dataset.length;
      return obj;
    }, {}),
  };

  return probObj;
};

const _naiveBayesPrediction = (probObj, pengaju) => {
  const layakValue =
    probObj.kelayakan['Layak'] *
    probObj.jabatan[pengaju.jabatan]['Layak'] *
    probObj.masa_kerja[pengaju.masa_kerja]['Layak'] *
    probObj.grade_gaji[pengaju.grade_gaji]['Layak'] *
    probObj.status_nikah[pengaju.status_nikah]['Layak'] *
    probObj.jumlah_anak[pengaju.jumlah_anak]['Layak'] *
    probObj.hutang_tempat_lain[pengaju.hutang_tempat_lain]['Layak'];
  const tidakLayakValue =
    probObj.kelayakan['Tidak Layak'] *
    probObj.jabatan[pengaju.jabatan]['Tidak Layak'] *
    probObj.masa_kerja[pengaju.masa_kerja]['Tidak Layak'] *
    probObj.grade_gaji[pengaju.grade_gaji]['Tidak Layak'] *
    probObj.status_nikah[pengaju.status_nikah]['Tidak Layak'] *
    probObj.jumlah_anak[pengaju.jumlah_anak]['Tidak Layak'] *
    probObj.hutang_tempat_lain[pengaju.hutang_tempat_lain]['Tidak Layak'];

  return layakValue > tidakLayakValue ? 'Layak' : 'Tidak Layak';
};

const _calculateAccuracy = (probObj, dataTest) => {
  dataTest.forEach((pegawai) => {
    pegawai['prediksi_kelayakan'] = _naiveBayesPrediction(probObj, pegawai);
  });

  const accuracy =
    dataTest.reduce(
      (acc, pegawai) => (pegawai.kelayakan === pegawai.prediksi_kelayakan ? (acc += 1) : acc),
      0,
    ) / dataTest.length;

  return accuracy;
};

//***************** Exported Functions ********************/
export const naiveBayes = (dataTrain, dataTest, pengaju) => {
  const probObj = _calcAttrProbability(dataTrain);
  const prediksi_kelayakan = _naiveBayesPrediction(probObj, pengaju);
  const akurasi = _calculateAccuracy(probObj, [...dataTest]);

  return { prediksi_kelayakan, akurasi };
};
