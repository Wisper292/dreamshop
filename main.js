// Three.js 초기화
let scene, camera, renderer;
let ball1, ball2;
let radius = 20;

init();
animate();

function init() {
    // Scene 생성
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // Camera 생성
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 300;

    // Renderer 생성
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 공 생성
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material1 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const material2 = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    ball1 = new THREE.Mesh(geometry, material1);
    ball1.position.x = -50;
    scene.add(ball1);

    ball2 = new THREE.Mesh(geometry, material2);
    ball2.position.x = 50;
    scene.add(ball2);
}

function animate() {
    requestAnimationFrame(animate);

    // 충돌 감지 및 처리
    handleCollision(ball1, ball2);

    // 각도에 따른 속도 변화 적용
    applyVelocityChange(ball1, ball2);

    // 렌더링
    renderer.render(scene, camera);
}

function handleCollision(ball1, ball2) {
    const distance = ball1.position.distanceTo(ball2.position);
    if (distance <= 2 * radius) {
        // 충돌 시 속도 변화 (간단히 반대 방향으로만 변화하는 예시)
        const temp = ball1.material.color.clone();
        ball1.material.color.copy(ball2.material.color);
        ball2.material.color.copy(temp);
    }
}

function applyVelocityChange(ball1, ball2) {
    // 충돌 후 속도 감소 적용 (지수 함수 사용)
    const k = 0.01; // 감속 상수
    const decayFactor = 0.99; // 지수 함수의 감소 상수

    // 각 공의 속도 벡터 크기 계산
    const speed1 = ball1.velocity.length();
    const speed2 = ball2.velocity.length();

    // 충돌 후 감속 적용 (지수 함수)
    ball1.velocity.multiplyScalar(Math.pow(decayFactor, speed1 * k));
    ball2.velocity.multiplyScalar(Math.pow(decayFactor, speed2 * k));

    // 공의 위치 업데이트
    ball1.position.add(ball1.velocity);
    ball2.position.add(ball2.velocity);
}