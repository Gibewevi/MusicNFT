import * as THREE from 'three';
import { useEffect } from 'react';
export default function Scene(){

    useEffect( () => {

    // Scene
    const scene = new THREE.Scene();
    const group = new THREE.Group();
    const promote = new THREE.Group();

    // Object
        // Cube
        const cubeGeometry = new THREE.BoxGeometry(1,1,1);
        const cubeMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000 });
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        group.add(cube);

        // Sol
        const circleGeometry = new THREE.CircleGeometry(5,32);
        const circleMaterial = new THREE.MeshBasicMaterial( {color: "#24B8FE" });
        const circle = new THREE.Mesh( circleGeometry, circleMaterial);
        circle.material.side = THREE.DoubleSide;
        circle.scale.set(0.25,0.25,0.25)
        circle.rotation.x = (1.57);
        circle.position.y = -0.5
        group.add(circle);
        group.rotation.y = 0.6;
        scene.add(group);


        function getCenterPoint(mesh) {
            var geometry = mesh.geometry;
            geometry.computeBoundingBox();
            var center = new THREE.Vector3();
            geometry.boundingBox.getCenter( center );
            mesh.localToWorld( center );
            return center;
        }

    // Promote
    let i = 0;
    const angle = 2.4;
        let planeGeometry = new THREE.PlaneGeometry(1,1,1);
        let planeMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 });
        let plane = new THREE.Mesh( planeGeometry, planeMaterial);
        plane.position.x = group.position.x ;
        plane.position.y = group.position.y +0.5;
        plane.rotation.y = 2;
        plane.material.side = THREE.DoubleSide;


        
    scene.add(plane);

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

    // Update    
    const clock = new THREE.Clock();

    const tick = () => {
        const elapsedTime = clock.getElapsedTime();

        // Update rotation group
        group.rotation.y = elapsedTime * 0.05;
        plane.position.z = (Math.cos(elapsedTime) *2);
        plane.position.x = (Math.sin(elapsedTime) *2);
        plane.lookAt(0,0,0)
        
        renderer.render(scene, camera);
        window.requestAnimationFrame(tick);
    }
    tick();
    })


    return(
       <canvas className='webgl'/>
    )
}