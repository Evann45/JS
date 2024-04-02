export default class Character {
    constructor(id, name, name_kanji, nicknames, image, about) {
        this.id = id;
        this.name = name;
        this.name_kanji = name_kanji;
        this.nicknames = nicknames;
        this.image = image;
        this.about = about;
    }

    get fullName() {
        return `${this.name} (${this.name_kanji})`;
    }

    get nicknamesList() {
        return this.nicknames.join(', ');
    }

    get aboutText() {
        let text = '';
        this.about.split('\n').forEach(paragraph => {
            text += `<p>${paragraph}</p>`;
        });
        return text;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            name_kanji: this.name_kanji,
            nicknames: this.nicknames,
            image: this.image,
            about: this.about
        };
    }

    static fromJson(json) {
        return new Character(
            json.id,
            json.name,
            json.name_kanji,
            json.nicknames,
            json.image,
            json.about
        );
    }
}