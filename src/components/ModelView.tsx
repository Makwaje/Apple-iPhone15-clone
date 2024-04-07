"use client";
import * as THREE from "three";
import React, { Suspense } from "react";
import { type StaticImageData } from "next/image";
import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import Lights from "./Lights";
import Loader from "./Loader";
import IPhone from "@./components/IPhone";

type ModelViewProps = {
  index: number;
  groupRef: React.MutableRefObject<THREE.Group<THREE.Object3DEventMap>>;
  gsapType: any;
  controlRef: any;
  setRotationState: React.Dispatch<React.SetStateAction<number>>;

  item: {
    title: string;
    color: string[];
    img: StaticImageData;
  };

  size: string;
};

function ModelView({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  item,
  size,
}: ModelViewProps) {
  return (
    <View
      index={index}
      id={gsapType}
      className={`absolute h-full w-full ${index === 2 ? "right-[-100%]" : ""}`}
    >
      {/* Ambient Light */}
      <ambientLight intensity={0.3} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />

      <OrbitControls
        makeDefault={true}
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />

      <group
        ref={groupRef}
        name={`${index === 1} ? 'small' : 'large`}
        position={[0, 0, 0]}
      >
        <Suspense fallback={<Loader />}>
          <IPhone
            scale={index === 1 ? [11, 11, 11] : [13, 13, 13]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
}

export default ModelView;
