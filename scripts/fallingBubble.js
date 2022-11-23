  var bub1 = document.getElementById("bub1");
  const interval = setInterval(function() {
    console.log(bub1.getPropertyValue('top'));
  }, 5000);
 
 clearInterval(interval); // thanks @Luca D'Ami