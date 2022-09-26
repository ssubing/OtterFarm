import React, { Component, ReactNode } from 'react';
import Sprite from '../base/Sprite';
import VectorUtils from '../base/VectorUtils';
import './Player.css';
import PlayerBullet from './PlayerBullet';
import Stage from '../base/Stage';
import App from '../App';
import Explosion from './Explosion';
import { GameGlobals } from '../helpers/GameGlobals';

class Player extends Component {

    public state = {
        active: true,
        position: { x:0, y:0 },
        dimensions: { width:30, height:30 },
        velocity: { x:0, y:0 },
        maxSpeed: 30,
        turnDirection: "player-no-turn",
    };

    public componentDidMount() {
        this.setState({
            position: {
                x: GameGlobals.Stage.state.gameProperties.width / 2,
                y: GameGlobals.Stage.state.gameProperties.height - 50
            }
        });
    }

    public update(gameState: any) {

        if (gameState.input.fireDown) {
            this.move(gameState);
        }

        this.animate(gameState);
        this.shoot(gameState);
    }

    public shoot(gameState: any) {
        if (gameState.frameCount % 15 == 0) {
            GameGlobals.Stage.addSprite(<PlayerBullet name="Shoot" position={{ x: this.state.position.x, y: this.state.position.y - 15 }}></PlayerBullet>);
        }
    }
    
    /**@todo animate 작성해야 함 */
    public animate(gameState: any) {
        
    }

    /**@todo move 작성해야 함 */
    public move(gameState: any) {

    }

    restart(){

    }

    public collidesWith(sprite: any) {

    }

    constructor(public props: any) {
        super(props);

    }

    render() {

    }
}


export default Player;