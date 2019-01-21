var ffl =require('ffl')
var Jimp =require('jimp')
var os=require('os')
//'▀'
//'░░'
//\033[48;5;196m  \033[0m one Pixel
var upperHalfBlock='▀'//▀ U+2580
var lowerHalfBlock='▄'//▄ U+2584
var square='▇'
var circle='●'
var pp=''
var rectangel='█'
var chess='░░'
var _default='■'

var brush=chess;
//▀▁▂▃▅▆▇█




process.stdout.write('\033[0m\033[1J')
process.stdout.setDefaultEncoding('utf-8')
var scale=40//scale must be *4 because it's depend on (uppper left (UL) , upper right (UR) , lower left (LL) , lower right(LR))
process.stdin.resume();

function getAVG(image,_ww,_hh,scale){

    var _r=0,_g=0,_b=0;
    var UR=0,UL=0,LR=0,LL=0;

    for (let w = _ww; w < _ww+scale/2; w++) {
       for (let h = _hh; h < _hh+scale/2; h++) {
          
            let {r,g,b}=Jimp.intToRGBA(
                image.getPixelColor(w, h)
            )
            _r+=r;
            _g+=g;
            _b+=b;
           
       }
        
    }
    UL={
        r:parseInt(_r/((scale**2)/4),10),
        g:parseInt(_g/((scale**2)/4),10),
        b:parseInt(_b/((scale**2)/4),10),
    }
    _r=0;
    _g=0;
    _b=0;
    for (let w = _ww+scale/2; w < _ww+scale; w++) {
        for (let h = _hh; h < _hh+scale/2; h++) {
           
             let {r,g,b}=Jimp.intToRGBA(
                 image.getPixelColor(w, h)
             )
             _r+=r;
             _g+=g;
             _b+=b;
            
        }
         
     }
     UR={
         r:parseInt(_r/((scale**2)/4),10),
         g:parseInt(_g/((scale**2)/4),10),
         b:parseInt(_b/((scale**2)/4),10),
     }
     _r=0;
     _g=0;
     _b=0;
     for (let w = _ww; w < _ww+scale/2; w++) {
        for (let h = _hh+scale/2; h < _hh+scale; h++) {
           
             let {r,g,b}=Jimp.intToRGBA(
                 image.getPixelColor(w, h)
             )
             _r+=r;
             _g+=g;
             _b+=b;
            
        }
         
     }
     LL={
         r:parseInt(_r/((scale**2)/4),10),
         g:parseInt(_g/((scale**2)/4),10),
         b:parseInt(_b/((scale**2)/4),10),
     }
    _r=0;
    _g=0;
    _b=0;
     for (let w = _ww+scale/2; w < _ww+scale; w++) {
        for (let h = _hh+scale/2; h < _hh+scale; h++) {
           
             let {r,g,b}=Jimp.intToRGBA(
                 image.getPixelColor(w, h)
             )
             _r+=r;
             _g+=g;
             _b+=b;
            
        }
         
     }
     LR={
         r:parseInt(_r/((scale**2)/4),10),
         g:parseInt(_g/((scale**2)/4),10),
         b:parseInt(_b/((scale**2)/4),10),
     }

    //process.exit()
    return ({
        UL,
        UR,
        LR,
        LL
    })
   
}
Jimp.read(process.argv[2]?process.argv[2]:'2.jpg', function (err, image) {
    
        Jimp.intToRGBA(
            image.getPixelColor(0, 0)
        )

    var w = image.bitmap.width; 
    var h = image.bitmap.height;
    
    for (let hh = 0; hh < h; hh+=scale) {

        for (let ww = 0; ww < w; ww+=scale) {
       
            
            let {UR,UL,LL,LR}=getAVG(image,ww,hh,scale)
            process.stdout.write("\033[48;2;"+LL.r+";"+LL.g+";"+LL.b+"m\033[38;2;"+UL.r+";"+UL.g+";"+UL.b+"m▀\033[0m")
            process.stdout.write("\033[48;2;"+LR.r+";"+LR.g+";"+LR.b+"m\033[38;2;"+UR.r+";"+UR.g+";"+UR.b+"m▀\033[0m")

        }
        process.stdout.write('\n')
        
    }
    

});
