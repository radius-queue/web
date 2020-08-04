import {storage, auth} from '../firebase';
import firebase from 'firebase/app';

/**
 * Uploads image to firebase
 * @param {File} file file to be uploaded
 * @param {boolean} isBusiness true if user is business, false if logged in
 *  customer
 * @param {JSON} metadata set of metadata
 * @param {function} callback takes in download url if successful post, empty
 *  string if failed
 */
export function postPic(file: File, isBusiness: boolean,
    metadata: any = undefined, callback: (URL : string) => void) {
  const storageRef = storage.ref();
  metadata = (metadata) ? metadata : {contentType: 'image/jpeg'};
  let path = (isBusiness) ? 'businessImages/' : 'customerImages';
  path = path + auth.currentUser!.uid + '/';

  // Upload file and metadata to the object 'images/mountains.jpg'
  const uploadTask = storageRef.child(path + file.name).put(file, metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function(error: any) {
        console.log(error.code);
        callback('');
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
      }, function() {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
          callback(downloadURL);
        });
      });
}

/**
 * Obtain image from database
 * @param {string} path path to access image (ex: businessImages/IMG_1391.HEIC)
 * @param {function} callback
 */
export async function getPic(path: string, callback: (URL : string) => void) {
  const storageRef = storage.ref();
  const starsRef = storageRef.child(path);

  // Get the download URL
  await starsRef.getDownloadURL().then(function(url:string) {
    callback(url);
  }).catch(function(error) {
    console.log(error.code);
    callback('');
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
  });
}
