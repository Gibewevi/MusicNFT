import * as THREE from 'three';
import { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

console.log (OrbitControls);

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
        const promote = [];
        const promote_number = 5;
        const angle = ((2*Math.PI)/promote_number);
        const dh = 1.9;
        const axeY = 1;

        for(let i=0;i<=promote_number;i++){

            gltfLoader.load('/models/promote/promote.gltf',(gltf) => 
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
            // controls.push(control);
            groupPromote.add(gltf.scene);    
            })
        }

        // let Geometry = new THREE.PlaneGeometry(1,1,1);
        // let Material = new THREE.MeshBasicMaterial( { color: "#EA41EA" }); 
        // const planes = [];
        // const planes_number = 4;
        // const angle = ((2*Math.PI)/planes_number);
        // const dh = 2;
        // const axeY = 1;
        // // Plane promote creation
        // for (let i=0;i<=planes_number;i++){
        //     let plane = new THREE.Mesh(Geometry, Material);
        //     // Axe Z
        //     plane.position.y = groupInstrument.position.y + axeY ;
        //     // Axe X
        //     plane.position.x = groupInstrument.position.x + dh * Math.sin(i*angle);
        //     // Axe Y
        //     plane.position.z = groupInstrument.position.z + dh * Math.cos(i*angle);
        //     // Double side
        //     plane.material.side = THREE.DoubleSide;
        //     planes.push(plane);
        //     groupPromote.add(plane);
        //     console.log("i "+i);
        //     console.log("planes numbers "+planes.length);
        // }

        scene.add(groupPromote);

        // light
        const light = new THREE.AmbientLight( 0x404040,5); // soft white light
        light.position.x = 5;
        scene.add( light );

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
        width: 800,
        height: 600
    }
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

    // const controls = [];
    // const CONTROLS_MIN_MAX = (Math.PI/2)-0.32;
    // for (let i=0;i<=planes_number;i++){
    //       let control = new OrbitControls(planes[i], canvas);
    //       control.enableDamping = true;
    //       control.minPolarAngle = CONTROLS_MIN_MAX;
    //       control.maxPolarAngle = CONTROLS_MIN_MAX;
    //       control.rotateSpeed *= -0.2;
    //       controls.push(control);
    // }

    // Update    
    const clock = new THREE.Clock();

    const tick = () => {
        const elapsedTime = clock.getElapsedTime();

        // Update rotation group
        groupInstrument.rotation.y = elapsedTime * 0.05;
        
        // Update controls
        // for (let i=0;i<=planes_number;i++){
        //     controls[i].update();
        // }

        renderer.render(scene, camera);
        window.requestAnimationFrame(tick);
    }
    tick();
    })


    return(
       <canvas className='webgl'/>
    )
}