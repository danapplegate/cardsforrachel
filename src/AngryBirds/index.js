import React, { Component } from 'react';
import Phaser from 'phaser';

import sky from './assets/bg.png';
import pig from './assets/enemy.png';

export default class AngryBirds extends Component {
    
    constructor(props) {
        super(props);

        this.game = null;
    }

    create() {
        this.add.image(400, 300, 'sky');
        this.add.image(400, 300, 'pig');

        // var logo = this.physics.add.image(400, 100, 'bird');
        // logo.setVelocity(100, 200);
        // logo.setBounce(1, 1);
        // logo.setCollideWorldBounds(true);
    }

    preload() {
        this.load.image('sky', sky);
        this.load.image('pig', pig);
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