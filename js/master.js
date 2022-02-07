document.addEventListener("DOMContentLoaded", function() {

  let arrImg = []
  let actual = null
  let tl = new TimelineMax()
  let slider = document.getElementById('slider')
  const renderer = new PIXI.autoDetectRenderer({
      width: slider.offsetWidth,
      height: slider.offsetHeight,
      autoResize: true,
      backgroundColor: 0x1D1D1D, resolution: window.devicePixelRatio || 1,
  });
  slider.appendChild(renderer.view);
  let disSprite = PIXI.Sprite.from('./img/disimg2.jpg')
  const displacementFilter = new PIXI.filters.DisplacementFilter(disSprite);

  const container = new PIXI.Container();
  const stage = new PIXI.Container();
  stage.addChild(container);
  let navi = document.getElementsByClassName('navi')[0]
  // console.log(tl)
  // tl.to("body", 1, {x: 200})


  function initial() {

    for (let i = 0; i < navi.children.length; i++) {
      // navi.children[i]
      arrImg[i] = PIXI.Sprite.from(navi.children[i].getAttribute("data-src"))
      arrImg[i].position = {x: 0, y:0}
      arrImg[i].position.x = (renderer.width / 2) - (arrImg[i].width / 2);
      arrImg[i].position.y = (renderer.height / 2) - (arrImg[i].height / 2);
      if (i == 0) {
        arrImg[i].alpha = 1
        actual = arrImg[i]
      }else {
        arrImg[i].alpha = 0
      }
      container.addChild(arrImg[i])

    }


    disSprite.height = renderer.height
    disSprite.width = renderer.width
    displacementFilter.scale.set(0.1)
    stage.addChild(disSprite)
    container.filters = [displacementFilter]

    function selectText(num) {
      let texts = document.getElementById('texts')
      for (let i = 0; i < texts.children.length; i++) {
        texts.children[i].classList.add("d-none")
        document.getElementById('link'+ (i+1)).classList.remove("select")
      }

      document.getElementById('text'+num)
      document.getElementById('link'+num).classList.add("select")
      document.getElementById('text'+num).classList.remove("d-none")

    }

    for (let i = 0; i < navi.children.length; i++) {
      navi.children[i].onclick=()=>{
        selectText(i+1)

          tl
            .to(displacementFilter.scale, 1, {y: 5000, x:0.1})
            .to(displacementFilter.scale, 1, {y: 0.1, x:0.1});

          tl.to(arrImg[i], 1, {alpha: 1}, 1)
          tl.to(actual, 1, {alpha: 0}, 1)
          tl.fromTo(arrImg[i].scale, 1,
              {y: arrImg[i].scale.y*2},
              {y: arrImg[i].scale.y}, 1)
          actual = arrImg[i]
        }

    }


  }
  initial()

















  function draw() {
    renderer.render(stage)
    window.requestAnimationFrame(draw)
  }
  draw()



});
