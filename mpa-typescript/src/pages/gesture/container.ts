
import Element from './element';
import { DOMNode } from './interface';
interface ContainerOptions {
    capacity: number
};

export default class Container {
    static readonly defaultOptions: ContainerOptions = {
        capacity: 5
    };
    private options: ContainerOptions;
    private $container: DOMNode;
    private elements: Array<Element> = [];
    constructor ($container: DOMNode, options: ContainerOptions) {
        this.$container = $container;
        this.options = Object.assign(Container.defaultOptions, options);
    }

    public add (src) {
        if (this.elements.length < 5) {
            const element = new Element(this.$container, src);
            element.setContainer(this);
            this.elements.push(element);
        }
    }

    public removeItem (element) {
        for (let index = 0; index < this.elements.length; index ++) {
            if (element === this.elements[index]) {
                this.elements.splice(index, 1);
                break;
            }
        }
    }

    public clear () {
        this.elements.forEach((item, index) => {
            item.remove();
        });

        this.elements = [];
    }
}