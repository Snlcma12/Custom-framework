Template.prototype.graphRendererTemplate = () =>
  `
  <div id="app">
    <div class="">
      <checkbox id="checkBox"></checkbox>
    </div>

    <span class="options">
      <input onClick="ui.toggleMenu()" type="checkbox" id="check" />
      <label for="check" class="checkbutton">
        
      </label>

      <div class="menu-wrap" id="menuWrap">
        <div class="menu">
          <div class="menu-buttons">
            <h1>Function Renderer</h1>
            <button onClick="onAddFunction()">Add</button>
          </div>

          <hr />
          <div id="functionList">
          </div>

          <div>
            <button id="applyFuncs">Apply</button>
          </div>

        </div>
      </div>
    </span>

    <canvas ref="canvas" id="graphCanvas" width="600" height="500"></canvas>
  </div>
`;
