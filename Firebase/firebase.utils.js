const { initializeApp } = require("firebase/app");

const {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  collection,
  updateDoc,
  deleteField,
  deleteDoc,
} = require("firebase/firestore");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwCUwU_cXkU_iefEJ9MuDmfKL6egh7Wzs",
  authDomain: "resumit-web-app.firebaseapp.com",
  projectId: "resumit-web-app",
  storageBucket: "resumit-web-app.appspot.com",
  messagingSenderId: "540887151677",
  appId: "1:540887151677:web:ff3d2cb225651e7652e654",
  measurementId: "G-Z775T8EG0B",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();

const downloadedFileAndSaveInUserFS = async (uid, resumitDownloadedId) => {
  // Cuando un Usuario descarga un archivo, se guarda en myDownloadedFiles y en el documento del resumit, agregar su descargar y agregarle 1 sus downloades
  const userDocRef = doc(db, "users", uid);
  const userSnapshot = await getDoc(userDocRef);

  // eslint-disable-next-line prefer-const
  let { myDownloadedFiles } = userSnapshot.data();

  myDownloadedFiles.push(resumitDownloadedId);

  try {
    await updateDoc(userDocRef, {
      myDownloadedFiles,
    });
  } catch (error) {
    console.log("error creating user", error.mesagge);
  }
  return userDocRef;
};

const downloadedFileAndSaveInResumitFS = async (
  uid,
  email,
  resumitDownloadedId,
  resumitDownloadedUserId,
  precioComprado
) => {
  // Cuando un Usuario descarga un archivo, use se guarda en el documento del resumit, agregar su descarga y agregarle 1 sus downloades
  const resumitDocRef = doc(db, "resumit", resumitDownloadedId);
  const resumitSnapshot = await getDoc(resumitDocRef);
  // Tambien agregar el precio comprado al dueño del resumit
  const userDocRef = doc(db, "users", resumitDownloadedUserId);
  const userSnapshot = await getDoc(userDocRef);
  // eslint-disable-next-line no-unused-vars, prefer-const
  let { downloadsCuantity, downloadsData, dineroGenerado } =
    resumitSnapshot.data();
  let { dineroPorRetirar } = userSnapshot.data();
  const mailComprador = email;
  const dayOfPurchase = new Date();
  downloadsCuantity += 1;
  dineroPorRetirar += parseInt(precioComprado, 10);
  dineroGenerado += parseInt(precioComprado, 10);
  downloadsData.push({ precioComprado, mailComprador, dayOfPurchase });
  try {
    await updateDoc(resumitDocRef, {
      downloadsCuantity: downloadsCuantity,
      downloadsData: downloadsData,
      dineroGenerado: dineroGenerado,
    });
  } catch (error) {
    console.log("error creating resumit weas", error.mesagge);
  }
  try {
    await updateDoc(userDocRef, {
      dineroPorRetirar: dineroPorRetirar,
    });
  } catch (error) {
    console.log("error creating resumit weas", error.mesagge);
  }
  return resumitDocRef;
};

module.exports = {
  downloadedFileAndSaveInResumitFS,
  downloadedFileAndSaveInUserFS,
};
