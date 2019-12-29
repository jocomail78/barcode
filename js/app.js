// navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
// window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
//
// function getUserMedia(constraints, success, failure) {
//     navigator.getUserMedia(constraints, function(stream) {
//         var videoSrc = stream;
//         success.apply(null, [videoSrc]);
//     }, failure);
// }
//
//
// function initCamera(constraints, video, callback) {
//     getUserMedia(constraints, function (src) {
//         video.srcObject = src;
//         video.addEventListener('loadeddata', function() {
//             var attempts = 10;
//
//             function checkVideo() {
//                 if (attempts > 0) {
//                     if (video.videoWidth > 0 && video.videoHeight > 0) {
//                         console.log(video.videoWidth + "px x " + video.videoHeight + "px");
//                         video.play();
//                         callback();
//                     } else {
//                         window.setTimeout(checkVideo, 100);
//                     }
//                 } else {
//                     callback('Unable to play video stream.');
//                 }
//                 attempts--;
//             }
//
//             checkVideo();
//         }, false);
//     }, function(e) {
//         console.log(e);
//     });
// }
//
// function copyToCanvas(video, ctx) {
//     ( function frame() {
//         ctx.drawImage(video, 0, 0);
//         window.requestAnimationFrame(frame);
//     }());
// }
//
// window.addEventListener('load', function() {
//     var constraints = {
//             video: {
//                 facingMode: "environment"
//             }
//         },
//         video = document.createElement('video'),
//         canvas = document.createElement('canvas');
//
//     document.body.appendChild(video);
//     document.body.appendChild(canvas);
//
//     initCamera(constraints, video, function() {
//         canvas.setAttribute('width', video.videoWidth);
//         canvas.setAttribute('height', video.videoHeight);
//         copyToCanvas(video, canvas.getContext('2d'));
//     });
// }, false);
