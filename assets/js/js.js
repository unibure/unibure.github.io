// 마우스 
const circle = document.querySelector(".mouse_circle");

document.addEventListener("mousemove", (e) => { 
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    circle.style.left = mouseX + 'px';
    circle.style.top = mouseY + 'px';
});


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
