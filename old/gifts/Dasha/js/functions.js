(function (window) {

    window.toRad = (deg) => 0.017453292519943295 * deg;

    window.toDeg = (rad) => rad / 0.017453292519943295;

    window.sqrt = (num, pow = 2) => Math.pow(num, 1 / pow);

    window.randomInt = (from, to) => Math.floor(Math.random() * (to - from + 1) + from);

    window.distance = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    /**
     * Polar -> Decart
     * @param {Number} angle
     * @param {Number} radius
     */
    window.toDecart = (angle, radius) => {
				let x, y;

				x = radius * Math.cos(angle);
				y = radius * Math.sin(angle);

				return {x: x, y: y};
			};

	  window.toPolar = (x, y) => {
		      let angle, radius;

          radius = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

          //angle = Math.acos((Math.pow(radius, 2) + Math.pow(x, 2) - Math.pow(y, 2)) / (2 * radius * x));
          angle = Math.atan2(y, x);

          return {radius: radius, angle: angle};
      };

      window.colorInc = (color, what = "rgb", inc) => {
          let REG = /\d+/g;
          let colorsStart = color.match(REG);
          let colorsEnd = new Array(colorsStart.length);
      
          let whatsREG = /\w/g;
          let whats = what.match(whatsREG);
      
          let a = ['r', 'g', 'b', 'a'];
      
          for (let i = 0; i < colorsStart.length; i++) {
              let b = true;
      
              for (let j = 0; j < whats.length; j++) {
                  if (whats[j] === a[i]) {
                      b = false;
                  }
              }
      
              colorsEnd[i] = parseInt(colorsStart[i]);
      
              if (b) continue;
      
              colorsEnd[i] += inc;
              if (colorsEnd[i] < 0)
                  colorsEnd[i] = 0;
              else if (colorsEnd[i] > 255)
                  colorsEnd[i] = 255;
          }
          return `rgba(${colorsEnd[0]}, ${colorsEnd[1]}, ${colorsEnd[2]}, 1)`;
      };

      window.toRGB = (hex) => {
          // from #rrggbb
          // t0   rgb(rrr, ggg, bbb)

          return "rgb(" + hex.slice(1, 3) + "," +  hex.slice(3, 5) + "," + hex.slice(5, 7) + ")";
      };

      window.toRGBA = (hex) => {
        // from #rrggbb
        // t0   rgb(rrr, ggg, bbb)

        return "rgb(" + parseInt(hex.slice(1, 3), 16) + "," +  parseInt(hex.slice(3, 5), 16) + "," + parseInt(hex.slice(5, 7) + ", 1)", 16);
    }

})(window)
