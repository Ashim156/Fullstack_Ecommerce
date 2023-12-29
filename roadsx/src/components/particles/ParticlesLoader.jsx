import {  useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from "@tsparticles/react";

import { loadSlim } from "@tsparticles/slim";
const ParticlesLoader = () => {
    
    const [ init, setInit ] = useState(false);

    // this should be run only once per application lifetime
    useEffect(() => {
    
        initParticlesEngine(async (engine) => {
   
            await loadSlim(engine);
            
        }).then(() => {
            setInit(true);
        });
    }, []);
    const particlesLoaded = (container) => {
        console.log(container);
    };
    return (
    <Particles
    
    id="tsparticles"
    particlesLoaded={particlesLoaded}
        options={{
            fullScreen: { enable: false },
            background: {
                
                color: {
                    value: ''
                },
                

            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: false,
                        mode: 'push'
                    },
                    onHover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    resize: true,

                },
                modes: {
                    push: {
                        quantity: 200
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4,
                    }
                }
            },
            particles: {
                color: {
                    value: '#000000'
                },
                links: {
                    color: '#000000',
                    distance: 150,
                    enable: true,
                    opacity: 0.5,
                    width: 2
                },
                collisions: {
                    enable: false
                },
                move: {
                    direction: 'none',
                    enable: true,
                    outModes: {
                        default: 'bounce'
                    },
                    random: false,
                    speed: 2,
                    straight: false
                },
                number: {
                    density: {
                        enable: true,
                        area: 800
                    },
                    value:300
                },
                opacity: {
                    value: 0.5,
                },
                shape: {
                    type: 'circle',
                },
                size: {
                    value: { min: 1, max: 3 },
                }
            },
            detectRetina: true,
        }}


    />
    
    )


}

export default ParticlesLoader