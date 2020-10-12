import React from 'react';
// import { useSpring, animated } from 'react-spring'


const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
const trans = (x, y, s) => `scale(${s})`

function Upper({children}) {
    // const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 1, tension: 500, friction: 48 } }))
    // return (
    //     <animated.div
    //         onMouseMove={({clientX: x, clientY: y}) => set({xys: calc(x, y)})}
    //         onMouseLeave={() => set({xys: [0, 0, 1]})}
    //         style={{
    //             transform: props.xys.interpolate(trans),
    //             backfaceVisibility: "hidden",
    //
    //         }}>
    //         {children}
    //     </animated.div>
    // )
    return children
}


export default Upper;
