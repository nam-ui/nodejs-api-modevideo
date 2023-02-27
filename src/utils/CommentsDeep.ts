const treeComments = async function (data: any, root: any) {
    var t: any = {};
    console.log(data);
    console.log(root);
    
    await data.forEach((el: any) => {
        Object.assign(t[el.id] = t[el.id] || {}, el);
        t[el.f_id] = t[el.f_id] || {};
        t[el.f_id].comments = t[el.f_id].comments || [];
        t[el.f_id].comments.push(t[el.id]);
    })
    return await root.map((el: any) => {
        return t[el].comments;
    }).flat();
}

export { treeComments };