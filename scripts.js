const container = document.body;
const options = {
    maxRockets: 2,            // 减少同时在空中的最大烟花数
    rocketSpawnInterval: 1000, // 增加烟花产生间隔
    numParticles: 150,        // 增加粒子数以使烟花看起来更壮观
    explosionMinHeight: 0.4,  // 增加爆炸最小高度
    explosionMaxHeight: 0.8,  // 减少爆炸最大高度
    explosionChance: 0.1      // 爆炸几率
};
const fireworks = new Fireworks(container, options);

document.body.addEventListener('click', function(e) {
    fireworks.start();
    setTimeout(() => { fireworks.stop(); }, 800); // 增加烟花持续时间
    fireworks.setOptions({ x: e.clientX, y: e.clientY }); // 设置烟花在点击位置绽放
});

const texts = document.querySelectorAll('.text');
texts.forEach((text, idx) => {
    let chars = text.textContent.split('');
    text.textContent = '';
    chars.forEach((char, index) => {
        let span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        span.style.transition = 'opacity 2s ease';
        span.style.transitionDelay = `${index * 0.1 + idx * 2}s`;
        text.appendChild(span);
        setTimeout(() => {
            span.style.opacity = '1';
        }, 100);
    });
});

const countdown = document.getElementById('countdown');
const targetDate = new Date('Jan 1, 2025 00:00:00').getTime();

function updateCountdown() {
    let now = new Date().getTime();
    let distance = targetDate - now;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    countdown.textContent = `跨年倒计时：${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`;
    setTimeout(updateCountdown, 1000);
}

updateCountdown();