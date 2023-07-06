import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
(() => {
    //== AUDIO ==//
    const musicBtn = document.querySelector('#musicbutton');
    const audio = new Audio('./multimedia/music.mp3');
    // Obtenemos el contenedor
    const container = document.querySelector('#audifonos3D');
    //== SCENE ==//
    const scene = new THREE.Scene();
    //== CAMERA ==//
    const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        1,
        1000
    );
    
    //== RENDERER ==//
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
    });


    //== MODEL ==//
    let model;
    
    //== ANIMATE ID ==//
    let animationId;

    init();
    function init() {
        camera.position.set(-6,1,7);
        renderer.setClearColor( 0x000000, 0 );
        renderer.useLegacyLights = true;
        //== INITIAL SIZE ==//
        setSize();
        //== RESPONSIVE SIZE ==//
        window.addEventListener('resize', () => {
            stop();
            setSize();
            render();
        });
        container.appendChild(renderer.domElement);
        //== CONTROLS ==//
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enabled = false;

        //== ENVIRONMENT ==//
        const pmremGenerator = new THREE.PMREMGenerator( renderer );
        scene.environment = pmremGenerator.fromScene( new RoomEnvironment( renderer ), 0.01 ).texture;
        //== IMPORT MODEL ==//
        const loader = new GLTFLoader();
        // Optional: Provide a DRACOLoader instance to decode compressed mesh data
        // const dracoLoader = new DRACOLoader();
        // dracoLoader.setDecoderPath( 'https://unpkg.com/three@v0.154.0/examples/jsm/libs/draco/' );
        // loader.setDRACOLoader( dracoLoader );
        loader.load( './assets/scene.gltf', function ( gltf ) {
            model = gltf.scene;
            model.position.set( 0, -3.8, 0 );
            model.scale.set( 50, 50, 50 );
            scene.add( model );
            // scene.add( new THREE.AxesHelper(5) );
            render();
        }, undefined, function ( error ) {
            console.error( error );
        } ); 
    }
    function setSize() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
    }
    function render() {
        renderer.render(scene, camera);
    }
    function gyro() {
        stop();
        animationId = requestAnimationFrame(gyro);
        model.rotation.y += 0.01;
        render();
    }
    function activateControls() {
        stop();
        //== CONTROLS ==//
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enabled = true;
        controls.rotateSpeed = .001;
        controls.zoomSpeed = 0.0009;
        controls.maxZoom = 1;
        controls.minZoom = 0;
        animationId = requestAnimationFrame(activateControls);
        render();
    }
    function stop() {
        if(animationId) {
            cancelAnimationFrame(animationId);
        }
    }
    function playMusic() {
        audio.play();
    }
    function stopMusic() {
        audio.pause();
    }
    let isShowed = false;
    let clicked = false;
    function showMusicControls() {
        isShowed = true;
        musicBtn.style.transform = "translateY(0%)";
        // Crear ícono inicial
        musicBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    }
    musicBtn.addEventListener('click', e => {
        const modelos = document.querySelectorAll('#modelo');
        clicked = true;
        // Crear ícono inicial
        if(audio.paused) {
            modelos.forEach( modelo => {
                const imgAudifono = modelo.querySelector('.modelo__img');
                imgAudifono.style.animation = "gyroImg 4s linear infinite";
            }); 
            playMusic();
            gyro();
            musicBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
        } else {
            modelos.forEach( modelo => {
                const imgAudifono = modelo.querySelector('.modelo__img');
                imgAudifono.style.animation = "none";
                modelo.addEventListener('mouseover', () => {
                    if(audio.paused) imgAudifono.style.animation = "gyroImg 4s linear infinite";
                });
                modelo.addEventListener('mouseout', () => {
                    if(audio.paused) imgAudifono.style.animation = "none";
                });
            });
            stopMusic();
            stop();
            musicBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
        }
    })

   

    //== LISTENERS ==//
    const techproBox = document.querySelector('#techproBox');
    techproBox.addEventListener('mousedown', () => {
        activateControls();
    })
    techproBox.addEventListener('mouseover', () => {
        if(!isShowed) showMusicControls();
        if(clicked && !audio.paused) gyro();
    });

   
})();
