import * as THREE from "./node_modules/three/build/three.module.js";
import {OrbitControls} from "./node_modules/three/examples/jsm/controls/OrbitControls.js";
import gsap from "./node_modules/gsap/gsap-core.js"

// import * from "./node_modules/three/examples/fonts/helvetiker_bold.typeface.json"
import * as pp from "./post-processing.js";

let scene, camera, renderer;

let light1;

let controller;

let composer;

let canvas = ()=>{
    initRenderer();

    addAmbientLight();
    addTextMesh1();
    addTextMesh2();
    addPlane1();
    addPlane2();
    addDodecahedron();
    addIcosahedron();
    addCrystal();
    addTorus();

    addPostProcessing();

    createController();

    

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    // scene.add(mesh);
}

let render = ()=>{
    // renderer.render(scene, camera);
    composer.render();
    controller.update();
    requestAnimationFrame(render);
}

addEventListener('resize', ()=>{
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
})

let initRenderer = ()=>{
    scene = new THREE.Scene();

    let fov = 45;
    let aspect = window.innerWidth/window.innerHeight;
    let near = 0.1;
    let far = 10000;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 13);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

let addAmbientLight = ()=>{
    light1 = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light1);
}

let addTextMesh1 = ()=>{
    const fontLoader = new THREE.FontLoader();
    fontLoader.load('./node_modules/three/examples/fonts/helvetiker_bold.typeface.json', font =>{
        const geometry = new THREE.TextGeometry('LOADING',{
            font: font,
            size: 1.8,
            height: 1,
            curveSegments: 2,
            
        })
        geometry.center();

        const material = new THREE.MeshBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 0.8,
        });
        const mesh = new THREE.Mesh(geometry, material);

        let param = {
            color: 0x77F1FF,
            linewidth: 10,
        }

        const meshEdge = toEdge(geometry, param);
        mesh.add(meshEdge);
        scene.add(mesh);
        
        animation2(mesh);
    });
}

let addTextMesh2 = ()=>{
    const fontLoader = new THREE.FontLoader();
    fontLoader.load('./node_modules/three/examples/fonts/helvetiker_bold.typeface.json', font =>{
        const geometry = new THREE.TextGeometry('- PRESS START -',{
            font: font,
            size: 0.2,
            height: 20,
            curveSegments: 2,
            
        })
        geometry.center();

        const material = new THREE.MeshBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 1,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, -2, -15);

        let param = {
            color: 0xA95A9C,
            linewidth: 10,
        }

        const meshEdge = toEdge(geometry, param);
        mesh.add(meshEdge);
        scene.add(mesh);
        
        animation4(mesh);
    });
}

let addPlane1 = ()=>{
    const geometry = new THREE.PlaneGeometry(30, 30, 10, 10);
    const material = new THREE.MeshStandardMaterial({
        color: 0x7923AC,
        wireframe: true,
    })
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    mesh.rotation.y = Math.PI/2;
    mesh.position.set(-8, 0, 0);

    animation3(mesh);
}

let addPlane2 = ()=>{
    const geometry = new THREE.PlaneGeometry(30, 30, 10, 10);
    const material = new THREE.MeshStandardMaterial({
        color: 0x7923AC,
        wireframe: true,
    })
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    mesh.rotation.y = Math.PI/2;
    mesh.position.set(8, 0, 0);

    animation3(mesh);
}

let addDodecahedron = ()=>{
    const geometry = new THREE.DodecahedronGeometry(1, 0);

    const material = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.9,
    });
    const mesh = new THREE.Mesh(geometry, material);

    let param = {
        color: 0xff0000,
        linewidth: 10,
    }
    const meshEdge = toEdge(geometry, param);
    mesh.add(meshEdge);
    scene.add(mesh);

    mesh.position.set(-4, 3, -3)

    animation1(mesh);
}

let addIcosahedron = ()=>{
    const geometry = new THREE.IcosahedronGeometry(1, 0);

    const material = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.9,
    });
    const mesh = new THREE.Mesh(geometry, material);

    let param = {
        color: 0xff0000,
        linewidth: 10,
    }
    const meshEdge = toEdge(geometry, param);
    mesh.add(meshEdge);

    scene.add(mesh);

    mesh.position.set(3, 2, -3)

    animation1(mesh);
}

let addCrystal = ()=>{
    const geometry = new THREE.SphereGeometry(1, 4, 2);
    const material = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.9,
    });
    const mesh = new THREE.Mesh(geometry, material);

    let param = {
        color: 0xff0000,
        linewidth: 10,
    }
    const meshEdge = toEdge(geometry, param);
    mesh.add(meshEdge);
    scene.add(mesh);

    mesh.position.set(-6, -1, 2);

    animation1(mesh);
}

let addTorus = ()=>{
    const geometry = new THREE.TorusGeometry(1, 0.3, 5, 6);
    const material = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.9,
    });
    const mesh = new THREE.Mesh(geometry, material);

    let param = {
        color: 0xff0000,
        linewidth: 10,
    }
    const meshEdge = toEdge(geometry, param);
    mesh.add(meshEdge);
    scene.add(mesh);

    mesh.position.set(5, 2.3, 2)

    animation1(mesh);
}

let toEdge = (geometry, param)=>{
    let edgegeo = new THREE.EdgesGeometry(geometry);
    let material = new THREE.LineBasicMaterial({
        color: param.color,
        linewidth: param.linewidth,
    })
    return new THREE.LineSegments(edgegeo, material);
}

let animation1 = (mesh)=>{
    let tl = gsap.timeline({repeat:-1})
    tl.to(mesh.rotation, {x: Math.PI*2, duration: 5, ease: "none"});
}

let animation2 = (mesh)=>{
    let tl1 = gsap.timeline({repeat:-1});
    tl1.to(mesh.rotation, {y: -Math.PI/10, duration: 0, ease: "none"})
        .to(mesh.rotation, {y: Math.PI/10, duration: 2, ease:"power1.inOut"})
        .to(mesh.rotation, {y: -Math.PI/10, duration: 2, ease:"power1.inOut"});

    let tl2 = gsap.timeline({repeat:-1});
    tl2.to(mesh.rotation, {z: -Math.PI/30, duration: 0, ease: "none"})
        .to(mesh.rotation, {z: Math.PI/30, duration: 0.7, ease:"power1.inOut"})
        .to(mesh.rotation, {z: -Math.PI/30, duration: 0.7, ease:"power1.inOut"});
}

let animation3 = (mesh)=>{
    let tl = gsap.timeline({repeat:-1});
    tl.to(mesh.position, {y: 3, duration: 5, ease: "none"});
}

let animation4 = (mesh)=>{
    // console.log(mesh.scale);
    // mesh.geometry.lookAt(0, 0, 1);
    let tl1 = gsap.timeline({repeat:-1, repeatDelay: 0.5});
    tl1.to(mesh.scale, {z: 0, duration: 0, ease: "none"})
        .to(mesh.scale, {z: 1, duration: 2, ease: "power2.out"})
        .to(mesh.scale, {z: 0, duration: 2, ease: "power2.out"});

    let tl2 = gsap.timeline({repeat:-1, repeatDelay: 0.5});
    tl2.to(mesh.position, {z: mesh.position.z+mesh.geometry.parameters.parameters.height/2, duration: 2, ease: "power2.out"})
    .to(mesh.position, {z: mesh.position.z+mesh.geometry.parameters.parameters.height, duration: 2, ease: "power2.out"});
}

let createController = ()=>{
    controller = new OrbitControls(camera, renderer.domElement);
}

let addPostProcessing = ()=>{
    composer = pp.postProcessing(renderer, scene, camera);
}

canvas();
render();

export {renderer};