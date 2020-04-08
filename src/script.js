function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this,
        args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };
  
  function wait(ms){
     var start = new Date().getTime();
     var end = start;
     while(end < start + ms) {
       end = new Date().getTime();
    }
  }
  
  
  manageBox = {
    data: {
      "containerWidth": 0,
      "totalGame": 0,
      "gameWidth": 0,
      "gameVisibleInPage": 0,
      "pageTotal": 0,
      "translateXStartPerc": 0,
      "translateXPerc": 0,
      "translateXBox": 0,
      "arrowWidthPerc": 0,
      "gameBoxMarginPerc": 0,
      "pagePos": 1,
      "gameBoxIndex": 1
    },
    init: function(el) {
  
      //Reset position and set base data
      if (this.getData("translateXStartPerc") != 0) {
        this.setData("pagePos", 1);
        this.setData("translateXPerc", this.getData("translateXStartPerc"));
        el.style.transform = "translateX(" + this.getData("translateXStartPerc") + "%)";
        el.nextElementSibling.classList.add("hide");
      }
  
      this.setData("containerWidth", parseFloat(el.offsetWidth));
      this.setData("totalGame", el.querySelectorAll(".game-box").length);
      this.setData("gameWidth", parseFloat(el.querySelector(".game-box").offsetWidth + (parseFloat(window.getComputedStyle(el.querySelector(".game-box"), null).getPropertyValue("margin-right")))));
      this.setData("gameVisibleInPage", parseInt(( this.getData("containerWidth") - parseFloat(window.getComputedStyle(el.nextElementSibling, null).getPropertyValue("width")) * 2)  / this.getData("gameWidth")));
      this.setData("pageTotal", parseInt(Math.ceil(this.getData("totalGame") / this.getData("gameVisibleInPage"))));
  
      if (this.getData("translateXStartPerc") == 0) {
        this.setData("translateXPerc", (this.getComputedTranslate(el) * 100) / this.getData("containerWidth"));
        this.setData("translateXStartPerc", this.getData("translateXPerc"));
        this.setData("translateXBox", parseFloat((this.getData("gameWidth") * 100 / this.getData("containerWidth"))));
      }
  
      this.setData("arrowWidthPerc", (parseFloat(window.getComputedStyle(el.nextElementSibling, null).getPropertyValue("width")) * 100) / this.getData("containerWidth"));
      this.setData("gameBoxMarginPerc", (parseFloat(window.getComputedStyle(el.querySelector(".game-box"), null).getPropertyValue("margin-right")) * 100) / this.getData("containerWidth"));
      
      if(this.getData("totalGame") > this.getData("gameVisibleInPage")){
        el.nextElementSibling.classList.remove("hide");
      }
      
    },
    getData: function(property) {
      return (property) ? this.data[property] : this.data;
    },
    setData: function(property, value) {
      this.data[property] = value;
    },
    getComputedTranslate: function(el) {
  
      var st = window.getComputedStyle(el, null);
      var tr = st.getPropertyValue("-webkit-transform") ||
        st.getPropertyValue("-moz-transform") ||
        st.getPropertyValue("-ms-transform") ||
        st.getPropertyValue("-o-transform") ||
        st.getPropertyValue("transform");
  
      var values = tr.split('(')[1],
        values = values.split(')')[0],
        values = values.split(',');
  
      return parseFloat(values[4]) //TranslateX
    },
    next: function(el) {
  
      var _ref = el;
      
      if (this.getData("pagePos") == this.getData("pageTotal")) {
        this.setData("pagePos", "1");
      }
      
      
      if (this.getSiblingsCount(el, this.getData("gameBoxIndex"), "next") <= parseInt(this.getData("gameVisibleInPage") + 1)) {
  
        //Move DOM block
        var els = el.querySelectorAll(':nth-of-type(-n+' + this.getData("gameVisibleInPage") + ')');
        [].forEach.call(els, function(el) {
          //console.log("--->",el);
          if(el.classList.contains("game-box")){
          var clone = el.cloneNode(true);
            _ref.appendChild(clone);
            _ref.removeChild(el);
          }
        });
  
        //debugger;
        var posX = this.getData("translateXPerc") + (100 - (this.getData("arrowWidthPerc") * 2) - this.getData("gameBoxMarginPerc"));
        this.setData("translateXPerc", posX);
        el.classList.toggle("transition");
        el.style.transform = "translateX(" + posX + "%)";
        el.classList.toggle("transition");
      } else {
        this.setData("gameBoxIndex", parseInt(this.getData("gameBoxIndex") + this.getData("gameVisibleInPage")));
      }
       
      var posX = this.getData("translateXPerc") - (100 - (this.getData("arrowWidthPerc") * 2) - this.getData("gameBoxMarginPerc"));
      el.style.transform = "translateX(" + posX + "%)";
      this.setData("translateXPerc", posX);
  
      //Set the new page
      this.setData("pagePos", parseInt(this.getData("pagePos")) + 1);
      
      console.log(this.getData());
      
    },
    prev: function(el) {
  
      var _ref = el;
      
      if (this.getData("pagePos") == 0) {
        this.setData("pagePos", this.getData("pageTotal"));
      }
      
      if (this.getSiblingsCount(el, this.getData("gameBoxIndex"), "prev") <= parseInt(this.getData("gameVisibleInPage") + 1)) {
  
        //Move DOM block
        var els = el.querySelectorAll(':nth-last-of-type(-n+' + this.getData("gameVisibleInPage") + ')');
        var i=0;
        [].forEach.call(els, function(el) {
          if(el.classList.contains("game-box")){
            var clone = el.cloneNode(true);
            _ref.insertBefore(clone,_ref.childNodes[i]);
            _ref.removeChild(el);
            i++
          }
        });
  
        var posX = this.getData("translateXPerc") - (100 - (this.getData("arrowWidthPerc") * 2) - this.getData("gameBoxMarginPerc"));
        this.setData("translateXPerc", posX);
        el.classList.toggle("transition");
        el.style.transform = "translateX(" + posX + "%)";
        el.classList.toggle("transition");
      } else {
        this.setData("gameBoxIndex", parseInt(this.getData("gameBoxIndex") - this.getData("gameVisibleInPage")));
      }
       
      var posX = this.getData("translateXPerc") + (100 - (this.getData("arrowWidthPerc") * 2) - this.getData("gameBoxMarginPerc"));
      el.style.transform = "translateX(" + posX + "%)";
      this.setData("translateXPerc", posX);
  
      //Set the new page
      this.setData("pagePos", parseInt(this.getData("pagePos")) - 1);
      
    },
    getSiblingsCount(el, index, dir) {
  
      result=0;
      
      switch (dir) {
  
        case 'next':
  
          var el = el.querySelector('.game-box:nth-of-type(' + index + ')').nextElementSibling;
          var i = 0;
          while (el) {
            el = el.nextElementSibling;
            i++;
          }
  
          result=parseInt(i - (this.getData("gameVisibleInPage") - 1));
          
          break;
  
        case 'prev':
  
          var el = el.querySelector('.game-box:nth-of-type(' + index + ')').previousElementSibling;
          var i = 0;
          while (el) {
            el = el.previousElementSibling;
            i++;
          }
          
          result=parseInt(i - (this.getData("gameVisibleInPage")));
  
          break;
  
      }
  
      return result;
  
    }
  
  };
  
  //Move Forwards
  document.querySelector(".game-container .arrow-right").addEventListener("click", function(e) {
    manageBox.next(this.previousElementSibling);
  });
  
  //Move Backwards
  document.querySelector(".game-container .arrow-left").addEventListener("click", function(e) {
    manageBox.prev(this.nextElementSibling);
  });
  
  //Init
  var gameFixPos = debounce(function() {
  
    var els = document.querySelectorAll(".game-container .game-wrapper");
    [].forEach.call(els, function(el) {
      manageBox.init(el);
    });
  
  }, 250);
  
  window.addEventListener('resize', gameFixPos);
  gameFixPos();
  
  
  