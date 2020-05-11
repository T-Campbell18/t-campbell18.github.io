var container;
var controls;
var camera, scene, renderer;

var cube;
var colorShow = false
var pllShow = false
var controlsShow = false
var ollShow = false
var waitTime = 7500
var exShow = false

var colors = [0xFF5900, 0xB90000, 0xf8f8ff, 0xFFD500, 0x009B48, 0x0045AD]
const OG_COLORS = [0xFF5900, 0xB90000, 0xf8f8ff, 0xFFD500, 0x009B48, 0x0045AD]

var startx, starty;
var endx, endy;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(1,1);

var intersect;

init();
animate();

function equal(a, b) {
  return Math.abs(a - b) <= 0.001;
}

function init() {
  container = document.createElement("div");
  document.body.appendChild(container);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(2, 2, 3);

  scene.add(camera);
  scene.background = new THREE.Color('white')
  renderer = new THREE.WebGLRenderer({antialias: true, devicePixelRatio: 1 });
  renderer.setSize(window.innerWidth, window.innerHeight);

  container.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.autoRotateSpeed = 15
  controls.enabled = false
  scene.add(new THREE.AmbientLight(0xffffff));

  let light = new THREE.PointLight(0xffffff, 1)
  light.position.set(2,2,3)
  scene.add(light);

  let light2 = new THREE.PointLight(0xffffff, 1)
  light2.position.set(-2, 2 -3)
  scene.add(light2);

  let light3 = new THREE.PointLight(0xffffff, 1)
  light3.position.set(-2, -2, -3)
  scene.add(light3);

  addRubiksCube(3, .2, colors);

  addEventListeners();
}

function addEventListeners() {
  window.addEventListener("resize", onWindowResize, false);

  document.addEventListener("keydown", onKeyDown, false);

  $("#slow").on('click', function(e) {
    cube.speed = .05
  });

  $("#normal").on('click', function(e) {
    cube.speed = .2
  });

  $("#fast").on('click', function(e) {
    cube.speed = .4
  });

  $("#veryfast").on('click', function(e) {
    cube.speed = 1
  });


  $("#2x2").on('click', function(e) {
    let speed = cube.speed
    removeRubiksCube();
    addRubiksCube(2, speed, colors);
  });

  $("#3x3").on('click', function(e) {
    let speed = cube.speed
    removeRubiksCube();
    addRubiksCube(3, speed, colors);
  });

  $("#4x4").on('click', function(e) {
    let speed = cube.speed
    removeRubiksCube();
    addRubiksCube(4, speed, colors);
  });

  $("#5x5").on('click', function(e) {
    let speed = cube.speed
    removeRubiksCube();
    addRubiksCube(5, speed, colors);
  });

  $("#scramble").on('click', function(e) {
    e.preventDefault();
    cube.scramble();
  });

  $("#solve").on('click', function(e) {
    e.preventDefault();
    cube.solve();
  });

  $("#undo").on('click', function(e) {
    e.preventDefault();
    cube.undo();
  });

  $("#reset").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      resetRubiksCube();
    }
  });


  $("#Aa").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      // controls.enabled = true
      cube.move("XLuLddlULddllx")
      let s = cube.speed
      cube.speed = 2
      controls.autoRotate = true
      document.getElementById("algo").innerHTML = "x L2 D2 L' U' L D2 L' U L'";
      setTimeout(() => { cube.speed = s;
        cube.solve();
        // controls.enabled = false;
        controls.autoRotate = false;
        document.getElementById("algo").innerHTML = "";
        controls.reset()}, waitTime);
      }

  });

  $("#Ab").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      // controls.enabled = true
      cube.move("xlUlddLulddllX")
      let s = cube.speed
      cube.speed = 2
      controls.autoRotate = true
      document.getElementById("algo").innerHTML = "x' L2 D2 L U L' D2 L U' L";
      setTimeout(() => { cube.speed = s;
        cube.solve();
        // controls.enabled = false;
        controls.autoRotate = false
        document.getElementById("algo").innerHTML = "";
        controls.reset()}, waitTime);
      }
  });

  $("#Ff").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      // controls.enabled = true
      cube.move("ruRurURUrrfRURurFUR")
      let s = cube.speed
      cube.speed = 2
      controls.autoRotate = true
      document.getElementById("algo").innerHTML = "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R";
      setTimeout(() => { cube.speed = s;
        cube.solve();
        // controls.enabled = false;
        controls.autoRotate = false
        document.getElementById("algo").innerHTML = "";
        controls.reset()}, waitTime);
      }
  });

  $("#Ja").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      // controls.enabled = true
      cube.move("XuuwuWuurFrfrrx")
      let s = cube.speed
      cube.speed = 2
      controls.autoRotate = true
      document.getElementById("algo").innerHTML = "x R2 F R F' R U2 r' U r U2";
      setTimeout(() => { cube.speed = s;
        cube.solve();
        // controls.enabled = false;
        controls.autoRotate = false
        document.getElementById("algo").innerHTML = "";
        controls.reset()}, waitTime);
      }
  });

  $("#Jb").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      // controls.enabled = true
      cube.move("RUrrfRURurFRur")
      let s = cube.speed
      cube.speed = 2
      controls.autoRotate = true
      document.getElementById("algo").innerHTML = "R U R' F' R U R' U' R' F R2 U' R'";
      setTimeout(() => { cube.speed = s;
        cube.solve();
        // controls.enabled = false;
        controls.autoRotate = false
        document.getElementById("algo").innerHTML = "";
        controls.reset()}, waitTime);
      }
  });

  $("#Ra").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      // controls.enabled = true
      cube.move("RuuRDrURdrurURUr")
      let s = cube.speed
      cube.speed = 2
      controls.autoRotate = true
      document.getElementById("algo").innerHTML = "R U' R' U' R U R D R' U' R D' R' U2 R'";
      setTimeout(() => { cube.speed = s;
        cube.solve();
        // controls.enabled = false;
        controls.autoRotate = false
        document.getElementById("algo").innerHTML = "";
        controls.reset()}, waitTime);
      }
  });

  $("#Rb").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      // controls.enabled = true
      cube.move("ruuRuurFRUrurfrr")
      let s = cube.speed
      cube.speed = 2
      controls.autoRotate = true
      document.getElementById("algo").innerHTML = "R2 F R U R U' R' F' R U2 R' U2 R";
      setTimeout(() => { cube.speed = s;
        cube.solve();
        // controls.enabled = false;
        controls.autoRotate = false
        document.getElementById("algo").innerHTML = "";
        controls.reset()}, waitTime);
      }
  });
  $("#T").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      // controls.enabled = true
      cube.move("FRurURUrrfRURur")
      let s = cube.speed
      cube.speed = 2
      controls.autoRotate = true
      document.getElementById("algo").innerHTML = "R U R' U' R' F R2 U' R' U' R U R' F'";
      setTimeout(() => { cube.speed = s;
        cube.solve();
        // controls.enabled = false;
        controls.autoRotate = false
        document.getElementById("algo").innerHTML = "";
        controls.reset()}, waitTime);
      }
  });
  $("#E").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      // controls.enabled = true
      cube.move("xdluLDlULdlULDluL")
      let s = cube.speed
      cube.speed = 2
      controls.autoRotate = true
      document.getElementById("algo").innerHTML = "x' L' U L D' L' U' L D L' U' L D' L' U L D";
      setTimeout(() => { cube.speed = s;
        cube.solve();
        // controls.enabled = false;
        controls.autoRotate = false
        document.getElementById("algo").innerHTML = "";
        controls.reset()}, waitTime);
      }
  });
  $("#Na").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      // controls.enabled = true
      cube.move("RUruuRUrrfRURurFRuruRur")
      let s = cube.speed
      cube.speed = 2
      controls.autoRotate = true
      document.getElementById("algo").innerHTML = "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'";
      setTimeout(() => { cube.speed = s;
        cube.solve();
        // controls.enabled = false;
        controls.autoRotate = false
        document.getElementById("algo").innerHTML = "";
        controls.reset()}, waitTime);
      }
  });
  $("#Nb").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      // controls.enabled = true
      cube.move("rUrFRfRurfUFRUruR")
      let s = cube.speed
      cube.speed = 2
      controls.autoRotate = true
      document.getElementById("algo").innerHTML = "R' U R U' R' F' U' F R U R' F R' F' R U' R";
      setTimeout(() => { cube.speed = s;
        cube.solve();
        // controls.enabled = false;
        controls.autoRotate = false
        document.getElementById("algo").innerHTML = "";
        controls.reset()}, waitTime);
      }
  });
  $("#V").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      // controls.enabled = true
      cube.move("frfRuRUrrFRyURuR")
      let s = cube.speed
      cube.speed = 2
      controls.autoRotate = true
      document.getElementById("algo").innerHTML = "R' U R' U' y R' F' R2 U' R' U R' F R F";
      setTimeout(() => { cube.speed = s;
        cube.solve();
        // controls.enabled = false;
        controls.autoRotate = false
        document.getElementById("algo").innerHTML = "";
        controls.reset()}, waitTime);
      }
  });
  $("#Yy").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      // controls.enabled = true
      cube.move("FrfRURurFRurURUrf")
      let s = cube.speed
      cube.speed = 2
      controls.autoRotate = true
      document.getElementById("algo").innerHTML = "F R U' R' U' R U R' F' R U R' U' R' F R F'";
      setTimeout(() => { cube.speed = s;
        cube.solve();
        // controls.enabled = false;
        controls.autoRotate = false
        document.getElementById("algo").innerHTML = "";
        controls.reset()}, waitTime);
      }
  });
  $("#H").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      // controls.enabled = true
      cube.move("mmummuummumm")
      let s = cube.speed
      cube.speed = 2
      controls.autoRotate = true
      document.getElementById("algo").innerHTML = "M2 U M2 U2 M2 U M2";
      setTimeout(() => { cube.speed = s;
        cube.solve();
        // controls.enabled = false;
        controls.autoRotate = false
        document.getElementById("algo").innerHTML = "";
        controls.reset()}, waitTime);
      }
  });
  $("#Zz").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      // controls.enabled = true
      cube.move("mmuuMummummuM")
      let s = cube.speed
      cube.speed = 2
      controls.autoRotate = true
      document.getElementById("algo").innerHTML = "M' U M2 U M2 U M' U2 M2";
      setTimeout(() => { cube.speed = s;
        cube.solve();
        // controls.enabled = false;
        controls.autoRotate = false
        document.getElementById("algo").innerHTML = "";
        controls.reset()}, waitTime);
      }
  });
  $("#Ga").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      // controls.enabled = true
      cube.move("DruRdUrrUrURuRurr")
      let s = cube.speed
      cube.speed = 2
      controls.autoRotate = true
      document.getElementById("algo").innerHTML = "R2 U R' U R' U' R U' R2 U' D R' U R D'";
      setTimeout(() => { cube.speed = s;
        cube.solve();
        // controls.enabled = false;
        controls.autoRotate = false
        document.getElementById("algo").innerHTML = "";
        controls.reset()}, waitTime);
      }
  });
  $("#Gb").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      // controls.enabled = true
      cube.move("drrUrUruRurrDurUR")
      let s = cube.speed
      cube.speed = 2
      controls.autoRotate = true
      document.getElementById("algo").innerHTML = "R' U' R U D' R2 U R' U R U' R U' R2 D";
      setTimeout(() => { cube.speed = s;
        cube.solve();
        // controls.enabled = false;
        controls.autoRotate = false
        document.getElementById("algo").innerHTML = "";
        controls.reset()}, waitTime);
      }
  });
  $("#Gc").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      // controls.enabled = true
      cube.move("dRUrDurruRurUrUrr")
      let s = cube.speed
      cube.speed = 2
      controls.autoRotate = true
      document.getElementById("algo").innerHTML = "R2 U' R U' R U R' U R2 U D' R U' R' D";
      setTimeout(() => { cube.speed = s;
        cube.solve();
        // controls.enabled = false;
        controls.autoRotate = false
        document.getElementById("algo").innerHTML = "";
        controls.reset()}, waitTime);
      }
  });
  $("#Gd").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      // controls.enabled = true
      cube.move("DrruRuRUrUrrdURur")
      let s = cube.speed
      cube.speed = 2
      controls.autoRotate = true
      document.getElementById("algo").innerHTML = "R U R' U' D R2 U' R U' R' U R' U R2 D'";
      setTimeout(() => { cube.speed = s;
        cube.solve();
        // controls.enabled = false;
        controls.autoRotate = false
        document.getElementById("algo").innerHTML = "";
        controls.reset()}, waitTime);
      }
  });
  $("#Ua").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      // controls.enabled = true
      cube.move("rrURUrururUr")
      let s = cube.speed
      cube.speed = 2
      controls.autoRotate = true
      document.getElementById("algo").innerHTML = "R U' R U R U R U' R' U' R2";
      setTimeout(() => { cube.speed = s;
        cube.solve();
        // controls.enabled = false;
        controls.autoRotate = false
        document.getElementById("algo").innerHTML = "";
        controls.reset()}, waitTime);
      }
  });
  $("#Ub").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      // controls.enabled = true
      cube.move("RuRURURururr")
      let s = cube.speed
      cube.speed = 2
      controls.autoRotate = true
      document.getElementById("algo").innerHTML = "R2 U R U R' U' R' U' R' U R'";
      setTimeout(() => { cube.speed = s;
        cube.solve();
        // controls.enabled = false;
        controls.autoRotate = false
        document.getElementById("algo").innerHTML = "";
        controls.reset()}, waitTime);
      }
  });

  $("#dot").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      // controls.enabled = true
      cube.move("QURurqFURurf")
      let s = cube.speed
      cube.speed = 2
      controls.autoRotate = true
      document.getElementById("algo").innerHTML = "F R U R' U' F' f R U R' U' f'";
      setTimeout(() => { cube.speed = s;
        cube.solve();
        // controls.enabled = false;
        controls.autoRotate = false
        document.getElementById("algo").innerHTML = "";
        controls.reset()}, waitTime);
      }
  });

  $("#line").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      // controls.enabled = true
      cube.move("FURurf")
      let s = cube.speed
      cube.speed = 2
      controls.autoRotate = true
      document.getElementById("algo").innerHTML = "F R U R' U' F'";
      setTimeout(() => { cube.speed = s;
        cube.solve();
        // controls.enabled = false;
        controls.autoRotate = false
        document.getElementById("algo").innerHTML = "";
        controls.reset()}, waitTime);
      }
  });
  $("#lol").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      // controls.enabled = true
      cube.move("QURurq")
      let s = cube.speed
      cube.speed = 2
      controls.autoRotate = true
      document.getElementById("algo").innerHTML = "f R U R' U' f'";
      setTimeout(() => { cube.speed = s;
        cube.solve();
        // controls.enabled = false;
        controls.autoRotate = false
        document.getElementById("algo").innerHTML = "";
        controls.reset()}, waitTime);
      }
  });
  $("#antisune").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      // controls.enabled = true
      cube.move("RUrURuur")
      let s = cube.speed
      cube.speed = 2
      controls.autoRotate = true
      document.getElementById("algo").innerHTML = "R U2 R' U' R U' R'";
      setTimeout(() => { cube.speed = s;
        cube.solve();
        // controls.enabled = false;
        controls.autoRotate = false
        document.getElementById("algo").innerHTML = "";
        controls.reset()}, waitTime);
      }
  });

  $("#cross").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      // controls.enabled = true
      cube.move("RuuruRUruRur")
      let s = cube.speed
      cube.speed = 2
      controls.autoRotate = true
      document.getElementById("algo").innerHTML = "R U R' U R U' R' U R U2 R'";
      setTimeout(() => { cube.speed = s;
        cube.solve();
        // controls.enabled = false;
        controls.autoRotate = false
        document.getElementById("algo").innerHTML = "";
        controls.reset()}, waitTime);
      }
  });
  $("#tie").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      // controls.enabled = true
      cube.move("WUruwFRf")
      let s = cube.speed
      cube.speed = 2
      controls.autoRotate = true
      document.getElementById("algo").innerHTML = "F R' F' r U R U' r'";
      setTimeout(() => { cube.speed = s;
        cube.solve();
        // controls.enabled = false;
        controls.autoRotate = false
        document.getElementById("algo").innerHTML = "";
        controls.reset()}, waitTime);
      }
  });
  $("#pi").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      // controls.enabled = true
      cube.move("ruurrUrrUrruur")
      let s = cube.speed
      cube.speed = 2
      controls.autoRotate = true
      document.getElementById("algo").innerHTML = "R U2 R2 U' R2 U' R2 U2 R";
      setTimeout(() => { cube.speed = s;
        cube.solve();
        // controls.enabled = false;
        controls.autoRotate = false
        document.getElementById("algo").innerHTML = "";
        controls.reset()}, waitTime);
      }
  });
  $("#sune").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      // controls.enabled = true
      cube.move("RuuruRur")
      let s = cube.speed
      cube.speed = 2
      controls.autoRotate = true
      document.getElementById("algo").innerHTML = "R U R' U R U2 R'";
      setTimeout(() => { cube.speed = s;
        cube.solve();
        // controls.enabled = false;
        controls.autoRotate = false
        document.getElementById("algo").innerHTML = "";
        controls.reset()}, waitTime);
      }
  });
  $("#cha").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      // controls.enabled = true
      cube.move("FrfWURuw")
      let s = cube.speed
      cube.speed = 2
      controls.autoRotate = true
      document.getElementById("algo").innerHTML = "r U R' U' r' F R F'";
      setTimeout(() => { cube.speed = s;
        cube.solve();
        // controls.enabled = false;
        controls.autoRotate = false
        document.getElementById("algo").innerHTML = "";
        controls.reset()}, waitTime);
      }
  });
  $("#head").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      // controls.enabled = true
      cube.move("RuuRDruuRdrr")
      let s = cube.speed
      cube.speed = 2
      controls.autoRotate = true
      document.getElementById("algo").innerHTML = "R2 D R' U2 R D' R' U2 R'";
      setTimeout(() => { cube.speed = s;
        cube.solve();
        // controls.enabled = false;
        controls.autoRotate = false
        document.getElementById("algo").innerHTML = "";
        controls.reset()}, waitTime);
      }
  });



  $("#select-size").on('change', function() {
    if (! cube.moving) {
      resetRubiksCube();
    }
  });
  $("#color0").on('change', function() {
    if (! cube.moving) {
        colors[0] = parseInt($("#color0").val(), 16)
        resetRubiksCube()
      }
  });
  $("#color1").on('change', function() {
    if (! cube.moving) {
        colors[1] = parseInt($("#color1").val(), 16)
        cube.updateColors(colors)
      }
  });
  $("#color2").on('change', function() {
    if (! cube.moving) {
        colors[2] = parseInt($("#color2").val(), 16)
        cube.updateColors(colors)
      }
  });
  $("#color3").on('change', function() {
    if (! cube.moving) {
        colors[3] = parseInt($("#color3").val(), 16)
        cube.updateColors(colors)
      }
  });
  $("#color4").on('change', function() {
    if (! cube.moving) {
        colors[4] = parseInt($("#color4").val(), 16)
        cube.updateColors(colors)
      }
  });
  $("#color5").on('change', function() {
    if (! cube.moving) {
        colors[5] = parseInt($("#color5").val(), 16)
        cube.updateColors(colors)
      }
  });

  $("#reset-color").on('click', function() {
    if (! cube.moving) {
      [0xFF5900, 0xB90000, 0xf8f8ff, 0xFFD500, 0x009B48, 0x0045AD]
      document.getElementById("color0").jscolor.fromString('FF5900')
      document.getElementById("color1").jscolor.fromString('B90000')
      document.getElementById("color2").jscolor.fromString('f8f8ff')
      document.getElementById("color3").jscolor.fromString('FFD500')
      document.getElementById("color4").jscolor.fromString('009B48')
      document.getElementById("color5").jscolor.fromString('0045AD')
      colors = OG_COLORS.slice(0)
      cube.updateColors(OG_COLORS)
    }
  });
  $("#tutorial-button").on('click', function(e) {
    e.preventDefault();
    if (pllShow) {
      $("#pll").hide();
      pllShow = !pllShow
    }
    if (controlsShow) {
      $("#controls").hide();
      controlsShow = !controlsShow
    }
    if (ollShow) {
      $("#oll").hide();
      ollShow = !ollShow
    }
    if (colorShow) {
      $("#colorpicker").hide();
      colorShow = !colorShow
    }
    if (exShow) {
      $("#ex").hide();
    } else {
      $("#ex").show();
      if (!cube.moving) {
        cube.move("fllbbUFruubbDRbbllddrrbUldfUbbRuuFR")
      }
    }
    exShow = !exShow

  })

  $("#color-button").on('click', function(e) {
    e.preventDefault();
    if (pllShow) {
      $("#pll").hide();
      pllShow = !pllShow
    }
    if (exShow) {
      $("#ex").hide();
      exShow = !exShow
    }
    if (controlsShow) {
      $("#controls").hide();
      controlsShow = !controlsShow
    }
    if (ollShow) {
      $("#oll").hide();
      ollShow = !ollShow
    }
    if (colorShow) {
      $("#colorpicker").hide();
    } else {
      $("#colorpicker").show();
    }
    colorShow = !colorShow
  });

  $("#pll-button").on('click', function(e) {
    e.preventDefault();
    if (colorShow) {
      $("#colorpicker").hide();
      colorShow = !colorShow
    }
    if (exShow) {
      $("#ex").hide();
      exShow = !exShow
    }
    if (controlsShow) {
      $("#controls").hide();
      controlsShow = !controlsShow
    }
    if (ollShow) {
      $("#oll").hide();
      ollShow = !ollShow
    }
    if (pllShow) {
      $("#pll").hide();
    } else {
      $("#pll").show();
    }
    pllShow = !pllShow
  });

  $("#controls-button").on('click', function(e) {
    e.preventDefault();
    if (colorShow) {
      $("#colorpicker").hide();
      colorShow = !colorShow
    }
    if (exShow) {
      $("#ex").hide();
      exShow = !exShow
    }
    if (pllShow) {
      $("#pll").hide();
      pllShow = !pllShow
    }
    if (ollShow) {
      $("#oll").hide();
      ollShow = !ollShow
    }
    if (controlsShow) {
      $("#controls").hide();
    } else {
      $("#controls").show();
    }
    controlsShow = !controlsShow
  });

  $("#oll-button").on('click', function(e) {
    e.preventDefault();
    if (colorShow) {
      $("#colorpicker").hide();
      colorShow = !colorShow
    }
    if (exShow) {
      $("#ex").hide();
      exShow = !exShow
    }
    if (pllShow) {
      $("#pll").hide();
      pllShow = !pllShow
    }
    if (controlsShow) {
      $("#controls").hide();
      controlsShow = !controlsShow
    }
    if (ollShow) {
      $("#oll").hide();
    } else {
      $("#oll").show();
    }
    ollShow = !ollShow
  });


  $("#u").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      cube.move("U")
    }
  })
  $("#r").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      cube.move("R")
    }
  })
  $("#l").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      cube.move("L")
    }
  })
  $("#d").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      cube.move("D")
    }
  })
  $("#f").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      cube.move("F")
    }
  })
  $("#b").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      cube.move("B")
    }
  })
  $("#x").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      cube.move("X")
    }
  })
  $("#y").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      cube.move("Y")
    }
  })
  $("#z").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      cube.move("Z")
    }
  })
  $("#m").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      cube.move("M")
    }
  })



  $("#wc").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      cube.move('uurUFddrfURur')
    }
  })

  $("#wc").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      cube.move('uurUFddrfURur')
    }
  })
  $("#f2l").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      cube.move('uuRurluuLUruRFuufubuBFuufuuluL')
    }
  })
  $("#to").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      cube.move('UQRUruqurrDruuRdruur')
    }
  })

  $("#tp").on('click', function(e) {
    e.preventDefault();
    if (!cube.moving) {
      cube.move('uruRUdrrUrURuRurrDUU')
      cube.movesToSolve = []
    }
  })

  document.body.addEventListener("mousedown", function(event) {
    startx = event.clientX
    starty = event.clientY
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( scene.children );
    intersect = intersects[0];
    if (intersects[0] !== undefined) {
      let object = intersects[0].object
      let normal = intersect.face.normal;
      //console.log(intersects[0].object.matrixWorld)
      console.log(new THREE.Matrix4().extractRotation(object.matrixWorld).multiplyVector3( normal.clone() ))
      //console.log(intersects[0])
      //console.log(intersects[0].object.position)
    }
  }, false);
  document.body.addEventListener("mouseup", function(event) {
    endx = event.clientX;
    endy = event.clientY;
    if (intersect !== undefined) {
      let norm = intersect.face.normal;
      let pos = intersect.object.position
      let objectM = intersect.object.matrixWorld
      let normal = new THREE.Matrix4().extractRotation(objectM).multiplyVector3(norm.clone())
      let o = cube.outLayer
      // M with blue
      if (equal(normal.x, 0) && equal(normal.y, 0) && equal(normal.z, 1) && equal(pos.x, 0) && equal(pos.z, o)) {
        if (Math.abs(endy - starty) > 50 && endy < starty) {
          cube.move("m")
        }
        if (Math.abs(endy - starty) > 50 && endy > starty) {
          cube.move("M")
        }
      }
      // R with yellow
      if (equal(normal.x, 0) && equal(normal.y, 1) && equal(normal.z, 0) && equal(pos.y, o) && equal(pos.x, 0)) {
        if (Math.abs(endx - startx) > 10 && endx > startx && Math.abs(endy - starty) > 15 && endy < starty) {
          cube.move("m")

        }
        if (Math.abs(endx - startx) > 10 && endx < startx && Math.abs(endy - starty) > 15 && endy > starty) {
          cube.move("M")
        }
      }

      // R with blue
      if (equal(normal.x, 0) && equal(normal.y, 0) && equal(normal.z, 1) && equal(pos.x, o) && equal(pos.z, o)) {
        if (Math.abs(endy - starty) > 50 && endy < starty) {
          cube.move("R")
        }
        if (Math.abs(endy - starty) > 50 && endy > starty) {
          cube.move("r")
        }
      }
      // L with blue
      if (equal(normal.x, 0) && equal(normal.y, 0) && equal(normal.z, 1) && equal(pos.x, -o) && equal(pos.z, o)) {
        if (Math.abs(endy - starty) > 50 && endy < starty) {
          cube.move("l")
        }
        if (Math.abs(endy - starty) > 50 && endy > starty) {
          cube.move("L")
        }
      }
      // U with blue
      if (equal(normal.x, 0) && equal(normal.y, 0) && equal(normal.z, 1) && equal(pos.y, o) && equal(pos.z, o)) {
        if (Math.abs(endx - startx) > 50 && endx < startx) {
          cube.move("U")
        }
        if (Math.abs(endx - startx) > 50 && endx > startx) {
          cube.move("u")
        }
      }
      // D with blue
      if (equal(normal.x, 0) && equal(normal.y, 0) && equal(normal.z, 1) && equal(pos.y, -o) && equal(pos.z, o)) {
        if (Math.abs(endx - startx) > 50 && endx < startx) {
          cube.move("d")
        }
        if (Math.abs(endx - startx) > 50 && endx > startx) {
          cube.move("D")
        }
      }
      // F with red
      if (equal(normal.x, 1) && equal(normal.y, 0) && equal(normal.z, 0) && equal(pos.x, o) && equal(pos.z, o)) {
        if (Math.abs(endy - starty) > 50 && endy < starty) {
          cube.move("f")
        }
        if (Math.abs(endy - starty) > 50 && endy > starty) {
          cube.move("F")
        }
      }

      // B with red
      if (equal(normal.x, 1) && equal(normal.y, 0) && equal(normal.z, 0) && equal(pos.x, o) && equal(pos.z, -o)) {
        if (Math.abs(endy - starty) > 50 && endy < starty) {
          cube.move("B")
        }
        if (Math.abs(endy - starty) > 50 && endy > starty) {
          cube.move("b")
        }
      }
      // U with red
      if (equal(normal.x, 1) && equal(normal.y, 0) && equal(normal.z, 0) && equal(pos.y, o) && equal(pos.x, o)) {
        if (Math.abs(endx - startx) > 30 && endx < startx) {
          cube.move("U")
        }
        if (Math.abs(endx - startx) > 30 && endx > startx) {
          cube.move("u")
        }
      }
      // D with red
      if (equal(normal.x, 1) && equal(normal.y, 0) && equal(normal.z, 0) && equal(pos.y, -o) && equal(pos.x, o)) {
        if (Math.abs(endx - startx) > 30 && endx < startx) {
          cube.move("d")
        }
        if (Math.abs(endx - startx) > 30 && endx > startx) {
          cube.move("D")
        }
      }
      // R with yellow
      if (equal(normal.x, 0) && equal(normal.y, 1) && equal(normal.z, 0) && equal(pos.y, o) && equal(pos.x, o)) {
        if (Math.abs(endx - startx) > 10 && endx > startx && Math.abs(endy - starty) > 15 && endy < starty) {
          cube.move("R")

        }
        if (Math.abs(endx - startx) > 10 && endx < startx && Math.abs(endy - starty) > 15 && endy > starty) {
          cube.move("r")
        }
      }

      // L with yellow
      if (equal(normal.x, 0) && equal(normal.y, 1) && equal(normal.z, 0) && equal(pos.y, o) && equal(pos.x, -o)) {
        if (Math.abs(endx - startx) > 10 && endx > startx && Math.abs(endy - starty) > 15 && endy < starty) {
          cube.move("l")

        }
        if (Math.abs(endx - startx) > 10 && endx < startx && Math.abs(endy - starty) > 15 && endy > starty) {
          cube.move("L")
        }
      }

      // F with yellow
      if (equal(normal.x, 0) && equal(normal.y, 1) && equal(normal.z, 0) && equal(pos.y, o) && equal(pos.z, o)) {
        if (Math.abs(endx - startx) > 15 && endx > startx && Math.abs(endy - starty) > 10 && endy > starty) {
          cube.move("F")

        }
        if (Math.abs(endx - startx) > 15 && endx < startx && Math.abs(endy - starty) > 10 && endy < starty) {
          cube.move("f")
        }
      }

      // B with yellow
      if (equal(normal.x, 0) && equal(normal.y, 1) && equal(normal.z, 0) && equal(pos.y, o) && equal(pos.z, -o)) {
        if (Math.abs(endx - startx) > 15 && endx > startx && Math.abs(endy - starty) > 10 && endy > starty) {
          cube.move("b")

        }
        if (Math.abs(endx - startx) > 15 && endx < startx && Math.abs(endy - starty) > 10 && endy < starty) {
          cube.move("B")
        }
      }
      // 4x4
      if (equal(normal.x, 0) && equal(normal.y, 0) && equal(normal.z, 1) && equal(pos.x, 1/6) && equal(pos.z, o)) {
        if (Math.abs(endy - starty) > 50 && endy < starty) {
          cube.move("P")
        }
        if (Math.abs(endy - starty) > 50 && endy > starty) {
          cube.move("p")
        }
      }
      // 4x4
      if (equal(normal.x, 0) && equal(normal.y, 0) && equal(normal.z, 1) && equal(pos.x, -1/6) && equal(pos.z, o)) {
        if (Math.abs(endy - starty) > 50 && endy < starty) {
          cube.move("O")
        }
        if (Math.abs(endy - starty) > 50 && endy > starty) {
          cube.move("o")
        }
      }
      // 4x4
      if (equal(normal.x, 0) && equal(normal.y, 1) && equal(normal.z, 0) && equal(pos.y, o) && equal(pos.x, -1/6)) {
        if (Math.abs(endx - startx) > 10 && endx > startx && Math.abs(endy - starty) > 15 && endy < starty) {
          cube.move("O")

        }
        if (Math.abs(endx - startx) > 10 && endx < startx && Math.abs(endy - starty) > 15 && endy > starty) {
          cube.move("o")
        }
      }
      // 4x4
      if (equal(normal.x, 0) && equal(normal.y, 1) && equal(normal.z, 0) && equal(pos.y, o) && equal(pos.x, 1/6)) {
        if (Math.abs(endx - startx) > 10 && endx > startx && Math.abs(endy - starty) > 15 && endy < starty) {
          cube.move("P")

        }
        if (Math.abs(endx - startx) > 10 && endx < startx && Math.abs(endy - starty) > 15 && endy > starty) {
          cube.move("p")
        }
      }


      // 5x5
      if (equal(normal.x, 0) && equal(normal.y, 1) && equal(normal.z, 0) && equal(pos.y, o) && equal(pos.x, 1/3)) {
        if (Math.abs(endx - startx) > 10 && endx > startx && Math.abs(endy - starty) > 15 && endy < starty) {
          cube.move("T")

        }
        if (Math.abs(endx - startx) > 10 && endx < startx && Math.abs(endy - starty) > 15 && endy > starty) {
          cube.move("t")
        }
      }
      // 5x5
      if (equal(normal.x, 0) && equal(normal.y, 1) && equal(normal.z, 0) && equal(pos.y, o) && equal(pos.x, -1/3)) {
        if (Math.abs(endx - startx) > 10 && endx > startx && Math.abs(endy - starty) > 15 && endy < starty) {
          cube.move("C")

        }
        if (Math.abs(endx - startx) > 10 && endx < startx && Math.abs(endy - starty) > 15 && endy > starty) {
          cube.move("c")
        }
      }
      // 5x5
      if (equal(normal.x, 0) && equal(normal.y, 0) && equal(normal.z, 1) && equal(pos.x, 1/3) && equal(pos.z, o)) {
        if (Math.abs(endy - starty) > 50 && endy < starty) {
          cube.move("T")
        }
        if (Math.abs(endy - starty) > 50 && endy > starty) {
          cube.move("t")
        }
      }
      // 5x5
      if (equal(normal.x, 0) && equal(normal.y, 0) && equal(normal.z, 1) && equal(pos.x, -1/3) && equal(pos.z, o)) {
        if (Math.abs(endy - starty) > 50 && endy < starty) {
          cube.move("C")
        }
        if (Math.abs(endy - starty) > 50 && endy > starty) {
          cube.move("c")
        }
      }


    } else {
      if (Math.abs(endx - startx) > 50 && endx < startx && Math.abs(endy - starty) > 50 && endy > starty) {
        cube.move("x")
      }
      if (Math.abs(endx - startx) > 50 && endx > startx && Math.abs(endy - starty) > 50 && endy < starty) {
        cube.move("X")
      }

      if (Math.abs(endx - startx) > 50 && endx < startx && Math.abs(endy - starty) > 50 && endy < starty) {
        cube.move("z")
      }
      if (Math.abs(endx - startx) > 50 && endx > startx && Math.abs(endy - starty) > 50 && endy > starty) {
        cube.move("Z")
      }
      if (Math.abs(endx - startx) > 50 && endx > startx && Math.abs(endy - starty) < 25) {
        cube.move("y")
      }
      if (Math.abs(endx - startx) > 50 && endx < startx && Math.abs(endy - starty) > 25) {
        cube.move("Y")
      }
    }


  }, false);
}

function addRubiksCube(size, speed, colors) {
  cube = new Cube(size, speed, colors);
  let cubes = cube.cubes;
  for (let i = 0; i < cubes.length; i++) {
    scene.add(cubes[i]);
  }
}

function removeRubiksCube() {
  let cubes = cube.cubes;
  for (let i = 0; i < cubes.length; i++) {
    scene.remove(cubes[i]);
  }
}

function resetRubiksCube() {
  var size = cube.size;
  var speed = cube.speed;
  removeRubiksCube();
  addRubiksCube(size, speed, colors);
}

function onKeyDown(event) {
  var key = event.key;
  if (key.length == 1){
    cube.move(event.key);
    console.log(event.key)
  }

};

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  render();
  controls.update();
}

function render() {
  camera.lookAt(scene.position);

  if (cube.moving) {
    cube.rotate();
  }

  renderer.render(scene, camera);
}
