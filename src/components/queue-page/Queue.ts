interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    peak: () => T | null;
    getElements: () => T[];
    getHead: () => number;
    getTail: () => number;
    getTailIndex: () => number;
    clear: () => void;
    isEmpty: () => void;
    isFull: () => void;
}

class Queue<T> implements IQueue<T> {
    private container: T[] = [];
    private head: number = 0;
    private tail: number = 0;
    private tailIndex: number = 0;
    private readonly size: number = 0;
    private length: number = 0;

    constructor(size: number) {
        this.size = size;
        this.container = Array(size).fill("");
    }

    enqueue = (item: T): void => {
        if (this.length >= this.size) {
            throw new Error("Maximum length exceeded");
        } else {
            this.tailIndex = this.tail;
            this.container[this.tail] = item;
            this.tail = (this.tail + 1) % this.size;
            this.length++;
        }
    };

    dequeue = (): void => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        } else {
            delete this.container[this.head];
            this.head = (this.head + 1) % this.size;
            this.length--;
        }
    };

    peak = (): T | null => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }
        if (!this.isEmpty()) {
            return this.container[this.head % this.size];
        } else {
            return null;
        }
    };

    isEmpty = (): boolean => this.length === 0;

    isFull = (): boolean => this.length === this.size;

    getElements = () => this.container;

    getHead = (): number => this.head;

    getTail = (): number => this.tail;

    getTailIndex = (): number => this.tailIndex;

    clear = (): void => {
        this.container = Array(this.size).fill("");
        this.length = 0;
        this.head = 0;
        this.tail = 0;
        this.tailIndex = 0;
    };
}

export const queue: Queue<string> = new Queue<string>(7);
