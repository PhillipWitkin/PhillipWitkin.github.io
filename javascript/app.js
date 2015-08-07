console.log("connected")

var $textBlock1 = $("#text1")
var $testBlock = $(".head2")
var $backing = $(".backgroundAux")
var $movingBack1 = $(".movingBackground")
// var $rotatingDiv = $("#altered")

var screenHeight = window.screen.availHeight

var startPos = function(div){
    var divPos = div.offset().top 
    return divPos - 2.5*screenHeight/4
}

var endPos = function(div){
    return startPos(div) + div.height() + 1.5*screenHeight/4
}
  // var startingPos = startPos($rotatingDiv)
  // console.log(startingPos)
  // var endingPos = endPos($rotatingDiv)
  // console.log(endingPos)

var obtainRotationAngle = function(scrollPos, top, bottom){
  if (scrollPos < top){
    return -90
  }else if (scrollPos > top && scrollPos < bottom){
    //scale the scrollPos with an expression that gives -90 when scrollPos=top and 90 when scrollPos=bottom 
    var scaledInput = (180*(scrollPos-top)/(bottom-top)) - 90
    //take the sine of a multiplier times the scaled input converted to degrees to create some easing of the rotation
    var easedInput = 90*Math.sin(scaledInput*Math.PI/180)
    // if (scaledInput > -15 && scaledInput < 15){
    //   return easedInput/3
    
    // }
    if (scaledInput > -15 && scaledInput < 15){
      if (scaledInput > -5 && scaledInput < 5){
        return 0
      }else{ 
        return easedInput/4
      }
    
    }else{
      return easedInput 
    } 

  }else if (scrollPos > bottom){
    return 90
  }

}

//function with domain -90 to 90 that ranges 1 from -60 to 60 and drops to 0 on either side 
  var obtainOpacity = function(angle, top, bottom){
    //scale the scrollPos with an expression that gives -90 when scrollPos=top and 90 when scrollPos=bottom 
    // var scaledPos = (180*(scrollPos-top)/(bottom-top)) - 90
    // console.log(parseFloat(angle))
    // console.log(Math.abs(parseFloat(angle)))
    var parsedAngle = Math.abs(parseFloat(angle))
    var adjustedAngle = 90*Math.cos(1.2*parsedAngle*Math.PI/180)
    //check to see if the angle is between -60 and 60 
    console.log(adjustedAngle)
    // if (parsedAngle < 60){
    if (adjustedAngle > 30){
      return 1

    }else {
      //if it is outside the range, determine the opacity so that it tends toward 0 as the absolte value of the angle increases towards 90
      // return (90 - parsedAngle)/30
      return adjustedAngle/30
    }
  }

var $rotatingDivArray = []
var breakingPoints = []
var rotatingSections = 3

for (var i = 1; i < rotatingSections; i++){
  var divName = "altered" + i
  var $nextDiv = $('#' + divName)
  $rotatingDivArray.push($nextDiv)
  var nextDivLocation = {
    startPosition: startPos($nextDiv),
    endPosition: endPos($nextDiv)
  }
  breakingPoints.push(nextDivLocation)
}

function makeItRoll(element, scrollPos){
  var elementPlace = $rotatingDivArray.indexOf(element)
  // console.log(elementPlace)
  var startingPos = breakingPoints[elementPlace].startPosition
  var endingPos = breakingPoints[elementPlace].endPosition
  var angle = obtainRotationAngle(scrollPos, startingPos, endingPos) + 'deg'
  var opacity = obtainOpacity(parseFloat(angle), startingPos, endingPos)
  //transform the element so that it rolls
  console.log(angle)
  console.log(opacity)
  element.css('transform', 'rotateX('+ angle + ')')
  element.css('opacity', opacity)
  // element.css('top', parseFloat(angle)*2)
}

$(window).on('scroll', function(event){
  var scrollPos = $(window).scrollTop();
  // console.log(scrollPos)
  var block1pos = $textBlock1.offset();
  $movingBack1.css('top', .5*scrollPos)
  // console.log(block1pos)
  for (var i = 0; i < 2; i++){
    if (scrollPos > breakingPoints[i].startPosition && scrollPos < breakingPoints[i].endPosition){
      makeItRoll($rotatingDivArray[i], scrollPos)
      console.log("section number " + i)
    }

    // var $rotatingDiv = $rotatingDivArray[i]
    // var startingPos = breakingPoints[i].startPosition
    // var endingPos = breakingPoints[i].endPosition

    // var angle = obtainRotationAngle(scrollPos, startingPos, endingPos) + 'deg'
    // var opacity = obtainOpacity(parseFloat(angle), startingPos, endingPos)
    // // var yAxis = 20*Math.sin(angle)

    // // var transformOriginCoordString = "50% 0% -200px"
    // // console.log(angle)
    // console.log(opacity)

    // // $rotatingDiv[0].style.transformOrigin, transformOriginCoordString 
    // $rotatingDiv.css('transform', 'rotateX('+ angle + ')')
    // $rotatingDiv.css('opacity', opacity)

    // $backing.css('background', 'linear-gradient('+ angle + ', rgba(0,0,0,0), white 70%, rgba(0,0,0,0))')
  }

  // $testBlock.css('background', 'linear-gradient('+ angle + ', rgba(0,0,0,1), white 30%, white 70%, rgba(0,0,0,0))');
})

  
