import * as THREE from "node_modules/three/build/three.module.js";
import {EffectComposer} from "node_modules/three/examples/jsm/postprocessing/EffectComposer.js";
import {RenderPass} from "node_modules/three/examples/jsm/postprocessing/RenderPass.js";
import {UnrealBloomPass} from "node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js";


let postProcessing = (renderer, scene, camera)=>{
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.2, 0, 0);

    composer.addPass(renderPass);
    composer.addPass(bloomPass);

    return composer;
}

export {postProcessing};