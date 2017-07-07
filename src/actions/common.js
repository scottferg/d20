import firebase from "firebase";

export const uploadPortrait = (task, onSuccess, onProgress) => {
    return task.on(
        "state_changed",
        function(snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress =
                snapshot.bytesTransferred / snapshot.totalBytes * 100;

            onProgress(progress);

            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log("Upload is paused");
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log("Upload is running");
                    break;
            }
        },
        function(error) {
            // Handle unsuccessful uploads
        },
        function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            onSuccess(task.snapshot.downloadURL);
        },
    );
};
