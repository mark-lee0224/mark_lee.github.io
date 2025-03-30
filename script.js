// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 导航栏滚动效果
let lastScroll = 0;
const navBar = document.querySelector('.nav-bar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navBar.style.transform = 'translateY(0)';
        return;
    }

    if (currentScroll > lastScroll && !navBar.classList.contains('scroll-down')) {
        // 向下滚动
        navBar.style.transform = 'translateY(-100%)';
    } else if (currentScroll < lastScroll && navBar.classList.contains('scroll-down')) {
        // 向上滚动
        navBar.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

// 添加页面加载动画
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // 音乐播放器设置
    const songs = [
        {
            element: document.getElementById('song1'),
            audio: new Audio('music/song1.mp3'),
            button: document.getElementById('song1').querySelector('.play-button')
        },
        {
            element: document.getElementById('song2'),
            audio: new Audio('music/song2.mp3'),
            button: document.getElementById('song2').querySelector('.play-button')
        }
    ];

    // 当前播放的音乐
    let currentlyPlaying = null;

    // 为每首歌添加点击事件
    songs.forEach(song => {
        song.element.addEventListener('click', function() {
            const isPlaying = song.button.classList.contains('playing');

            // 停止其他正在播放的音乐
            songs.forEach(s => {
                s.audio.pause();
                s.audio.currentTime = 0;
                s.button.classList.remove('playing');
                s.button.innerHTML = '▶';
            });

            // 播放或暂停当前音乐
            if (!isPlaying) {
                song.audio.play();
                song.button.classList.add('playing');
                song.button.innerHTML = '⏸';
                currentlyPlaying = song;
            } else {
                song.audio.pause();
                song.button.classList.remove('playing');
                song.button.innerHTML = '▶';
                currentlyPlaying = null;
            }
        });

        // 音乐播放结束时的处理
        song.audio.addEventListener('ended', function() {
            song.button.classList.remove('playing');
            song.button.innerHTML = '▶';
            currentlyPlaying = null;
        });
    });
});

async function loadContent(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();

        // 创建一个临时的 DOM 元素来解析 HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // 获取新页面的 body 内容
        const newContent = doc.body.innerHTML;

        // 更新当前页面的 body 内容
        document.body.innerHTML = newContent;

        // 重新加载脚本
        const scripts = document.getElementsByTagName('script');
        for (let script of scripts) {
            if (script.src) {
                const newScript = document.createElement('script');
                newScript.src = script.src;
                document.body.appendChild(newScript);
            }
        }

        // 更新页面标题
        document.title = doc.title;

        // 更新 URL，但不刷新页面
        window.history.pushState({}, '', url);
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

// 汉堡菜单功能
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // 点击导航链接时关闭菜单
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
});

// 卡片翻转效果
document.addEventListener('DOMContentLoaded', function() {
    const quoteInner = document.querySelector('.quote-inner');

    if (quoteInner) {
        quoteInner.addEventListener('click', function() {
            if (window.innerWidth <= 768) {  // 只在移动端生效
                this.classList.toggle('flipped');
            }
        });
    }
});