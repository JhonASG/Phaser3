"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _configDrawObjs = require("./config/configDrawObjs.js");
var _drawObjs = require("./drawer/drawObjs.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
// Variables y funciones comunes a todas nuestras class
var level = 3;

// Las clases del video juego
// Especificación de la referencia para dirigir al usuario a x scene
// Método preload cargar assets del juego se ejecuta en primer lugar y una sola vez
// Método create la lógica del juego, pero solo una vez
// Método Update actualización de acciones en el juego que se ejecutan una y otra vez
var MainScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(MainScene, _Phaser$Scene);
  var _super = _createSuper(MainScene);
  function MainScene() {
    _classCallCheck(this, MainScene);
    return _super.call(this, "gameScene");
  }
  _createClass(MainScene, [{
    key: "preload",
    value: function preload() {
      //Ruta donde se encuentra nuestro juego javascript
      this.load.baseURL = "./";

      //Precargar una imagen en Phaser 3. ("Nombre del asset como referencia", "URL de la img")
      this.load.image("jungle", '../img/background.png');
      this.load.image("platform", '../img/platform1.png');
      this.load.image("ground", "../img/platform4.png");
      this.load.image("star", "../img/star.png");
      this.load.image("bomb", "../img/bomb.png");
      this.load.image("controlsPlayer1", "../img/Player1.png");
      this.load.image("controlsPlayer2", "../img/Player2.png");

      //Precargar los sprites en Phaser 3.
      //Parametros
      //1) Nombre del asset para acceder a el luego
      //2) Nombre de la ruta en la que se encuentra el asset
      //3) Tamaño de recorte del sprite para acceder a cada imagen en el sprite
      this.load.spritesheet("dude", "../img/dude.png", {
        frameWidth: 32,
        frameHeight: 48
      });
      this.load.spritesheet("secondPlayer", "../img/secondPlayer.png", {
        frameWidth: 32,
        frameHeight: 48
      });
    }
  }, {
    key: "create",
    value: function create() {
      //Creamos el fondo del juego
      //Parametros
      // Width, Height, Nombre del asset de la imagen
      this.add.image(400, 300, "jungle").setScale(2);

      //Creamos la plataforma en el juego
      //Variable para agregar las físicas a todas las plataformas
      var platforms = this.physics.add.staticGroup();

      //Creamos en el mapa las plataformas (Ground)
      //posX, posY, assets a dibujar
      var ground = new _drawObjs.drawingObjs(_configDrawObjs.drawPlatforms, platforms, 0);
      var platformGame = new _drawObjs.drawingObjs(_configDrawObjs.drawPlatforms, platforms, level);
      ground.platforms();
      platformGame.platforms();
    }
  }, {
    key: "update",
    value: function update() {}
  }]);
  return MainScene;
}(Phaser.Scene);
var Menu = /*#__PURE__*/function (_Phaser$Scene2) {
  _inherits(Menu, _Phaser$Scene2);
  var _super2 = _createSuper(Menu);
  function Menu() {
    _classCallCheck(this, Menu);
    return _super2.call(this, "menuScene");
  }
  _createClass(Menu, [{
    key: "preload",
    value: function preload() {}
  }, {
    key: "create",
    value: function create() {}
  }, {
    key: "update",
    value: function update() {}
  }]);
  return Menu;
}(Phaser.Scene);
var Level = /*#__PURE__*/function (_Phaser$Scene3) {
  _inherits(Level, _Phaser$Scene3);
  var _super3 = _createSuper(Level);
  function Level() {
    _classCallCheck(this, Level);
    return _super3.call(this, "levelScene");
  }
  _createClass(Level, [{
    key: "preload",
    value: function preload() {}
  }, {
    key: "create",
    value: function create() {}
  }, {
    key: "update",
    value: function update() {}
  }]);
  return Level;
}(Phaser.Scene);
var Mode = /*#__PURE__*/function (_Phaser$Scene4) {
  _inherits(Mode, _Phaser$Scene4);
  var _super4 = _createSuper(Mode);
  function Mode() {
    _classCallCheck(this, Mode);
    return _super4.call(this, "modeScene");
  }
  _createClass(Mode, [{
    key: "preload",
    value: function preload() {}
  }, {
    key: "create",
    value: function create() {}
  }, {
    key: "update",
    value: function update() {}
  }]);
  return Mode;
}(Phaser.Scene);
var Controls = /*#__PURE__*/function (_Phaser$Scene5) {
  _inherits(Controls, _Phaser$Scene5);
  var _super5 = _createSuper(Controls);
  function Controls() {
    _classCallCheck(this, Controls);
    return _super5.call(this, "controlsScene");
  }
  _createClass(Controls, [{
    key: "preload",
    value: function preload() {}
  }, {
    key: "create",
    value: function create() {}
  }, {
    key: "update",
    value: function update() {}
  }]);
  return Controls;
}(Phaser.Scene);
var EndGame = /*#__PURE__*/function (_Phaser$Scene6) {
  _inherits(EndGame, _Phaser$Scene6);
  var _super6 = _createSuper(EndGame);
  function EndGame() {
    _classCallCheck(this, EndGame);
    return _super6.call(this, "endScene");
  }
  _createClass(EndGame, [{
    key: "preload",
    value: function preload() {}
  }, {
    key: "create",
    value: function create() {}
  }, {
    key: "update",
    value: function update() {}
  }]);
  return EndGame;
}(Phaser.Scene); // Configuración genérica del videojuego
// Verifica con el type si usa para mostrar el juego el canva o webgl para ello AUTO
// En la propiedad width y height la resolución del juego
// En la propiedad scene todas las escenas del juego, el primer elemento indica la primera escena que se visualiza
// En la propiedad scale para indicar que el ancho y la altura se ajusta manteniendo una relación de aspecto
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 530,
  scene: [MainScene, Menu, Level, Mode, Controls, EndGame],
  scale: {
    mode: Phaser.Scale.FIT
  },
  physics: {
    "default": 'arcade',
    arcade: {
      debug: false,
      gravity: {
        y: 300
      }
    }
  }
};

//Inicialización del objeto Phaser
new Phaser.Game(config);
