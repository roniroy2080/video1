const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}
const peerConnection = new RTCPeerConnection(configuration);
let socket = null;

let mute_btn = document.getElementById('mute_btn');
let toast_text = document.getElementById('snackbar');
let other_joined_or_not = document.getElementById('other_joined_or_not');
let isMute = false;
let remote_user_name,local_user_name,room_ID;
let stream_video_and_audio = null;

const constraints = window.constraints = {
    audio: true,
    video: true
};


document.getElementById('room_id_local').innerHTML = localStorage.getItem('ROOM-ID');
document.getElementById('room_password_local').innerHTML = localStorage.getItem('ROOM-PASSWORD');

let user_video = async() =>{
    try {
        let stream = await navigator.mediaDevices.getUserMedia(constraints);
        socket = io('http://localhost:6500');
        return stream;
    } catch (error) {
        if(error.message)
        {
            toast_text.innerHTML = 'Permission Denied';
            toast();
        }
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

let stream_sending = stream =>{
    stream.getTracks().forEach(track => {
        peerConnection.addTrack(track,stream);
    });
}

let local_video = document.getElementById('local_video');
let Remote_video = document.getElementById('Remote_video');

document.getElementById('join_btn').addEventListener('click',async() =>{
    try {
        let stream = await user_video();
        local_video.srcObject = stream;
        stream_sending(stream);
    } catch (error) {
        console.warn(error.message)
    }
})

mute_btn.onclick = () =>{
    console.log(localStorage.getItem('ROOM-ID').length)
    if(isMute)
    {
        mute_btn.innerHTML = 'Mute';
        isMute = false;
    }else
    {
        mute_btn.innerHTML = 'UnMute';
        isMute = true;
    }
}


document.getElementById('logout_room').onclick = () => {
    localStorage.removeItem('ROOM-PASSWORD');
    localStorage.removeItem('ROOM-ID');
    window.location.href="index.html";
}


peerConnection.onnegotiationneeded = async() =>{  
    let offer = await getOffer();
    socket.emit('nego:needed:server:offer',{
        offer,
        to:roomID.value
    });
}