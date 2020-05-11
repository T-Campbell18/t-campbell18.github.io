var pivot = new THREE.Object3D();

function equal(a, b) {
  return Math.abs(a - b) <= 0.001;
}

function Move(layer, direction, axis) {
  this.layer = layer;
  this.direction = direction;
  this.axis = axis;
}

function Cube(size, speed, colors) {
  this.cubes = [];
  this.moves = [];
  this.currentMove = {};
  this.cubesToRotate = [];
  this.moving = false;
  this.outLayer = 1/3
  this.isSolving = false;
  this.speed = speed;
  this.size = size
  this.movesToSolve = []
  this.stickers = []
  this.colors = colors

  const f = this.size % 2 !== 0
			? 0 - Math.floor(this.size / 2)
			: 0.5 - this.size / 2;

  if (this.size == 2) {
    this.outLayer = 1/6
  } else if (this.size == 4) {
    this.outLayer = 1/2
  } else if (this.size == 5) {
    this.outLayer = 2/3
  }
  let m = this.size - 1;

  for (let i = 0; i < this.size; i++) {
    for (let j = 0; j < this.size; j++) {
      for (let k = 0; k < this.size; k++) {
        var x = f + i;
        var y = f + j;
        var z = f + k;
        let edges = [];

		  	if ( i == 0 ) edges.push(0);
		  	if ( i == m ) edges.push(1);
		  	if ( j == 0 ) edges.push(2);
		  	if ( j == m ) edges.push(3);
		  	if ( k == 0 ) edges.push(4);
		  	if ( k == m ) edges.push(5);
        this.createCube(x, y, z, edges);
      }
    }
  }
}


Cube.prototype.createCube = function(x, y, z, edges) {
  let roundGeometry = new RoundedBoxGeometry( 1/3, .15, 3 );
  roundGeometry.computeFaceNormals()
  cube = new THREE.Mesh(roundGeometry,
    new THREE.MeshPhongMaterial({
      color : 0x000000,
      shininess: 75
  }))

  const stickerGeometry = RoundedPlaneGeometry(
  			1/3,
  			.15,
  			.01
  		);

  for (let i = 0; i < edges.length; i++) {
    const distance = (1/3) / 2;
    let c = this.colors[edges[i]]
    let sticker = new THREE.Mesh(stickerGeometry, new THREE.MeshPhongMaterial({
      color : c,
      shininess: 65,
      specular: c
    }))
    sticker.userData = edges[i]
		sticker.position.set(
		    distance * [ - 1, 1, 0, 0, 0, 0 ][ edges[i] ],
				distance * [ 0, 0, - 1, 1, 0, 0 ][ edges[i]],
				distance * [ 0, 0, 0, 0, - 1, 1 ][ edges[i] ]
		);

    sticker.rotation.set(
		    Math.PI / 2 * [ 0, 0, 1, - 1, 0, 0 ][ edges[i] ],
				Math.PI / 2 * [ - 1, 1, 0, 0, 2, 0 ][ edges[i] ],
			  0
		);
		sticker.scale.set(
				.82,
				.82,
				.82
			);
    cube.add(sticker)
    this.stickers.push(sticker)
  }

  cube.position.set(x, y, z);
  cube.position.divideScalar(3)
  this.cubes.push(cube);
}


Cube.prototype.rotate = function() {
  var direction = this.currentMove.direction;
  var axis = this.currentMove.axis;

  if (pivot.rotation[axis] >= Math.PI / 2) {
    pivot.rotation[axis] = Math.PI / 2;
    this.afterMove();
  } else if (pivot.rotation[axis] <= -Math.PI / 2) {
    pivot.rotation[axis] = -Math.PI / 2;
    this.afterMove();
  } else {
    pivot.rotation[axis] += direction * -this.speed;
  }
}


Cube.prototype.afterMove = function() {
  pivot.updateMatrixWorld();
  scene.remove(pivot);
  for (let i = 0; i < this.cubesToRotate.length; i++) {
    var cube = this.cubesToRotate[i];
    cube.updateMatrixWorld();
    scene.attach(cube, pivot, scene);
    //cube.geometry.computeFaceNormals()
  }

  this.moving = false;
  this.currentMove = {};
  this.cubesToRotate = [];
  if (this.movesToSolve.length === 0) this.isSolving = false;
  this.setUpRotate();
}

Cube.prototype.setUpRotate = function() {
  if (this.moves.length > 0) {
    this.currentMove = this.moves.shift();
    this.moving = true;

    let face = -this.outLayer;

    if (this.currentMove.layer == this.size - 1) {
      face = face * -1
    }
    if (this.currentMove.layer == -2) {
      face = 0
    }
    if (this.currentMove.layer == -3) {
      face = 0
    }
    if (this.currentMove.layer == -4) {
      face = 1/6
    }
    if (this.currentMove.layer == -5) {
      face = -1/6
    }
    if (this.currentMove.layer == -6) {
      face = 1/3
    }
    if (this.currentMove.layer == -7) {
      face = -1/3
    }

    for (let i = 0; i < this.cubes.length; i++) {
      if (equal(this.cubes[i].position[this.currentMove.axis], face)) {
        this.cubesToRotate.push(this.cubes[i]);
      }
    }

    if (this.currentMove.layer == -3) {
      face = 1/3
      for (let i = 0; i < this.cubes.length; i++) {
        if (equal(this.cubes[i].position[this.currentMove.axis], face)) {
          this.cubesToRotate.push(this.cubes[i]);
        }
      }
    }

    if (this.currentMove.layer == -1) {
      this.cubesToRotate = this.cubes
    }

    pivot.rotation.set(0, 0, 0);
    pivot.updateMatrixWorld();
    scene.add(pivot);

    for (let i = 0; i < this.cubesToRotate.length; i++) {
      pivot.attach(this.cubesToRotate[i], scene, pivot)
    }
  }
}

Cube.prototype.updateColors = function(colors) {
  this.colors = colors
  for (let i = 0; i < this.stickers.length; i++) {
    let s = this.stickers[i]
    this.stickers[i].material.color.setHex(this.colors[this.stickers[i].userData])
  }
}

Cube.prototype.scramble = function() {
  let scramble = []
  let moves = "fFrRbBlLuUdD"
  if (this.size % 2 == 0) {
    moves += "opOP"
  } else {
    moves += "Mm"
  }
  if (this.size == 5) {
    moves += "TCtc"
  }
  scramble.push(moves.charAt(Math.floor(Math.random() * 12)))
  let n = this.size > 3 ? 35 : 20
  n += this.size == 5 ? 10 : 0
  for (let i = 0; i < n; i++) {
    let z = Math.floor(Math.random() * moves.length)
    let rt = z + 1;
    let lt = z - 1;
    let add = true
    for (let j = z - 1; j <= z + 1; j++) {
      if (j < 0 || j >= moves.length) {
        continue
      }
      if (moves.charAt(j) == scramble[scramble.length - 1]) {
        add = false
      }
    }
    if (add) {
      scramble.push(moves.charAt(z))
    } else {
      i--
    }
  }
  this.move(scramble)
}

Cube.prototype.undo = function() {
  if (!this.moving) {
    this.move(this.movesToSolve[0])
  }
}

Cube.prototype.solve = function() {
  this.reduce()
  if (this.movesToSolve.length == 0) {
    console.log('already solved')
    return
  }
  this.isSolving = true;
  this.move(this.movesToSolve)
  this.movesToSolve = []
}

Cube.prototype.reduce = function() {
  let m = this.movesToSolve
  let i = m.length - 1
  while (i >= 3) {
    if (m[i] === m[i-1] && m[i-2] === m[i-3] && m[i] === m[i-3]) {
      m.splice(i, 1)
      m.splice(i-1, 1)
      m.splice(i-2, 1)
      m.splice(i-3, 1)
      i = i - 4
    } else {
      i--
    }
  }
}


Cube.prototype.move = function(moves) {
  if (this.moving) {
    return;
  }
  let m = this.size - 1;
  let middle = -2

  for (let move of moves) {
    if (move === 'F') {
      this.moves.push(new Move(m, 1, 'z'));
      if (!this.isSolving) {
        if (this.movesToSolve[0] === 'F') {this.movesToSolve.shift(); continue}
        this.movesToSolve.unshift('f')
      }
    }
    else if (move === 'f') {
      this.moves.push(new Move(m, -1, 'z'))
      if (!this.isSolving) {
        if (this.movesToSolve[0] === 'f') {this.movesToSolve.shift(); continue}
        this.movesToSolve.unshift('F')
      }
    }
    else if (move === 'B') {
      this.moves.push(new Move(0, -1, 'z'))
      if (!this.isSolving) {
        if (this.movesToSolve[0] === 'B') {this.movesToSolve.shift(); continue}
        this.movesToSolve.unshift('b')
      }
    }
    else if (move === 'b') {
      this.moves.push(new Move(0, 1, 'z'))
      if (!this.isSolving) {
        if (this.movesToSolve[0] === 'b') {this.movesToSolve.shift(); continue}
        this.movesToSolve.unshift('B')
      }
    }
    else if (move === 'L') {
      this.moves.push(new Move(0, -1, 'x'));
      if (!this.isSolving) {
        if (this.movesToSolve[0] === 'L') {this.movesToSolve.shift(); continue}
        this.movesToSolve.unshift('l')
      }
    }
    else if (move === 'l') {
      this.moves.push(new Move(0, 1, 'x'));
      if (!this.isSolving) {
        if (this.movesToSolve[0] === 'l') {this.movesToSolve.shift(); continue}
        this.movesToSolve.unshift('L')
      }
    }
    else if (move === 'M') {
      this.moves.push(new Move(middle, -1, 'x'));
      if (!this.isSolving) {
        if (this.movesToSolve[0] === 'M') {this.movesToSolve.shift(); continue}
        this.movesToSolve.unshift('m')
      }
    }
    else if (move === 'm') {
      this.moves.push(new Move(middle, 1, 'x'));
      if (!this.isSolving) {
        if (this.movesToSolve[0] === 'm') {this.movesToSolve.shift(); continue}
        this.movesToSolve.unshift('M')
      }
    }
    else if (move === 'R') {
      this.moves.push(new Move(m, 1, 'x'));
      if (!this.isSolving) {
        if (this.movesToSolve[0] === 'R') {this.movesToSolve.shift(); continue}
        this.movesToSolve.unshift('r')
      }
    }
    else if (move === 'r') {
      this.moves.push(new Move(m, -1, 'x'));
      if (!this.isSolving) {
        if (this.movesToSolve[0] === 'r') {this.movesToSolve.shift(); continue}
        this.movesToSolve.unshift('R')
      }
    }
    else if (move === 'U') {
      this.moves.push(new Move(m, 1, 'y'));
      if (!this.isSolving) {
        if (this.movesToSolve[0] === 'U') {this.movesToSolve.shift(); continue}
        this.movesToSolve.unshift('u')
      }
    }
    else if (move === 'u') {
      this.moves.push(new Move(m, -1, 'y'));
      if (!this.isSolving) {
        if (this.movesToSolve[0] === 'u') {this.movesToSolve.shift(); continue}
        this.movesToSolve.unshift('U')
      }
    }
    else if (move === 'D') {
      this.moves.push(new Move(0, -1, 'y'));
      if (!this.isSolving) {
        if (this.movesToSolve[0] === 'D') {this.movesToSolve.shift(); continue}
        this.movesToSolve.unshift('d')
      }
    }
    else if (move === 'd') {
      this.moves.push(new Move(0, 1, 'y'));
      if (!this.isSolving) {
        if (this.movesToSolve[0] === 'd') {this.movesToSolve.shift(); continue}
        this.movesToSolve.unshift('D')
      }
    }
    else if (move === 'x') {
      this.moves.push(new Move(-1, -1, 'x'));
      if (!this.isSolving) {
        if (this.movesToSolve[0] === 'x') {this.movesToSolve.shift(); continue}
        this.movesToSolve.unshift('X')
      }
    }
    else if (move === 'X') {
      this.moves.push(new Move(-1, 1, 'x'));
      if (!this.isSolving) {
        if (this.movesToSolve[0] === 'X') {this.movesToSolve.shift(); continue}
        this.movesToSolve.unshift('x')
      }
    }
    else if (move === 'Y') {
      this.moves.push(new Move(-1, 1, 'y'));
      if (!this.isSolving) {
        if (this.movesToSolve[0] === 'Y') {this.movesToSolve.shift(); continue}
        this.movesToSolve.unshift('y')
      }
    }
    else if (move === 'y') {
      this.moves.push(new Move(-1, -1, 'y'));
      if (!this.isSolving) {
        if (this.movesToSolve[0] === 'y') {this.movesToSolve.shift(); continue}
        this.movesToSolve.unshift('Y')
      }
    } else if (move === 'Z') {
      this.moves.push(new Move(-1, 1, 'z'));
      if (!this.isSolving) {
        if (this.movesToSolve[0] === 'Z') {this.movesToSolve.shift(); continue}
        this.movesToSolve.unshift('z')
      }
    }
    else if (move === 'z') {
      this.moves.push(new Move(-1, -1, 'z'))
      if (!this.isSolving) {
        if (this.movesToSolve[0] === 'z') {this.movesToSolve.shift(); continue}
        this.movesToSolve.unshift('Z')
      }
    }
    // Special moves for OLL
    else if (move === 'W' && this.size == 3) {
      this.moves.push(new Move(-3, 1, 'x'));
      if (!this.isSolving) {
        if (this.movesToSolve[0] === 'W') {this.movesToSolve.shift(); continue}
        this.movesToSolve.unshift('w')
      }
    }
    else if (move === 'w' && this.size == 3) {
      this.moves.push(new Move(-3, -1, 'x'));
      if (!this.isSolving) {
        if (this.movesToSolve[0] === 'w') {this.movesToSolve.shift(); continue}
        this.movesToSolve.unshift('W')
      }
    }
    if (move === 'Q' && this.size == 3) {
      this.moves.push(new Move(-3, 1, 'z'));
      if (!this.isSolving) {
        if (this.movesToSolve[0] === 'Q') {this.movesToSolve.shift(); continue}
        this.movesToSolve.unshift('q')
      }
    }
    else if (move === 'q' && this.size == 3) {
      this.moves.push(new Move(-3, -1, 'z'))
      if (!this.isSolving) {
        if (this.movesToSolve[0] === 'q') {this.movesToSolve.shift(); continue}
        this.movesToSolve.unshift('Q')
      }
    }
    else if (move === 'p' && this.size == 4) {
      this.moves.push(new Move(-4, -1, 'x'))
      if (!this.isSolving) {
        if (this.movesToSolve[0] === 'p') {this.movesToSolve.shift(); continue}
        this.movesToSolve.unshift('P')
      }
    }
    // extra 4x4 moves for middle
    else if (move === 'P' && this.size == 4) {
      this.moves.push(new Move(-4, 1, 'x'))
      if (!this.isSolving) {
        if (this.movesToSolve[0] === 'P') {this.movesToSolve.shift(); continue}
        this.movesToSolve.unshift('p')
      }
    }
    else if (move === 'o' && this.size == 4) {
      this.moves.push(new Move(-5, -1, 'x'))
      if (!this.isSolving) {
        if (this.movesToSolve[0] === 'o') {this.movesToSolve.shift(); continue}
        this.movesToSolve.unshift('O')
      }
    }
    else if (move === 'O' && this.size == 4) {
      this.moves.push(new Move(-5, 1, 'x'))
      if (!this.isSolving) {
        if (this.movesToSolve[0] === 'O') {this.movesToSolve.shift(); continue}
        this.movesToSolve.unshift('o')
      }
    }
    // extra 5x5 moves for middle layers
    else if (move === 'T' && this.size == 5) {
      this.moves.push(new Move(-6, 1, 'x'))
      if (!this.isSolving) {
        if (this.movesToSolve[0] === 'T') {this.movesToSolve.shift(); continue}
        this.movesToSolve.unshift('t')
      }
    }
    else if (move === 't' && this.size == 5) {
      this.moves.push(new Move(-6, -1, 'x'))
      if (!this.isSolving) {
        if (this.movesToSolve[0] === 't') {this.movesToSolve.shift(); continue}
        this.movesToSolve.unshift('T')
      }
    }
    else if (move === 'C' && this.size == 5) {
      this.moves.push(new Move(-7, 1, 'x'))
      if (!this.isSolving) {
        if (this.movesToSolve[0] === 'C') {this.movesToSolve.shift(); continue}
        this.movesToSolve.unshift('c')
      }
    }
    else if (move === 'c' && this.size == 5) {
      this.moves.push(new Move(-7, -1, 'x'))
      if (!this.isSolving) {
        if (this.movesToSolve[0] === 'c') {this.movesToSolve.shift(); continue}
        this.movesToSolve.unshift('C')
      }
    }
  }
  this.setUpRotate();
}
