export class Pokemon {
    private id: string;
    private sprite: string;

    constructor(id: string, sprite: string) {
        this.id = id;
        this.sprite = sprite;
    }

    public getId(): string {
        return this.id;
    }

    public getSprite(): string {
        return this.sprite;
    }
}