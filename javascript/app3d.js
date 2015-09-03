// (function(background){

console.log("app3d.js connected")


// var camera
// var scene
// var renderer
// var cube



// var SceneController = (function(){
    
//     function SceneController(){
//       this.rotationX = 0
//       this.rotationY = 0
//       this.rotationZ = 0
//     }


//     SceneController.prototype.setRotation = function(x, y, z){
//       this.rotationX += x
//       this.rotationY += y
//       this.rotationZ += z
//     }
//     return SceneController
// })()

// var cubeController = new SceneController
// cubeController.setRotation()


window.onload = (function(){
  // $('#projects').hide()
  background.render()
})()

$(window).on('scroll', function(event){
  var scrollPos = $(window).scrollTop()
  var scrollPercent = scrollPos / (document.body.clientHeight - $(window).height())
  var cameraMax = 43
  var cameraMin = 23
  // move the camera for parallx effect
  background.camera.position.y = -(cameraMax - cameraMin)*scrollPercent + cameraMin
  
  background.cube.rotation.x = scrollPos/300

  // background.render()
  // var oldRotation = {rotation: cube.rotation.x}
  // var tween = new TWEEN.Tween(oldRotation).to({rotation: scrollPos/400}, 50)
  // tween.easing(TWEEN.Easing.Linear.None)
  // var onUpdate = function (){
  //   var rotation = this.rotation
  //   cube.rotation.x = rotation
  // }
  // tween.onUpdate(onUpdate)
  // tween.start()

})

$(".nav-list-item").mouseover(function(event){
  console.log(event.target)
  var hoverElement = event.target
  enlarge(hoverElement)
})
$(".nav-list-item").mouseout(function(event){
  console.log(event.target)
  var hoverElement = event.target
  shrink(hoverElement)
})

// $('[data-role="nav"]').click(function(){
//   var target = $(this).attr('data-target')
//   // console.log(target)
//   $('.current').fadeOut(700, function(){
//     $(this).removeClass('current')
//     // $(window).scrollTop(0) 
//     $('#' + target + '').fadeIn(700, function(){
//       $(this).addClass('current')
//     })
//   })
// })

$('[data-role="nav"]').click(function(){
  var target = $(this).attr('data-target')
  console.log(target)
  $('#about').hide()
  $('#projects').hide()
  $('.current').removeClass('.current')
  $('#' + target + '').show()
  if (target === 'home'){
    $('#about').show()
  }
  $('#' + target + '').addClass('.current')
  // $('.current').fadeOut(500, function(){
  //   $(this).removeClass('current')
  //   $('#projects').fadeIn(500, function(){
  //     $(this).addClass('current')
  //   })
  // })
})

function enlarge(el){
  $(el).animate({ 'font-size': '28px'}, 400)
}

function shrink(el){
  $(el).animate({ 'font-size': '20px'}, 400)
}

// })(window.background)
