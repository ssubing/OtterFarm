import image1 from "../../assets/images/falling-item1.png";
import image2 from "../../assets/images/falling-item2.png";
import image3 from "../../assets/images/falling-item3.png";
// 떨어지는 아이템 타입
export const TYPES = [image1, image2, image3];
// size vales for dots to pick from list
export const SIZES = [50, 55, 60, 65, 70];
// step to control speed px/sec
export const SPEED_STEP = 10;
// Max value of points - each dot will cost MAX - size points
export const MAX_POINTS = 50;
// Interval to spawn a new dot
export const SPAWN_INTERVAL = 1000;
