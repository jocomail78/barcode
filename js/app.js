var imageCapture = null;
var deviceConfig = {
    video: {
        width: 480,
        height: 640,
        facingMode: "environment", /* may not work, see https://bugs.chromium.org/p/chromium/issues/detail?id=290161 */
        deviceId: null
    }
};

var imageCaptureConfig = {
    fillLightMode: "torch", /* or "flash" */
    focusMode: "continuous"
};

// get the available video input devices and choose the one that represents the backside camera
navigator.mediaDevices.enumerateDevices()
/* replacement for not working "facingMode: 'environment'": use filter to get the backside camera with the flash light */
    .then(mediaDeviceInfos => mediaDeviceInfos.filter(mediaDeviceInfo => ((mediaDeviceInfo.kind === 'videoinput')/* && mediaDeviceInfo.label.includes("back")*/)))
    .then(mediaDeviceInfos => {
        console.log("mediaDeviceInfos[0].label: " + mediaDeviceInfos[0].label);

        // get the device ID of the backside camera and use it for media stream initialization
        deviceConfig.video.deviceId = mediaDeviceInfos[0].deviceId;
        navigator.mediaDevices.getUserMedia(deviceConfig)
            .then(_gotMedia)
            .catch(err => console.log('getUserMedia() failed: ', err));
    });

function takePhoto () {
    imageCapture.takePhoto()
        .then(blob => {
            console.log('Photo taken: ' + blob.type + ', ' + blob.size + 'B');

            // get URL for blob data and use as source for the image element
            const image = document.querySelector('img');
            image.src = URL.createObjectURL(blob);
        })
        .catch(err => console.error('takePhoto() failed: ', err));
}

function _gotMedia (mediastream) {
    // use the media stream as source for the video element
    const video = document.querySelector('video');
    video.srcObject = mediastream;

    // create an ImageCapture from the first video track
    const track = mediastream.getVideoTracks()[0];
    imageCapture = new ImageCapture(track);

    // set the image capture options (e.g. flash light, autofocus, ...)
    imageCapture.setOptions(imageCaptureConfig)
        .catch(err => console.error('setOptions(' + JSON.stringify(imageCaptureConfig) + ') failed: ', err));
}
