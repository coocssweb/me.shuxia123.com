import '@scss/home.scss';
import App from '@app';
import * as Snap from 'snapsvg';

interface SnapPoint {
    x: number,
    y: number,
    alpha: number 
};

new App({
    data: {
    },
    watchs: {
    },
    bindEvents () {
        const map = Snap('.animationSvg');
        const spaceship = map.select('#plane');
     
        const flightPath = 'M339.233,312.53c-37.779,16.943-119.567-21.598-134.165-71.924c-19.086-65.802,19.072-124.856,64.665-145.753s157.388-22.525,219.128,74.23s-20.242,229.959-114.73,240.688   c-88.678,10.069-230.255-62.044-230.25-163.305';
        const pathLength  = Snap.path.getTotalLength(flightPath);
        document.querySelector('.btn-start').addEventListener('click', () => {   
            spaceship.transform('translate(0, 0) rotate(0, 0, 0)');
            const spaceshipBBox = spaceship.getBBox();
            Snap.animate(0, pathLength, function(step) {
                let moveToPoint = <SnapPoint>Snap.path.getPointAtLength(flightPath, step );
                let x = moveToPoint.x - (spaceshipBBox.width/2);
                let y = moveToPoint.y - (spaceshipBBox.height/2);
                console.log('translate(' + x + ',' + y + ') rotate('+ (moveToPoint.alpha - 90)+', '+spaceshipBBox.cx+', '+spaceshipBBox.cy+')');
                spaceship.transform('translate(' + x + ',' + y + ') rotate('+ (moveToPoint.alpha - 90)+', '+spaceshipBBox.cx+', '+spaceshipBBox.cy+')');
        
            },5000, mina.easeout ,function(){
                
            });
        }, false);
    },
    renderCircle () {
        const circumference = 2 * Math.PI * 95;
        const $circle = <HTMLElement>document.querySelector('.circle-percent');
        const $circleText = <HTMLElement>document.querySelector('.circle-text');
        $circle.setAttribute('stroke-dasharray', `${circumference}`);
        let percent = 20;
        const setPercent = (percent) => {
            const circumferencePercent = percent * circumference / 100;
            $circle.setAttribute('stroke-dashoffset', `${circumference - circumferencePercent}`);
            $circleText.innerHTML = `${percent}%`;
        };
        
        setPercent(percent);
        $circle.style.strokeOpacity = '1';
        document.querySelector('.btn-decrease').addEventListener('click', () => {
            percent = percent - 5 <= 0 ? 0 : percent - 5;
            setPercent(percent);
        }, false);
        document.querySelector('.btn-increase').addEventListener('click', () => {
            percent = percent + 5 >= 100 ? 100 : percent + 5;
            setPercent(percent);
        }, false);
    },
    init () {
        this.renderCircle();
    }
});
