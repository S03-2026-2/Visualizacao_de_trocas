export class Pokemon {
    private id: string;
    private sprite: string; // Tocar para imagem depois

    constructor(id: string, sprite: string) {
        this.id = id;
        this.sprite = sprite;
    }
}