"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.treeComments = void 0;
const treeComments = async function (data, root) {
    var t = {};
    console.log(data);
    console.log(root);
    await data.forEach((el) => {
        Object.assign(t[el.id] = t[el.id] || {}, el);
        t[el.f_id] = t[el.f_id] || {};
        t[el.f_id].comments = t[el.f_id].comments || [];
        t[el.f_id].comments.push(t[el.id]);
    });
    return await root.map((el) => {
        return t[el].comments;
    }).flat();
};
exports.treeComments = treeComments;
