navigator . getUserMedia =navigator . getUserMedia
                        || navigator . webkitGetUserMedia
                        || navigator .mozGetUserMedia

function bindEvents(p){

    p.on('error',function(err){
        console.log('error', err);
    });

    p.on('signal', function (data){
        document.querySelector('#offer').textContent = JSON.stringify(data)
    })

    p.on('stream', function(stream){
        
        let Video = document.querySelector('#receiver-video');
        Video.srcObject = stream;
        Video.play();
    })

    document.querySelector("#incoming").addEventListener('submit', function(e){
        e.preventDefault();
        
        
        p.signal(JSON.parse(e.target.querySelector('textarea').value));
        
    });
}

function startPeer(initiator){
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    })
    .then(function(stream) {
       
        let p = new SimplePeer({
            initiator: true,
            stream: stream,
            trickle: false
            // config
        })
        
        bindEvents(p);

        let emitterVideo = document.querySelector('#emitter-video');
        emitterVideo.srcObject = stream;
        emitterVideo.play();

        
    })
    .catch(function(err) {
        console.error('Error accessing media devices: ', err);
    });
}

document.querySelector('#start').addEventListener('click', function(e) {
    startPeer(true)
});


document.querySelector('#receiver').addEventListener('click', function(e) {
    startPeer(false)
});

