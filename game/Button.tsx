import React, { useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber"; 
import * as THREE from 'three';
import { Box } from "@react-three/drei";
import { TextureLoader } from "three"; // Обновленный импорт
import { computePosition, offset, arrow } from "@floating-ui/dom";
import { UpHair, UpC, UpS, UpWar, UpM } from "./upgrade";

function Creep({ onClick, hair }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const textureMap = useLoader(TextureLoader, UpHair.textures[hair]);

    // Вращаем `mesh` вокруг оси `z` на 0.003 единицы 60 раз в секунду
    useFrame(() => {
        if (meshRef.current) { // Проверка на null
            meshRef.current.rotation.z += 0.003;
            meshRef.current.rotation.y += 0.003;
            meshRef.current.rotation.x += 0.003;
        }
    });

    return (
        <group rotation={[-Math.PI / 2, 0, 0]} scale={6}> 
            <Box ref={meshRef} args={[1, 1, 1]} position={[0, 0, 0]} onClick={onClick}>
                <meshStandardMaterial map={textureMap} />
            </Box>
        </group>
    );
}

export default function Button({ coin, setCoin, hair, crep, sword, warrior, mine }) {
    const floatingRef = useRef<HTMLDivElement | null>(null); // Явно задаем тип
    const referenceRef = useRef<HTMLDivElement | null>(null); // Явно задаем тип
    const arrowEl = useRef<HTMLDivElement | null>(null); // Явно задаем тип

    useEffect(() => {
        const updatePosition = async () => {
            if (referenceRef.current && floatingRef.current && arrowEl.current) {
                const { x, y, middlewareData } = await computePosition(referenceRef.current, floatingRef.current, {
                    placement: "top",
                    middleware: [offset(10), arrow({ element: arrowEl.current })]
                });

                Object.assign(floatingRef.current.style, {
                    top: `${y}px`,
                    left: `${x}px`
                });

                if (middlewareData.arrow) {
                    const { x } = middlewareData.arrow;

                    Object.assign(arrowEl.current.style, {
                        left: `${x}px`,
                        bottom: `${-arrowEl.current.offsetHeight / 2}px`
                    });
                }
            }
        };
        updatePosition();

        window.addEventListener('resize', updatePosition);
        return () => window.removeEventListener('resize', updatePosition);
    }, []);

    return (
        <section>
            <div className="center"><h3>Количество крип-монет: ${coin}</h3></div>
            <div id="floating" className="center" ref={floatingRef}>
                Нажми на меня
                <div id="arrow" className="center" ref={arrowEl}></div>
            </div>
            <div id="reference" className="center" ref={referenceRef}>
                <div className="center">
                    <Canvas 
                        camera={{
                            fov: 90,
                            far: 10,
                            aspect: 1,
                            position: [0, 0, 8],
                        }}
                    >
                        <directionalLight position={[1, 1, 1]} intensity={1} />
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} />
                        <Creep onClick={() => setCoin(coin + UpC.coin[crep] + UpS.coin[sword] + UpWar.coin[warrior] + UpM.coin[mine])} hair={hair} />
                    </Canvas>
                </div>
            </div>
        </section>
    );
}
