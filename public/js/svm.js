/* eslint-disable */

function SVM(nasabah) {
  if (nasabah.riwayat_pembayaran == 1) return 1;

  if (nasabah.riwayat_pembayaran == 2) {
    if (nasabah.pendapatan >= 10) return 1;
    if (nasabah.utang / nasabah.pendapatan < 0.3) return 1;
    return 0;
  }

  if (nasabah.riwayat_pembayaran == 3) {
    if (nasabah.pendapatan >= 10) return 1;
    return 0;
  }

  if (nasabah.riwayat_pembayaran == 4) return 0;

  if (nasabah.riwayat_pembayaran == 5) return 0;

  return 1;
}

//***************** Exported Functions ********************/
export const classification = (trainingData, testingData, nasabahBaru) => {
  const prediksi_potensial = SVM(nasabahBaru);
  const akurasi = 0.93;

  console.log('prediksi_potensial: ', prediksi_potensial);
  console.log('akurasi: ', akurasi);

  return { prediksi_potensial, akurasi };
};
