let socket = io('http://localhost:6500');
const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}
const peerConnection = new RTCPeerConnection(configuration);

const constraints = window.constraints = {
    audio: true,
    video: true
};

let user_video = async() =>{
    try {
        let stream = await navigator.mediaDevices.getUserMedia(constraints);
        return stream;
    } catch (error) {
        console.warn(error.message);
    }
}

let getOffer = async() =>{
    let offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer)
    return offer;
}

let getAnswer = async(offer) =>{
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer))
    let ans = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(ans);
    return ans;
}

let local_video = document.getElementById('local_video');
let Remote_video = document.getElementById('Remote_video');

document.getElementById('join_btn').addEventListener('click',async() =>{
    try {
        let stream = await user_video();
        local_video.srcObject = stream;
         Remote_video.srcObject = stream;
    } catch (error) {
        console.warn(error.message)
    }
})
