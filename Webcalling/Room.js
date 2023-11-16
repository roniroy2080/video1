let room_id_JOIN = document.getElementById('room_id_join'),
room_id_password = document.getElementById('room_id_password')

let toast_text = document.getElementById('snackbar');




function generate() {
    _sym = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
    str = '';
    for(var i = 0; i < 25; i++) {
        str += _sym[parseInt(Math.random() * (_sym.length))];
    }
    room_id_JOIN.value = str;
}



document.getElementById('join_room_btn').onsubmit = e =>{
    e.preventDefault()
    if(room_id_JOIN.value.trim().length > 0 && room_id_password.value.trim().length > 0)
    {
        localStorage.setItem('ROOM-ID',room_id_JOIN.value.trim());
        localStorage.setItem('ROOM-PASSWORD',room_id_password.value.trim());
        window.location.href="Room.html";
    }else{
        toast_text.innerHTML = 'Please Enter Room ID & Password To Join';
        toast();
    }
}