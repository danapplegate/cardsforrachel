import React, { Component, createRef } from 'react';
import Phaser from 'phaser';
import { Link } from 'react-router-dom';

import './styles.css';
import bg from './assets/bg.png';
import dino from './assets/dino.png';
import enemy from './assets/enemy.png';
import ground from './assets/ground.png';
import platform from './assets/platform.png';
import sling1 from './assets/sling1.png';
import sling2 from './assets/sling2.png';
import refresh from './assets/menu_refresh.png';
import wood1 from './assets/wood1.png';
import wood2 from './assets/wood2.png';

const DINO_VELOCITY_SCALE = 0.2;
const DINO_START = {
    x: 220,
    y: 170
};
const ENEMY_START = {
    x: 750,
    y: 550
};
const END_SCREEN_DELAY = 2500;

const WOOD_POSITIONS = {
    plank: [{
        x: 650,
        y: 390,
        rotate: 90
    }, {
        x: 850,
        y: 390,
        rotate: 90
    }],
    box: [{
        x: 650,
        y: 500,
    }, {
        x: 850,
        y: 500
    }, {
        x: 650,
        y: 300
    }, {
        x: 850,
        y: 300
    }]
};

export default class AngryDinos extends Component {

    constructor(props) {
        super(props);

        this.game = null;
        this.loadingText = createRef();
    }


    create() {

        let endText;

        const endScreen = () => {
            endText = this.add.text(480, 300, 'Happy Dinoversary!', {
                fontFamily: '"Luckiest Guy"',
                fontSize: '60px',
                color: 'purple',
                stroke: 'white',
                strokeThickness: 5,
                shadowFill: true,
                shadowBlur: 15
            }).setOrigin(0.5, 0.5);
        }

        this.add.image(0, 0, 'bg').setOrigin(0, 0);

        this.matter.add.image(480, 580, 'ground', null, { isStatic: true }).setScale(2);
        this.matter.add.image(125, 500, 'platform', null, { isStatic: true }).setScale(1.5);

        this.add.image(220, 255, 'sling1');

        const dino = this.matter.add.image(DINO_START.x, DINO_START.y, 'dino', null, { isStatic: true });
        dino.setCircle(dino.width / 2, { restitution: 0.5, friction: .5 });
        dino.setInteractive({ draggable: true });
        this.matter.add.pointerConstraint({
            pointA: {
                x: DINO_START.x,
                y: DINO_START.y
            },
            bodyB: dino.body,
            label: 'slingshot',
            stiffness: 0.5
        });

        // const slingshotConstraint = this.matter.add.worldConstraint(dino, 0, 0.1, {
        //     pointA: { x: DINO_START_PARAMS.x, y: DINO_START_PARAMS.y },
        //     render: {
        //         visible: true,
        //         lineWidth: 10,
        //         strokeStyle: 'brown',
        //         type: 'line'
        //     }
        // });

        let speedX, speedY;

        dino.on('pointermove', pointer => {
            if (pointer.leftButtonDown()) {
                speedX = pointer.downX - pointer.position.x;
                speedY = pointer.downY - pointer.position.y;
            }
        });

        dino.on('pointerup', () => {
            dino.setVelocity(DINO_VELOCITY_SCALE * speedX, DINO_VELOCITY_SCALE * speedY);
            dino.setIgnoreGravity(false);
            speedX = speedY = 0;
            setTimeout(() => {
                endScreen(this.scene);
            }, END_SCREEN_DELAY);
        });

        this.add.image(194, 209, 'sling2');

        let boxes = [];

        const refreshBoxes = () => {
            boxes.forEach(box => {
                box.destroy();
            });
            boxes = [];
            WOOD_POSITIONS.box.forEach(config => {
                boxes.push(this.matter.add.image(config.x, config.y, 'wood1'));
            });
            WOOD_POSITIONS.plank.forEach(config => {
                boxes.push(this.matter.add.image(config.x, config.y, 'wood2')
                    .setScale(0.75)
                    .setAngle(config.rotate));
            })
        };

        const enemy = this.matter.add.image(ENEMY_START.x, ENEMY_START.y, 'enemy');
        enemy.setCircle(enemy.width / 2, { restitution: 0.5, friction: 0.5 });

        const refreshObjects = () => {
            dino.x = DINO_START.x;
            dino.y = DINO_START.y;
            dino.setRotation(0);
            dino.setVelocity(0);
            dino.setAngularVelocity(0);
            dino.setIgnoreGravity(true);
            enemy.x = ENEMY_START.x;
            enemy.y = ENEMY_START.y;
            enemy.setRotation(0);
            enemy.setVelocity(0)
            enemy.setAngularVelocity(0);
            if (endText) {
                endText.destroy();
            }
            refreshBoxes();
        };

        refreshObjects();

        const refresh = this.add.image(40, 40, 'refresh');
        refresh.on('pointerdown', refreshObjects)
        refresh.setInteractive();
    }

    preload() {
        this.add.text(480, 300, 'Loading...', {
            fontFamily: '"Luckiest Guy"'
        }).setOrigin(0.5, 0.5);
        this.load.image('bg', bg);
        this.load.image('dino', dino);
        this.load.image('enemy', enemy);
        this.load.image('ground', ground);
        this.load.image('platform', platform);
        this.load.image('sling1', sling1);
        this.load.image('sling2', sling2);
        this.load.image('refresh', refresh);
        this.load.image('wood1', wood1);
        this.load.image('wood2', wood2);
    }

    componentDidMount() {
        const config = {
            type: Phaser.AUTO,
            width: 960,
            height: 600,
            parent: 'phaser-target',
            physics: {
                default: 'matter',
                matter: {
                    gravity: { y: 1 }
                }
            },
            scene: {
                preload: this.preload,
                create: this.create
            }
        };

        this.game = new Phaser.Game(config);
    }

    render() {
        return (
            <div className="app__dino">
                <div id="phaser-target">
                    <p className="loading-text"></p>
                </div>
                <Link to="/valentines-day-2019" className="nav-link">Valentine's Day</Link>
            </div>
        );
    }
}