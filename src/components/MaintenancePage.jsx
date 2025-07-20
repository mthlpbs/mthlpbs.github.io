import React, { useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';
import * as THREE from 'three';

const MaintenancePage = ({ config }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const animationRef = useRef(null);

  const maintenanceConfig = config?.siteSettings?.maintenanceMode || {};
  const themeConfig = config?.themeConfig?.dark || {};

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create animated geometric shapes
    const geometries = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.SphereGeometry(0.8, 32, 32),
      new THREE.ConeGeometry(0.8, 1.5, 8),
      new THREE.TorusGeometry(0.8, 0.3, 16, 100),
    ];

    const materials = geometries.map(() => 
      new THREE.MeshPhongMaterial({
        color: new THREE.Color(themeConfig.accent || '#007aff'),
        transparent: true,
        opacity: 0.8,
        wireframe: false,
      })
    );

    const meshes = [];
    for (let i = 0; i < 8; i++) {
      const geometry = geometries[i % geometries.length];
      const material = materials[i % materials.length].clone();
      material.color.setHSL((i * 0.125) % 1, 0.7, 0.6);
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );
      
      scene.add(mesh);
      meshes.push(mesh);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(new THREE.Color(themeConfig.accent || '#007aff'), 1, 100);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    camera.position.z = 15;

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      meshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.01 + index * 0.001;
        mesh.rotation.y += 0.01 + index * 0.001;
        mesh.rotation.z += 0.005 + index * 0.0005;
        
        // Floating motion
        mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.02;
        mesh.position.x += Math.cos(Date.now() * 0.0008 + index) * 0.01;
      });

      // Camera gentle movement
      camera.position.x = Math.sin(Date.now() * 0.0005) * 2;
      camera.position.y = Math.cos(Date.now() * 0.0003) * 1;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    sceneRef.current = { scene, camera, renderer, meshes };

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [themeConfig.accent]);

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundColor: themeConfig.primary || '#000000',
        color: themeConfig.text || '#ffffff'
      }}
    >
      {/* Three.js background */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 z-0"
        style={{ pointerEvents: 'none' }}
      />
      
      {/* Content overlay */}
      <div className="text-center max-w-md mx-auto relative z-10">
        <div className="mb-8">
          <div 
            className="text-8xl mb-6 animate-pulse"
            style={{ color: themeConfig.accent || '#007aff' }}
          >
            🔧
          </div>
          <h1 className="text-4xl font-bold mb-4">Under Maintenance</h1>
          <p 
            className="text-lg mb-6"
            style={{ color: themeConfig.textSecondary || '#a3a3a3' }}
          >
            {maintenanceConfig.message || "We're currently performing maintenance. Please check back soon!"}
          </p>
          
          {maintenanceConfig.estimatedTime && (
            <div 
              className="flex items-center justify-center mb-6 p-3 rounded-lg backdrop-blur-sm"
              style={{ 
                backgroundColor: `${themeConfig.secondary || '#1a1a1a'}88`,
                border: `1px solid ${themeConfig.accent || '#007aff'}33`
              }}
            >
              <Clock size={20} className="mr-2" />
              <span>Estimated time: {maintenanceConfig.estimatedTime}</span>
            </div>
          )}
        </div>
        
        <div className="mt-8 text-sm" style={{ color: themeConfig.textSecondary || '#a3a3a3' }}>
          Thank you for your patience!
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
