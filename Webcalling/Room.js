const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}
const peerConnection = new RTCPeerConnection(configuration);
let socket = null;

let user_joined_name = localStorage.getItem('NAME')
let user_joined_password = localStorage.getItem('PASSWORD')
let user_joined_room_ID = localStorage.getItem('ROOM-ID');

document.getElementById('room_detail_name_modal').innerHTML = user_joined_name;
document.getElementById('room_detail_room_id_modal').innerHTML = user_joined_room_ID;
document.getElementById('room_detail_password_modal').innerHTML = user_joined_password;

let MY_ROOM_ID = user_joined_room_ID + user_joined_password;
let OTHERS_ROOM_ID;


let toast_text = document.getElementById('snackbar');


document.getElementById('logout_room').onclick = () =>{
    localStorage.removeItem('NAME')
    localStorage.removeItem('PASSWORD')
    localStorage.removeItem('ROOM-ID')
    window.location.href = 'index.html';
}

let checking_ISLOGIN = () =>{
    if(!localStorage.getItem('NAME') && !localStorage.getItem('PASSWORD') && !localStorage.getItem('ROOM-ID'))
    {
        window.location.href = 'index.html';
    }
}

checking_ISLOGIN();

let room_joining_modal_btn = document.getElementById('room_joining_modal_btn');
let room_joined_by_own_id_pass_btn = document.getElementById('room_joining_by_own_id_btn');
let join_room_close_modal_btn = document.getElementById('join_room_close_modal_btn');

room_joining_modal_btn.addEventListener('click',()=>{
    console.log('clicked')
    var room_id = document.getElementById('room__join_modal');
    room_id = room_id.value.trim()
    var room_password = document.getElementById('room__password_join_modal')
    room_password = room_password.value.trim();

    if(room_id.length > 0 && room_password.length > 0)
    {
        socket = io('http://localhost:6500');
        document.getElementById('room__join_modal').value = null;
        document.getElementById('room__password_join_modal').value = null;
        OTHERS_ROOM_ID = room_id + room_password;
        socket.emit('join:room:id',{
            to:OTHERS_ROOM_ID,
            name:user_joined_name
        })

        room_joining_modal_btn.disabled = 'true';
        room_joined_by_own_id_pass_btn.disabled = 'true';
        join_room_close_modal_btn.click();

    }else
    {
        alert('Enter Room-ID & Password');
    }
})