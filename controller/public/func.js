

function updateCanvas (can,val) {
    console.log('can='+can+'  val='+val);
    var h = 10 * Math.floor(val/1000);
    console.log('h='+h);
    console.log('height='+document.getElementById(can).height);
    document.getElementById(can).height = h+'px';
    // TODO draw rect in canvas
}

function setup() {

    // Create WebSocket connection.
    const socket = new WebSocket('ws://localhost:3000/data');
    console.log('socket');

    // Connection opened
    socket.addEventListener('open', function (event) {
        msg = Object();
        msg.cmd = 'hello';
        socket.send( JSON.stringify( msg ) );  // why this required??!!
        console.log('got open');
    });

    // Listen for messages
    socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
        document.getElementById('val').innerHTML = event.data;
        dat = JSON.parse(event.data);
        document.getElementById('tm').innerHTML = dat[0];
        updateCanvas('can1',dat[1]);
        document.getElementById('can2').height = '55'; // not work ??
        d3.select('#w1').text(dat[1]);
        d3.select('#w2').text(dat[2]);
        d3.select('#w3').text(dat[3]);
        d3.select('#w4').text(dat[4]);
        d3.select("#w3").style("color", "red");
        // d3.selectAll("span").style("color", "red");
    });

}

