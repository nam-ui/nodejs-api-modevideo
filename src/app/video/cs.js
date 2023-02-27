
let showNow = [
    { id: "1abc", pId: null, msg: "paren-1" },
    { id: 4, pId: 2, msg: "Child-2-pid-4" },
    { id: 2, pId: 1, msg: "Child-1-pid-2" },
    { id: 3, pId: 1, msg: "Child-1-pid-3" },
    { id: 5, pId: 3, msg: "Child-2-pid-4" },
];
function buildComments(object, data) {
    data.forEach((doc, index) => {
        if (doc.pId === null || doc.pId === undefined) {
            object = doc;
            return;
        }
        if (doc.pId === object.id) {
            let comm = {
                ...doc,
            };
            Object.assign(object, { comments: [] })
            object.comments.push(comm);
            data = data.splice(index, 1);
            object.comments.map(el => {
                data.map(el => {
                    if (el.pId === el.id) {
                        buildComments(object.comments[index], data);
                    }
                    return el;
                });
            })
        }
    });
}
buildComments({}, showNow.sort((a, b) => a.id - b.id));

