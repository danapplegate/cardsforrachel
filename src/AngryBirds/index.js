import React, { Component } from 'react';
import Phaser from 'phaser';

import bg from './assets/bg.png';
import bird from './assets/bird.png';
import enemy from './assets/enemy.png';
import ground from './assets/ground.png';
import platform from './assets/platform.png';
import sling1 from './assets/sling1.png';
import sling2 from './assets/sling2.png';
import sling3 from './assets/sling3.png';
import refresh from './assets/menu_refresh.png';
import wood1 from './assets/wood1.png';
import wood2 from './assets/wood2.png';

const BIRD_START_PARAMS = {
    x: 100,
    y: 150,
    velocityX: 100,
    velocityY: 0,
    bounce: 0.5,
    drag: 70
};

const WOOD_POSITIONS = {
    plank: [{
        x: 650,
        y: 320,
        rotate: -75
    }, {
        x: 850,
        y: 320,
        rotate: 75
    }],
    box: [{
        x: 650,
        y: 500,
    }, {
        x: 850,
        y: 500
    }, {
        x: 650,
        y: 400
    }, {
        x: 850,
        y: 400
    }]
};

export default class AngryBirds extends Component {
    
    constructor(props) {
        super(props);

        this.game = null;
        this.bird = null;
    }

    create() {
        this.add.image(0, 0, 'bg').setOrigin(0, 0);

        const platforms = this.physics.add.staticGroup();
        platforms.create(480, 580, 'ground').setScale(2).refreshBody();
        platforms.create(125, 500, 'platform').setScale(1.5).refreshBody();

        this.add.image(220, 255, 'sling1');

        const bird = this.physics.add.image(BIRD_START_PARAMS.x, BIRD_START_PARAMS.y, 'bird');

        this.add.image(194, 209, 'sling2');

        const boxes = this.physics.add.group({
            allowRotation: true,
            classType: Phaser.GameObjects.Image,
            dragX: 70,
            mass: 2
        });

        const refreshBoxes = () => {
            boxes.clear(true, true);
            WOOD_POSITIONS.box.forEach(config => {
                boxes.create(config.x, config.y, 'wood1');
            });
            WOOD_POSITIONS.plank.forEach(config => {
                boxes.create(config.x, config.y, 'wood2').setAngle(config.rotate);
            })
        };

        const refreshObjects = () => {
            bird.x = BIRD_START_PARAMS.x;
            bird.y = BIRD_START_PARAMS.y;
            bird.setRotation(0);
            bird.setAngularVelocity(0);
            bird.setVelocity(BIRD_START_PARAMS.velocityX, BIRD_START_PARAMS.velocityY);
            bird.setBounce(BIRD_START_PARAMS.bounce, BIRD_START_PARAMS.bounce);
            bird.setDrag(BIRD_START_PARAMS.drag);
            refreshBoxes();
        };

        refreshObjects();

        this.physics.add.collider(platforms, boxes);
        this.physics.add.collider(boxes, boxes);
        this.physics.add.collider(bird, boxes);

        this.physics.add.collider(bird, platforms, (bird) => {
            bird.setAngularVelocity(bird.body.velocity.x);
        });

        const refresh = this.add.image(40, 40, 'refresh');
        refresh.on('pointerdown', refreshObjects)
        refresh.setInteractive();
    }

    preload() {
        this.load.image('bg', bg);
        this.load.image('bird', bird);
        this.load.image('enemy', enemy);
        this.load.image('ground', ground);
        this.load.image('platform', platform);
        this.load.image('sling1', sling1);
        this.load.image('sling2', sling2);
        this.load.image('sling3', sling3);
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
                default: 'arcade',
                arcade: {
                    debug: true,
                    gravity: { y: 600 }
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
        return <div id="phaser-target"></div>
    }
}