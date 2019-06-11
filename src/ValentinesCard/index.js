import React, { useLayoutEffect, useRef, useState } from 'react';
import './styles.css';
import resistor from './resistor.png';
import useMousePosition from '../util/useMousePosition';

const Resistor = (props) => {
    return (
        <img {...props} alt="A resistor" className="resistor" src={resistor} />
    );
}

const FloatingResistor = () => {
    const position = useMousePosition();
    const style = {
        transform: `translate(${position.x}px, ${position.y}px)`
    };
    return <Resistor style={style} />;
}

export default () => {
    const resistorHoleEl = useRef(null);
    const [pulsing, setPulsing] = useState(false);
    const position = useMousePosition();
    useLayoutEffect(() => {
        if (resistorHoleEl.current) {
            const resistorRect = resistorHoleEl.current.getBoundingClientRect();
            if (position.x > resistorRect.left && position.x < resistorRect.right
                && position.y > resistorRect.top && position.y < resistorRect.bottom) {
                setPulsing(true);
            }
        }
    }, [position]);
    return (
        <>
            {!pulsing && <FloatingResistor /> }
            <div className="app__background">
                <div className="card card--valentines">
                    <h1 className={`card-title${pulsing ? ' card-title--pulsing' : ''}`}>Only you know how to solder my heart</h1>
                    <div className={`heart${pulsing ? ' heart--pulsing' : ''}`}>
                        {pulsing && <p className="heart__text">Happy Valentine's Day<br />Love, Dan</p>}
                    </div>
                    <div ref={resistorHoleEl} className="resistor-hole">
                        {pulsing && (
                            <div className="resistor-hole__clipper">
                                <Resistor style={{left: '-42%'}} />
                            </div>
                        )}
                        <p className="resistor-hole__label">R1</p>
                        <div className="resistor-hole__pad" style={{top: "37%", left: "5px"}}></div>
                        <div className="resistor-hole__pad" style={{top: "37%", right: "5px"}}></div>
                    </div>
                </div>
            </div>
        </>
    );
}