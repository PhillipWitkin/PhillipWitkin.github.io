window.background = (function(){

  var stats = initStats()

  scene = new THREE.Scene()
  var camera
  
  function setupCamera(){

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000)
    
          // position and point the camera to the center of the scene
          camera.position.x = 0;
          camera.position.y = 23;
          camera.position.z = 30;

          camera.near = 5
          camera.far = 70
          // camera.lookAt(scene.position);

    renderer = new THREE.WebGLRenderer()
    renderer.setClearColor(new THREE.Color(0x000000, 1.0))
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

     // add the output of the renderer to the html element
    $("#WebGL-output").append(renderer.domElement);
  }

  function createShape(radius){
    var shapeGeometry = new THREE.SphereGeometry(radius, 5,5)
    // var shapeGeometry = new THREE.OctahedronGeometry(radius, 0)
    var material = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      emissive: 0x0f0005,
      specular: 0xd1d1e0,
      shininess: 40
    })
    var shape = new THREE.Mesh(shapeGeometry, material)
    scene.add(shape)

    return shape
  }

  function populateWithShapes(){
    var shapeNumber = 600
    for (var i=0; i < shapeNumber; i++){
      var newShape = createShape(.4)
      newShape.position.x = getRandomInt(-100, 100)
      newShape.position.y = getRandomInt(-20, 50)
      newShape.position.z = getRandomInt(-140, -10)
    }
  }



      function createMesh(geom) {

            // assign two materials
        var meshMaterial = new THREE.MeshLambertMaterial({
          color: 0x7777ff,
          transparent: true,
          opacity: .75
          // specular: 0x7777ff,
          // shininess: 10,
          // emissive: 0x221111
        });
        meshMaterial.side = THREE.DoubleSide;
        var wireFrameMat = new THREE.MeshDepthMaterial();
        wireFrameMat.wireframe = true;
        wireFrameMat.wireframeLinewidth = 2.5

            // create a multimaterial
        var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);

        return mesh;
      }

  setupCamera()
  setupLight()

  var planeGeometry = new THREE.PlaneGeometry(80, 70, 15, 12);
  var planeMaterial = new THREE.MeshDepthMaterial({
    // wireframe: true,
    // wireframeLinewidth: 4
  });
  var colorMaterial = new THREE.MeshLambertMaterial({
    color: 0x000099,
    transparent: true,
    opacity: 0.5,
    blending: THREE.MultiplyBlending,
    wireframe: true,
    wireframeLinewidth: 4
  })
  var plane = new THREE.SceneUtils.createMultiMaterialObject(planeGeometry, [colorMaterial, planeMaterial])
  // var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.rotation.x = -0.5* Math.PI;
  plane.rotation.z = 0.0 * Math.PI;
  plane.rotation.y = 0.0 * Math.PI;
  plane.position.x = 0;
  plane.position.y = -1;
  plane.position.z = 0;

  scene.add(plane)

  // function cubeControl(){
  // var cubeGeometry = new THREE.DodecahedronGeometry(8, 0);
  // var cubeMaterial = new THREE.MeshPhongMaterial({color: 0xff3333, blending: THREE.MultiplyBlending});
  // var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  var cube = createMesh(new THREE.IcosahedronGeometry(11,0))
  cube.castShadow = true;

        // position the cube
  cube.position.x = 0;
  cube.position.y = 9.5;
  cube.position.z = 0;
  
  // return cube
  // }

        // add the cube to the scene
  scene.add(cube);

  // add the remaining random shapes
  populateWithShapes()


  camera.lookAt(cube.position)

  function setupLight(){

    var ambiColor = "#1c1c1c";
    var ambientLight = new THREE.AmbientLight(ambiColor);
    scene.add(ambientLight);

          // add spotlight for a bit of light
    // var spotLight0 = new THREE.SpotLight(0xcccccc);
    // spotLight0.position.set(-40, 30, -10);
    // spotLight0.lookAt(plane);
    // scene.add(spotLight0);


    var target = new THREE.Object3D();
    target.position = new THREE.Vector3(5, 0, 0);

    var pointColor = "#ffffff";
    var spotLight = new THREE.PointLight(pointColor);
    spotLight.position.set(-70, 80, -20);
    // spotLight.castShadow = true;
    spotLight.intensity = 1.2
    spotLight.shadowCameraNear = 2;
    spotLight.shadowCameraFar = 200;
    spotLight.shadowCameraFov = 30;
    spotLight.target = plane;
    spotLight.distance = 200;
    // spotLight.angle = 1;
    // spotLight.exponent = 100;

    scene.add(spotLight);
  }


  function render() {
    //update gui stats
    stats.update()
    // scene.traverse(function(e){
    //   if (e instanceof THREE.Mesh && e !== plane){
        cube.rotation.z -= .0037        
    //   }
    // })

    // get the next frame
    // TWEEN.update()
    camera.lookAt(cube.position)
    requestAnimationFrame(render)
    renderer.render(scene, camera)
  }

  // render()

  function initStats(){

    var stats = new Stats()
    stats.setMode(0) // shows fps

    stats.domElement.style.position = 'absolute'
    stats.domElement.style.left = '0px'
    stats.domElement.style.top = '0px'

    document.getElementById("Stats-output").appendChild(stats.domElement)

    return stats  
  }

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
    // listen to the resize events
  window.addEventListener('resize', onResize, false);



  function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min
  }


  // make the render function and camera and cube variables available for manipulation outside the function
  return {
    render: render,
    cube: cube,
    camera: camera
  }

    
})()