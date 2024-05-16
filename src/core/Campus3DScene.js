import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


export default class Campus3DScene {
    constructor() {
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 100000 );

        this.camera.position.set(5000, 5000, 5000);
        
        this.onResize = this.resize.bind(this);
        this.animateBind = this.animate.bind(this);

        this.initController();

        this.initHelper();

        this.init();

        this.initLight();

        this.initMesh();

        this.initCampus();
    }

    initController() {
        const { renderer, camera } = this;
        this.orbitControls = new OrbitControls( camera, renderer.domElement );
        this.orbitControls.update();
    }

    init() {
        document.body.appendChild( this.renderer.domElement );

        this.resize();

        this.addEventListener();

        this.animateBind();
    }

    initMesh() {
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        this.scene.add( cube );

        // this.camera.position.z = 5;
    }

    initLight () {
        const light = new THREE.AmbientLight( 0x404040 ); // 柔和的白光
        this.scene.add( light );
        
        const directionalLight = new THREE.DirectionalLight( 0xffffff, 10 );
        this.directionalLight = directionalLight;
        directionalLight.position.set( 75, 300, 1000 );
        this.scene.add( directionalLight );


        // const pointlight = new THREE.PointLight( 0xff0000, 1, 10000 );
        // pointlight.position.set( 10000, 10000, 10000 );
        // this.scene.add( pointlight );
    }

    initHelper() {
        this.scene.add(new THREE.AxesHelper(10));
        this.scene.add(new THREE.GridHelper(10));
    }

    initCampus() {
        const loader = new GLTFLoader();

        loader.load(
            // resource URL
            '/model/compus.glb',
            // called when the resource is loaded
            ( gltf ) => {
                console.log('gltf ==>', gltf);
                // gltf.scene.traverse(object => {
                //     if (object.isMesh) {
                //         object.material.depthTest = false;
                //     }
                // })
                this.scene.add( gltf.scene );
                // gltf.animations; // Array<THREE.AnimationClip>
                // gltf.scene; // THREE.Group
                // gltf.scenes; // Array<THREE.Group>
                // gltf.cameras; // Array<THREE.Camera>
                // gltf.asset; // Object
        
            },
            // called while loading is progressing
            ( xhr ) => {
        
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        
            },
            // called when loading has errors
            ( error ) => {
        
                console.log( 'An error happened', error);
        
            }
        );
    }

    animate() {
        const { renderer, scene, camera, orbitControls } = this;
        requestAnimationFrame( this.animateBind );

        orbitControls.update();

        renderer.render( scene, camera );
    }

    resize() {

		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    addEventListener() {
        window.addEventListener('resize', this.onResize);
    }

    removeEventListener() {
        window.removeEventListener('resize', this.onResize);
    }

    dispose() {
        if (this.renderer) this.renderer.dispose();

        this.removeEventListener();
    }
    

}