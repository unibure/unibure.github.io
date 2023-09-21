// 마우스가 부르덥게 움직이기 위해서 animaition-duration을 사용해야함
// const circle = document.querySelector(".mouse_circle");
// document.addEventListener("mousemove", (e) => { 
//     const mouseX = e.clientX;
//     const mouseY = e.clientY;
//     circle.style.left = mouseX + 'px';
//     circle.style.top = mouseY + 'px';
// });

//마우스 스크립트 lerp 사용 ( 부드럽게 움직이는 마우스 커서 사용시 lerp이용 )

const circle = document.querySelector('.mouse_circle');
let mouseX = 0 , mouseY = 0, startX = 0, startY = 0;
window.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  circle.style.transform = `translate(${mouseX}px, ${mouseY}px)`
})
function frame(){
  requestAnimationFrame(frame)
  startX = lerp(startX , mouseX, 0.05)
  startY = lerp(startY , mouseY, 0.05)
}
requestAnimationFrame(frame);

function lerp(s, e, a){
  return s + (e - s) * a
}



//typo animation

const elts = {
	text1: document.getElementById("text1"),
	text2: document.getElementById("text2")
};

//변형할 문자열 입력하기
const texts = [
  "Front End",
  "Developer",
	"unibure",
	"Portfolio",
];

// 모핑의 속도를 제어
const morphTime = 2;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
	morph -= cooldown;
	cooldown = 0;
	
	let fraction = morph / morphTime;
	
	if (fraction > 1) {
		cooldown = cooldownTime;
		fraction = 1;
	}
	
	setMorph(fraction);
}

// 텍스트에 흐림필터를 적용함
function setMorph(fraction) {
	// fraction = Math.cos(fraction * Math.PI) / -2 + .5;
	
	elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
	elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
	
	fraction = 1 - fraction;
	elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
	elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
	
	elts.text1.textContent = texts[textIndex % texts.length];
	elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
	morph = 0;
	
	elts.text2.style.filter = "";
	elts.text2.style.opacity = "100%";
	
	elts.text1.style.filter = "";
	elts.text1.style.opacity = "0%";
}

// 매 프레임마다 호출되는 loop
function animate() {
	requestAnimationFrame(animate);
	
	let newTime = new Date();
	let shouldIncrementIndex = cooldown > 0;
	let dt = (newTime - time) / 1000;
	time = newTime;
	
	cooldown -= dt;
	
	if (cooldown <= 0) {
		if (shouldIncrementIndex) {
			textIndex++;
		}
		
		doMorph();
	} else {
		doCooldown();
	}
}
// animate();


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