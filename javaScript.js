var fgimage=null;
var bgimage=null;
var fgcanvas;
var bgcanvas;
function loadForegroundImage(){
  var file=document.getElementById("fgfile");
  fgimage=new SimpleImage(file);
  fgcanvas=document.getElementById("fgcan");
  fgimage.drawTo(fgcanvas);
}
function loadBackgroundImage(){
  var file=document.getElementById("bgfile");
  bgimage=new SimpleImage(file);
  bgcanvas=document.getElementById("bgcan");
  bgimage.drawTo(bgcanvas);
}
function clearCanvas(){
  doClear(fgcanvas);
  doClear(bgcanvas);
  
}
function doClear(canvas){
  var context=canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
  
}
function doGreenScreen(){
  if(fgimage==null || !fgimage.complete())
    {
      alert('image not loaded');
    }
  if(bgimage==null || !bgimage.complete())
    {
      alert('image not loaded');
    }
   clearCanvas();
  var finalImage=createComposite();
  finalImage.drawTo(fgcanvas);
    
  }

function createComposite(){
  var output=new SimpleImage(fgimage.getWidth(),fgimage.getHeight);
  var greenThreshold=240;
  for(var pixel of fgimage.values())
    {
      var x=pixel.getX();
      var y=pixel.getY();
      if(pixel.getGreen()>greenThreshold)
        {
          var bgpixel=bgimage.getPixel(x,y);
          output.setPixel(x,y,bgpixel);
        }
      else{
        output.setPixel(x,y,pixel);
      }
    }
  return output;
}