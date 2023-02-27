export const toHTMLHashtag = (el: string) => {
    var note = el;
    var note_split = note.split(/(\s+)/);
    var hash_a = (el: String) => el.includes("@");
    var hashtag = (el: String) => el.includes("#");
    var note_hash_a = note_split.filter(el => hash_a(el));
    var note_hashtag = note_split.filter(el => hashtag(el));
    var tag_a_hash_a = (el: String) => `<a href='@/${el.split("@")[1]}' class='text-red'>${el}</a>`
    var tag_a_hashtag = (el: String) => `<a href='/tag/${el.split("#")[1]}'>${el}</a>`
    var result = note_split.map(el => {
        if (note_hash_a.includes(el)) {
            el = tag_a_hash_a(el)
        }
        if (note_hashtag.includes(el)) {
            el = tag_a_hashtag(el)
        }
        return el;
    })
    return result.toString();
}