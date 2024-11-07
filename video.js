const modeToggle = document.getElementById('modeToggle');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
    body.classList.replace('light', 'dark');
    modeToggle.textContent = '☀️';
}

modeToggle.addEventListener('click', () => {
    const isLightMode = body.classList.contains('light');
    body.classList.toggle('light', !isLightMode);
    body.classList.toggle('dark', isLightMode);

    modeToggle.textContent = isLightMode ? '☀️' : '🌙';
    localStorage.setItem('theme', isLightMode ? 'dark' : 'light');
});

document.addEventListener('DOMContentLoaded', () => {
    const videos = [
        document.getElementById('video1'),
        document.getElementById('video2'),
        document.getElementById('video3'),
        document.getElementById('video4'),
        document.getElementById('video5'),
        document.getElementById('video6'),
    ];
        
    const locks = [
        document.getElementById('lock2'),
        document.getElementById('lock3'),
        document.getElementById('lock4'),
        document.getElementById('lock5'),
        document.getElementById('lock6'),
    ];
        
    const testPaperWrapper = document.getElementById('testPaperWrapper');
    const testPaperLink = document.getElementById('testPaperLink');
    let completedVideos = 0;
        
    const unlockVideo = (video, lock) => {
        lock.style.display = 'none';
        video.style.pointerEvents = 'auto';
        video.controls = true;
    };
        
    const unlockTestPaper = () => {
        testPaperWrapper.style.display = 'block';
        testPaperLink.style.pointerEvents = 'auto';
    };
        
    videos.forEach((video, index) => {
        video.addEventListener('ended', () => {
            completedVideos++;
            if (index < locks.length) 
                unlockVideo(videos[index + 1], locks[index]);
        
            if (completedVideos === videos.length) 
                unlockTestPaper();
        });
    });
});

completedVideos.addEventListener('ended', () => unlockTest());

function unlockTest() {
    testLock.style.display = 'none';
    alert('All videos watched! Now you can access the test.');
} 