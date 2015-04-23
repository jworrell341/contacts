/**
*   Author: Abbas Abdulmalik
*   Creation Date: March 31, 2015
*   Purpose: pixel value formula in place of media queries
*   Modified: April 16, 2015 (extra coment)
*   Notes: 
*
*/
/*====================================================
// Based on the line equation y = mx + b
liquidPixelFactory is a "responsive design"" function, that might be used to replace CSS media queries.

liquidPixelFactory requires two numeric arguments representing the minimum and maximum viewport size an application's device window is expected to have.

So far, it is a raw function with no error-checking, so make sure the arguments are positive numbers, the first being smaller than the second.

It has no side effect, but returns a function (internally named setPixelValue) to be assigned
to a variable of any name of the programmer's choosing.

    Example 1:
    var setPixelValueSmallScreen = liquidPixelFactory(300, 500);
    // the 200 and 500 values represent the expected minimum and maximum pixel range of a small viewport
    var setPixelValueLargeScreen = liquidPixelFactory(800, 2000)
    // the 800 and 2000 values represent the expected pixel range of a large viewport device

These newly assigned functions (setPixelValueSmallScreen and setPixelValueLargeScreen) can be called, triggered by a window resizing (or any event of your choosing), to set the pixel size of an HTML attribute or CSS property between a specified minimum and maximum.
    
    Example 2:
    window.addEventListener("resize", function(){
        document.getElementById('div1').style.fontSize = setPixelValueSmallScreen(15,20) + "px";
        document.getElementById('div2').style.fontSize = setPixelValueLargeScreen(30,50) + "px";        
    }, false);
    
Neither function has side effects, but both return a numeric value (between 15 to 20 pixels in the first case, and between 30 and 50 pixels in the second case). For screen sizes above or below the ranges specified earlier, the pixel values never exceed those limits.  

liquidPixelFactory is a "lambda function" in the sense that it returns an actual function (setPixelValue) that is defined internally, which uses liquidPixelFactory's screen size variables. As such, setPixelValue is a "closure," since it can safely use the variables of its parent function, even after the parent's invocation has terminated.

In Example 2 above, the fontSize responds smoothly and linearly to the window's inner width. For instance, if the window's inner width happens to be 400 pixels when the handler is triggered, div1's fontSize will be 17.5 pixels, which is right in the middle of the range. div 2's fontSize will be fixed at 30 pixels because a 400 pixel viewport in below its 800 pixel minimum.
=====================================================*/
function liquidPixelFactory(minWidth, maxWidth){
    var minWidth = minWidth;
    var maxWidth = maxWidth;
    return  function setPixelValue(minPx, maxPx){    
              var pixelValue = 0;
              if ( innerWidth < minWidth ){
                  pixelValue = minPx;
              }
              else if ( innerWidth > maxWidth ){
                  pixelValue = maxPx;
              }
              else{
                  // y = mx + b, where m = delta y / delta dx ... 
                  // and b = Yo - mXo (for any valid pair of x & y):
                  pixelValue = (maxPx - minPx)*innerWidth/(maxWidth - minWidth) +
                  minPx - (maxPx - minPx)*minWidth/(maxWidth - minWidth);
              }	
              return pixelValue;
            }
}
//====================================================