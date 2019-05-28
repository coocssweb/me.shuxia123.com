
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
        const element = new Element(this.$container.width(), this.$container.height(), src);
        this.$container.append(element.getElement());
        this.elements.push(element);
    }

    public remove ($target:HTMLElement) {

    }

    public clear () {

    }
}