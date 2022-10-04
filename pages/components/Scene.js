import * as THREE from 'three';
import { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { AmbientLight } from 'three';
import GUI from 'lil-gui';

export default function Scene(){

    useEffect( () => {


    // Scene
    const scene = new THREE.Scene();
    const groupInstrument = new THREE.Group();
    const groupPromote = new THREE.Group();

    // Object
        // Cube
        const cubeGeometry = new THREE.BoxGeometry(1,1,1);
        const cubeMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000 });
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        groupInstrument.add(cube);

        // Sol
        const circleGeometry = new THREE.CircleGeometry(5,32);
        const circleMaterial = new THREE.MeshBasicMaterial( {color: "#24B8FE" });
        const circle = new THREE.Mesh( circleGeometry, circleMaterial);
        circle.material.side = THREE.DoubleSide;
        circle.scale.set(0.22,0.22,0.22)
        circle.rotation.x = (1.57);
        circle.position.y = -0.5
        groupInstrument.add(circle);
        groupInstrument.position.y = -0.2;
        scene.add(groupInstrument);


        function getCenterPoint(mesh) {
            var geometry = mesh.geometry;
            geometry.computeBoundingBox();
            var center = new THREE.Vector3();
            geometry.boundingBox.getCenter( center );
            mesh.localToWorld( center );
            return center;
        }

        //controls
        const controls = [];
        const CONTROLS_MIN_MAX = (Math.PI/2)-0.32;

        // Import blender GLTF
        const gltfLoader = new GLTFLoader();
        const promote_number = 4;
        const angle = ((2*Math.PI)/promote_number);
        const dh = 1.9;
        const axeY = 0.5;

        for(let i=0;i<promote_number;i++){
            let data = i;
            gltfLoader.load('/models/promote/promote_'+data+'.gltf',(gltf) => 
            {
            // Models
            gltf.scene.position.y = groupInstrument.position.y + axeY;
            gltf.scene.position.x = groupInstrument.position.x + dh * Math.sin(i*angle);
            gltf.scene.position.z =  groupInstrument.position.z + dh * Math.cos(i*angle);
            // Camera OrbitControl
            let control = new OrbitControls(gltf.scene, canvas);
            control.enableDamping = true;
            control.minPolarAngle = CONTROLS_MIN_MAX;
            control.maxPolarAngle = CONTROLS_MIN_MAX;
            control.rotateSpeed *= -0.2;
            controls.push(control); 
            groupPromote.add(gltf.scene);    
            })
        }  
            
        scene.add(groupPromote);

    // light
        // Ambiant
        const light = new THREE.AmbientLight( 0x404040,15); // soft white light
        scene.add( light );

        // Point
        const pointLight = new THREE.PointLight('#FFFFFF', 1, 100);
        pointLight.position.set(0,0,0);
        scene.add( pointLight );

    //GUI
    //  const gui = new GUI();
    // gui.add(light, 'intensity').min(0).max(20).step(0.1);
    // gui.add(pointLight, 'intensity').min(0).max(100).step(0.1);
    // gui.add(pointLight, 'distance').min(0).max(100).step(0.1);
    // gui.add(pointLight, 'decay').min(0).max(100).step(0.1);
    // mouse
    const cursor = {
    x : 0,
    y : 0
    }

    window.addEventListener('mousemove', (event) => 
    {
        cursor.x = event.clientX / sizes.width - 0.5;
        cursor.y = event.clientY / sizes.height - 0.5;
    })

    // Camera
    const sizes = {
        width: window.innerWidth,
        height: 800
    }

    window.addEventListener('resize', () => {
        // Update sizes
        sizes.width =  window.innerWidth;
        sizes.height = 800;

        // Update Camera
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        // Update renderer
        renderer.setSize(sizes.width, sizes.height);
    })

    const camera = new THREE.PerspectiveCamera(75,sizes.width / sizes.height);
    camera.position.z = 3;
    camera.position.y = 1;
    camera.rotation.x = -0.5;
    scene.add(camera);

    // Render
    const canvas = document.querySelector('.webgl');
    const renderer = new THREE.WebGLRenderer({
        canvas
    });
    renderer.setSize(sizes.width, sizes.height)
    renderer.render(scene, camera);

    // Update    
    const clock = new THREE.Clock();

    const tick = () => {
        const elapsedTime = clock.getElapsedTime();

        // Update rotation group
        groupInstrument.rotation.y = elapsedTime * 0.05;
        
        // Update controls
        for (let i=0;i<controls.length;i++){
            controls[i].update();
        }
        renderer.render(scene, camera);
        window.requestAnimationFrame(tick);
    }
    tick();
    })


    return(
       <canvas className='webgl'/>
    )
}