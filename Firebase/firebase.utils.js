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
  addDoc,
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

const downloadedFileAndSaveInUserFS = async (
  uid,
  resumitDownloadedId,
  precioComprado
) => {
  // Cuando un Usuario descarga un archivo, se guarda en myDownloadedFiles y en el documento del resumit, agregar su descargar y agregarle 1 sus downloades
  const userDocRef = doc(db, "users", uid);
  const userSnapshot = await getDoc(userDocRef);
  const downloadedAt = new Date();
  const mostradoPopUp = false;
  // eslint-disable-next-line prefer-const
  let { myDownloadedFiles, inARowNotPayingDownloads } = userSnapshot.data();

  if (!inARowNotPayingDownloads) {
    inARowNotPayingDownloads = 0;
  }
  if (precioComprado > 0) {
    inARowNotPayingDownloads = 0;
  } else {
    inARowNotPayingDownloads += 1;
  }

  myDownloadedFiles.push({ resumitDownloadedId, downloadedAt, mostradoPopUp });

  try {
    await updateDoc(userDocRef, {
      myDownloadedFiles,
      inARowNotPayingDownloads,
    });
    console.log("updates new things");
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

const downloadFileAndSaveInResumiterFB = async (
  uidResumiter,
  uidAportador,
  mailComprador,
  precioComprado,
  nameComprador
) => {
  console.log("aqui");
  const userDocRef = doc(db, "users", uidResumiter);
  const userSnapshot = await getDoc(userDocRef);
  let { aportadores } = userSnapshot.data();
  if (!aportadores) {
    aportadores = [];
  }
  // Buscar si existe ese aportador
  const found = aportadores.findIndex(
    (element) => element.uidAportador === uidAportador
  );
  if (found != -1) {
    aportadores[found].totalAportada += precioComprado;
  } else {
    const dataPorAgregar = {
      uidAportador: uidAportador,
      mailComprador: mailComprador,
      totalAportada: precioComprado,
      nameAportador: nameComprador,
    };
    aportadores.push(dataPorAgregar);
  }

  // Actualizar en FB al resumiter
  try {
    await updateDoc(userDocRef, {
      aportadores: aportadores,
    });
  } catch (error) {
    console.log("error updating aportadores", error.mesagge);
  }
};

const addToHistorialFB = async (nameComprador, nameResumiter, invitado) => {
  const docRef = await addDoc(collection(db, "historial"), {
    nameComprador: nameComprador,
    nameResumiter: nameResumiter,
    invitado: invitado,
    date: new Date(),
    likes: 0,
    dislikes: 0,
  });
  console.log(docRef.id);
};

module.exports = {
  downloadedFileAndSaveInResumitFS,
  downloadedFileAndSaveInUserFS,
  downloadFileAndSaveInResumiterFB,
  addToHistorialFB,
};
