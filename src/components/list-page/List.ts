export type NodeType<T> = {
    val: T;
    next: NodeType<T> | null;
};

interface ILinkedList<T> {
    addToFront: (element: T) => void;
    addToEnd: (element: T) => void;
    addAtIndex: (index: number, val: T) => void;
    deleteAtIndex: (index: number) => void;
    deleteAtFront: () => void;
    deleteAtEnd: () => void;
    getArray: () => NodeType<T>[];
    getSize: () => number;
    getFirst: () => NodeType<T> | null;
    getLast: () => NodeType<T> | null;
    getAtIndex: (index: number) => NodeType<T> | null;
}

class ListNode<T> implements NodeType<T> {
    val: T;
    next: ListNode<T> | null;
    constructor(val: T, next: ListNode<T> | null = null) {
        this.val = val;
        this.next = next;
    }
}

class LinkedList<T> implements ILinkedList<T> {
    private head: ListNode<T> | null;
    private size: number;
    constructor(values: T[] = []) {
        this.head = null;
        this.size = 0;
        let val: T;
        for (val of values) {
            this.addToEnd(val);
        }
    };

    addToFront(val: T): void {
        const newNode: ListNode<T> = new ListNode(val);
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
    };

    deleteAtFront(): void {
        if (this.head === null) {
            return;
        }
        this.head = this.head.next;
        this.size--;
    };

    addToEnd(val: T): void {
        const newNode: ListNode<T> = new ListNode(val);
        if (this.head === null) {
            this.head = newNode;
            this.size++;
            return;
        }

        let current: ListNode<T> = this.head;
        while (current.next !== null) {
            current = current.next;
        }
        current.next = newNode;
        this.size++;
    };

    deleteAtEnd(): void {
        if (this.head === null) {
            return;
        }
        if (this.head.next === null) {
            this.head = null;
            return;
        }
        let current: ListNode<T> = this.head;
        while (current.next != null && current.next.next != null) {
            current = current.next;
        }
        current.next = null;
        this.size--;
    };

    addAtIndex(index: number, val: T): void {
        const newNode: ListNode<T> = new ListNode(val);
        if (index === 0) {
            newNode.next = this.head;
            this.head = newNode;
            return;
        }

        let current: ListNode<T> | null = this.head;
        for (let i: number = 0; i < index - 1 && current !== null; ++i) {
            current = current.next;
        }
        if (current === null) {
            return;
        }
        newNode.next = current.next;
        current.next = newNode;
        this.size++;
    };

    deleteAtIndex(index: number): void {
        if (this.head === null) {
            return;
        }
        if (index === 0) {
            this.head = this.head.next;
            return;
        }

        let current: ListNode<T> = this.head;
        for (let i: number = 0; i < index - 1 && current !== null; ++i) {
            if (current.next) current = current.next;
        }
        if (current === null || current.next === null) {
            return;
        }
        current.next = current.next.next;
        this.size--;
    };

    getAtIndex(index: number): ListNode<T> | null {
        let current: ListNode<T> | null = this.head;
        let i: number = 0;
        while (current !== null && i < index) {
            current = current.next;
            i++;
        }
        return current !== null && i === index ? current : null;
    };

    getFirst(): ListNode<T> | null {
        if (this.head === null) {
            return null;
        }
        return this.head;
    };

    getLast(): ListNode<T> | null {
        if (this.head === null) {
            return null;
        }
        let lastNode: ListNode<T> = this.head;
        while (lastNode.next !== null) {
            lastNode = lastNode.next;
        }
        return lastNode;
    };

    getArray(): ListNode<T>[] {
        const result: any[] = [];
        let current: ListNode<T> | null = this.head;
        while (current) {
            result.push(current);
            current = current.next;
        }
        return result;
    };

    getSize(): number {
        return this.size;
    };
}

const randomArr = (min: number, max: number): string[] => {
    const len: number = Math.floor(Math.random() * (max - min + 1)) + min;
    const arr: string[] = [];
    for (let i: number = 0; i < len; i++) {
        const randInt: number = Math.floor(Math.random() * 101);
        arr.push(String(randInt));
    }
    return arr;
};

export const linkedList: LinkedList<string> = new LinkedList<string>(randomArr(3, 4));
