function loadSourceFile(path) {
  var req = new XMLHttpRequest();
  req.onload = function() {
      var src = document.getElementById('the_source');
      src.innerHTML = req.responseText;
  }
  req.open("get", path);
  req.send();
}

var exampleFiles = {"Hello World":       "examples/hello.pas",
                    "Fibonacci":         "tests/ffib.pas",
                    "Quick Sort":        "tests/qsort.pas",
                    "Nested Scope":      "tests/nested4.pas",
                    "Hailstone Numbers": "examples/hailstone.pas",
                    "JS Alert":          "examples/js_alert.pas",
                    "JS Callback":       "examples/js_callback.pas"};
var sel = document.getElementById('source_file');

for (var k in exampleFiles) {
  var opt = document.createElement('option');
  opt.value = exampleFiles[k];
  opt.innerHTML = k;
  sel.appendChild(opt);
}

sel.onchange = function() { loadSourceFile(sel.value); };
loadSourceFile("examples/hello.pas");

// emscripten workarounds
arguments = [];

var Module = {};

// Keep LLVM.js from triggering browser print dialog
print = function () { };

// Monkey patch XMLHttpRequest open to be relative to XHR_PREFIX
(function(xhr) {
  var orig_open = xhr.open;
  xhr.open = function(method, url) {
      var rest = Array.prototype.slice.apply(arguments).slice(2);
      if (window.XHR_PREFIX && url.substr(0,4).toLowerCase() !== "http") {
        url = XHR_PREFIX + url;
      }
      return orig_open.apply(this, [method, url].concat(rest));
  };
})(XMLHttpRequest.prototype);

var XHR_PREFIX = ""

function doParse(src) {
  var source = src,
      parser = new parse.Parser(),
      ast = null;
  try {
    ast = parser.parse(source);
    return JSON.stringify(ast, null, 4);
  } catch (e) {
    return 'Error in parsing: ' + e;
  }
}

function doIR(src) {
  var json_ast = src,
      ast = JSON.parse(json_ast),
      IR_API = new IR(),
      ir = null;
  XHR_PREFIX = "";
  try {
    ir = IR_API.normalizeIR(IR_API.toIR(ast));
    return ir;
  } catch(e) {
    return 'Error compiling to IR: ' + e;
  }
}

function doOptimize(src) {
  XHR_PREFIX = "llvm.js/";
  var ir = src,
      new_ir = '', js = '';

  try {
    new_ir = llvmDis(llvmAs(ir));
    return new_ir;
  } catch (e) {
    return 'Error in compilation: ' + e;
  }
}

function doCompile(src) {
  XHR_PREFIX = "llvm.js/";
  var ir = src,
      js = '';

  try {
    compile(ir);
//    if (js && js[0] === 'E') {
//        throw new Error(js);
//    }
    return js;
  } catch (e) {
    return 'Error compiling to JS: ' + e;
  }
}

function doExecute(src) {
  XHR_PREFIX = "";
  var js = src;
  try {
    eval(js);
  } catch(e) {
    return 'Error in execution: ' + e;
  }
}
