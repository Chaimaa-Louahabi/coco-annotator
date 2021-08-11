//Loading a JavaScript library from a CDN
importScripts("https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.12.15/paper-full.js");

onmessage = function(e) {
    // Get received data 
    let height  = e.data[1];
    let width  = e.data[2];

    // Create a scope to avoid the error due to 'project' is null
    let scope = new paper.PaperScope();
    scope.setup(new paper.Size(width, height));

    // Recreate the paperjs object
    let path = new paper.CompoundPath(); 
    path.importJSON(e.data[0]);
    let x = path.bounds.x;
    let y = path.bounds.y;

    // Initiate a binary mask full of zeros
    let mask = Array.from(Array(height), () => new Array(width).fill(0));

    // Register the pixels who belong to the current polygon path
    for(var i = 0; i < height; i++) {
        for(var j = 0; j < width; j++) {
            if (path.contains( new paper.Point(x + j, y + i ))) {
                mask[i][j] = 1;
            }
        }
    }

    this.postMessage([mask, x, y, height, width]);
  }

  onerror = event => {
    console.error(event.message)
  }
