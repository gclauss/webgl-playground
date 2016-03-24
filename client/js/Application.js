var playgound = {};
playgound.Application = function() {
    
    function getShader(gl, id) {
    var shaderScript, theSource, currentChild, shader;
    
    shaderScript = document.getElementById(id);
    
    if (!shaderScript) {
        return null;
    }
    
    theSource = "";
    currentChild = shaderScript.firstChild;
    
    while(currentChild) {
        if (currentChild.nodeType == currentChild.TEXT_NODE) {
            theSource += currentChild.textContent;
        }
        
        currentChild = currentChild.nextSibling;
    }
    
    if (shaderScript.type == "x-shader/x-fragment") {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (shaderScript.type == "x-shader/x-vertex") {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else {
     // type de shader inconnu
     return null;
  }
  gl.shaderSource(shader, theSource);
    
  // Compile le programme shader
  gl.compileShader(shader);  
    
  // Vérifie si la compilation s'est bien déroulée
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {  
      alert("Une erreur est survenue au cours de la compilation des shaders: " + gl.getShaderInfoLog(shader));
      return null;  
  }
    
  return shader;
}
    
    function initShaders(gl) {
        var fragmentShader = getShader(gl, "shader-fs");
        var vertexShader = getShader(gl, "shader-vs");
  
          // Créer le programme shader
  
          var shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
  
        // Faire une alerte si le chargement du shader échoue
  
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert("Impossible d'initialiser le shader.");
        }
  
        gl.useProgram(shaderProgram);
  
        var vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(vertexPositionAttribute);
}
    
    var self = {};
    
    self.start = function() {
        var canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl"); 
        gl.clearColor(0.0, 0.0, 0.0, 1.0);                      // Met la couleur d'effacement au noir et complétement opaque
        gl.enable(gl.DEPTH_TEST);                               // Active le test de profondeur
        gl.depthFunc(gl.LEQUAL);                                // Les objets proches cachent les objets lointains
        gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);      // Efface les couleurs et le buffer de profondeur.
        initShaders(gl);
    }
    
    return self;
}