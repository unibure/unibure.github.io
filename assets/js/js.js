
//마우스 스크립트 lerp 사용 ( 부드럽게 움직이는 마우스 커서 사용시 lerp이용 )

// const circle = document.querySelector('.mouse_circle');
// let mouseX = 0 , mouseY = 0, startX = 0, startY = 0;
// window.addEventListener('mousemove', e => {
//   mouseX = e.clientX;
//   mouseY = e.clientY;
  
//   circle.style.transform = `translate(${mouseX}px, ${mouseY}px)`
// })
// function frame(){
//   requestAnimationFrame(frame)
//   startX = lerp(startX , mouseX, 0.05)
//   startY = lerp(startY , mouseY, 0.05)
// }
// requestAnimationFrame(frame);

// function lerp(s, e, a){
//   return s + (e - s) * a
// }


const cursorParent = document.getElementById('mouse_circle');
const cursorChild = cursorParent.children[0];
window.addEventListener('mousemove' , cursorMove)
window.addEventListener('mousedown' , cursorDown)
window.addEventListener('mouseup' , cursorUp)

let stage = ''
let color = ''
let cursorX = 0, cursorY = 0;



//HTMLElement.offsetWidth전용 속성은 요소의 레이아웃 너비를 정수로 반환합니다.
function cursorMove(e){
  cursorX = e.pageX - cursorParent.offsetWidth / 2
  cursorY = e.pageY - cursorParent.offsetHeight / 2
  cursorParent.style.transform = `translate3d(${cursorX}px , ${cursorY}px , 0)`

  switch (e.target.getAttribute('data-cursor')) {
    case 'title' :
      if (stage === 'title') return;
        scale = 5;
        stage = 'title'
        cursorParent.classList.add('cursor-text-mode')
        cursorChild.setAttribute('data-name', e.target.getAttribute('data-name'))

    case 'index' :
      if (stage === 'index') return;
        scale = 5;
        stage = 'index';
        cursorParent.classList.add('cursor-text-mode')
        cursorChild.setAttribute('data-name', e.target.getAttribute('data-name'));
      break;
    default : 
      if (stage === '')
        scale = 1 ;
        stage = ''
        cursorParent.classList.remove('cursor-text-mode')
        cursorChild.setAttribute('data-name', '')
    }
    cursorChild.style.setProperty('--cursor-scale' , scale)
}
function cursorDown(e){
  scale *= 0.8
  cursorChild.style.setProperty('--cursor-scale' , scale)
}

function cursorUp(e){
  scale *= 1.25
  cursorChild.style.setProperty('--cursor-scale' , scale)
}

// 스크롤시 애니메이션
let observer = new IntersectionObserver((e ) => {
  e.forEach((i) => {
    if(i.isIntersecting){
    i.target.style.opacity = 1;
    i.target.style.transform = 'translateX(0)';
    } else {
      i.target.style.opacity = 0;
      i.target.style.transform = 'translateX(200px)';
    }
  })
})
let overviewDesc = document.querySelectorAll('#intro_section2 .desc') 
  overviewDesc.forEach((e) => {
  observer.observe(e)
});
let overviewTitle = document.querySelector('#intro_section2 .tit')
  observer.observe(overviewTitle)


      const canvas = document.querySelector('canvas')
          canvas.width = window.innerWidth
          canvas.height = window.innerHeight
          const ctx = canvas.getContext('2d')

          const TOTAL = 1500
          const petalArray = []

          const petalImg = new Image()
          petalImg.src = './assets/image/star.png'
          petalImg.onload = () => {
            for (let i = 0; i < TOTAL; i++) {
              petalArray.push(new Petal())
            }
            render()
          }

          function render() {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            petalArray.forEach(petal => {
              petal.animatee()
            })

            window.requestAnimationFrame(render)
          }

          window.addEventListener('resize', () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
          })

          // 벚꽃 잎 클래스
          class Petal {
            constructor() {
              this.x = Math.random() * canvas.width
              this.y = Math.random() * canvas.height * 2 - canvas.height
              this.w = 10 + Math.random() * 15
              this.h = 10 + Math.random() * 10
              this.opacity = this.w / 45
              this.xSpeed = Math.random() * 0.08
              this.ySpeed = Math.random() * 0.05
              this.flip = Math.random()
              this.flipSpeed = Math.random() * 0.01
            }

            draw() {
              if (this.y > canvas.height || this.x > canvas.width) {
                this.x = -petalImg.width
                this.y = Math.random() * canvas.height * 2 - canvas.height
                this.xSpeed = Math.random() * 0.08
                this.ySpeed = Math.random() * 0.05
                this.flip = Math.random()
              }
              ctx.globalAlpha = this.opacity
              ctx.drawImage(
                petalImg,
                this.x,
                this.y,
                this.w * (0.4 + (Math.abs(Math.cos(this.flip)) / 3)),
                this.h * (0.8 + (Math.abs(Math.sin(this.flip)) / 2)),
              )
            }

            animatee() {
              this.x += this.xSpeed
              this.y += this.ySpeed
              this.draw()
              this.flip += this.flipSpeed
            }
    }