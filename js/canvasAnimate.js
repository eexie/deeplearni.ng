// Transition
// Ported from flash project - http://wonderfl.net/c/4gvL
//
function Animate() {

  var canvas;
  var context;

  var width;
  var height;

  var oX;
  var oY;

  var v = 2;
  var obj_max = 10;

  var max = 20;
  var amax = 0;

  var firstParticle;

  var interval;

  this.initialize = function() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext('2d');

    width = document.getElementById('contentBody').offsetWidth
    height = 10000

    oX = width / 2;
    oY = 0;

    canvas.width = width;
    canvas.height = height;

    createParticles();

    window.addEventListener('resize', resizeWindow, false);

    //Set interval - Bad! - I know!
    var interval = setInterval(Update, 16);
  }

  var createParticles = function() {

    var sr = 200;
    var vr = 0.5;

    firstParticle = new Particle();
    var p = firstParticle;

     //Detect browser, get pixels for vertical radius of particle changes
      var browser;

      var browserDetect = function() {
      if (bowser.msie) {
        browser = 80
      }  else if (bowser.msedge) {
        browser = 80
      }  else if (bowser.android) {
        browser = 20
      }  else if (bowser.ios) {
        browser = 20
      }  else if (bowser.chrome) {
        browser = 60
      }  else if (bowser.opera) {
        browser = 200
      }  else if (bowser.safari) {
        browser = 100
      }  else {
        browser = 40
      }  
      }

      browserDetect();

       //Detect operating system, get pixels for starting radius of particles
      var userOS;

      var osDetect = function() {
      if (bowser.mac) {
        userOS = 20
      }  else if (bowser.windows) {
        userOS = 60
      }  else if (bowser.windowsphone) {
        userOS = 40
      }  else if (bowser.linux) {
        userOS = 100
      }  else if (bowser.chromeos) {
        userOS = 80
      }  else if (bowser.android) {
        userOS = 50
      }  else if (bowser.ios) {
        userOS = 30
      }  else {
        userOS = 70
      }  
      }

      osDetect();

    var i;
    for (i = 0; i < max; i++) {
      p.ang = i * max;
      p.vang = 1;
      p.r = userOS;
      //vr is vertical radius of particles
      p.vr = browser;
      p.x = oX;
      p.y = oY;

      if (i != max - 1) {
        p.next = new Particle();
        p = p.next;
      }
    }
  }

  //Point class.
  var Particle = function() {
    this.ang;
    this.vang;
    this.r;
    this.vr;
    this.x;
    this.y;
    this.next; //Child
  }

  var Update = function() {

    var count = 0;
    var p = firstParticle;

    while (p) {
      count++;

      if (p.r > 4000) {

        p = p.next;
        continue;

      }

      var ran = Math.random();

      if (ran < 0.2) {

        p.vang = 0;
        p.vr = v;

      } else if (ran < 0.4) {

        p.vang = -v;
        p.vr = 0;

      } else if (ran < 0.07) {

        p.vang = v;
        p.vr = 0;

      } else if (ran < 0.09 && amax < obj_max) {
        var newP = new Particle();
        newP.ang = p.ang;

        if (p.ang == 0) {
          newP.vang = 0;
        } else {
          newP.vang = (Math.random() < 50) ? -1 : 1;
        }

        newP.r = p.r;

        if (p.vang == 0) {

          newP.vr = 100;
        } else {

          newP.vr = 0;
        }

        newP.x = p.x;
        newP.y = p.y;

        newP.next = p.next;
        p.next = newP;

      }

      var r = p.ang + p.vang;
      p.r = p.r + p.vr;

      var ang = Math.PI / 120 * r;

      var ax = p.r * Math.cos(ang);
      //console.log(ax);
      var ay = p.r * Math.sin(ang);

      var rr = Math.sqrt(ax * ax + ay * ay);

      var anga = Math.PI / 120 * (r - (r - p.ang) / 2);

      var px = rr * Math.cos(anga);
      var py = rr * Math.sin(anga);


      //Get date, convert to 12hr, and bind to variable "colour", then initialize
      var d = new Date();
      var hour = d.getHours() / 2;
      var colour;

      var randomColour = function() {
      // if (hour <2) {
      //   colour = "110, 14, 61,"
      // }  else if (hour <4) {
      //   colour = "159, 29, 80,"
      // }  else if (hour <6) {
      //   colour = "33, 121, 128,"
      // }  else if (hour <8) {
      //   colour = "0, 166, 149,"
      // }  else if (hour <10) {
      //   colour = "0, 217, 192,"
      // }  else {
      //   colour = "247, 200, 122,"
      // }  
      if (hour <2) {
        colour = "226, 39, 48,"
      }  else if (hour <4) {
        colour = "6, 33, 50,"
      }  else if (hour <6) {
        colour = "234, 237, 241,"
      }  else if (hour <8) {
        colour = "234, 237, 241,"
      }  else if (hour <10) {
        colour = "6, 33, 50,"
      }  else {
        colour = "212, 218, 224,"
      }  
      }
      randomColour();
      //Start drawing

      context.beginPath();
      context.strokeStyle = 'rgba(' + colour + '0.1)';
      context.moveTo(p.x, p.y);
      context.quadraticCurveTo(px + oX, py + oY, ax + oX, ay + oY);
      context.stroke();
      context.closePath();

      if (p.r > 20) {
      context.beginPath();
      context.fillStyle = 'rgba(' + colour + '0.5)';
      context.arc(px + oX, py + oY, 1, 0, 2*Math.PI, false);
      context.fill();
      context.closePath();
      }
      p.x = ax + oX;
      p.y = ay + oY;
      p.ang = r;
      p = p.next;

      }
    amax = count;

  }

  //Clear the screen on window resize 
  var resizeWindow = function(e) {
    e.preventDefault();
    context.fillStyle = 'rgba(247, 251, 254, 1.0)';
    context.beginPath();
    context.rect(0, 0, width, height);
    context.closePath();
    context.fill(); 
    width = document.getElementById('contentBody').offsetWidth
    height = document.getElementById('contentBody').offsetHeight
    canvas.width = width;
    canvas.height = height;

    oX = width / 2;
    oY = 0;
    //Restart!
    createParticles();
  }
}

var app = new Animate();
app.initialize();