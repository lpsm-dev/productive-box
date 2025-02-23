"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const node_fetch_1 = require("node-fetch");
async function default_1(query) {
    const res = await (0, node_fetch_1.default)("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            Authorization: `bearer ${process.env.GH_TOKEN}`,
        },
        body: JSON.stringify({ query }).replace(/\\n/g, ""),
    });
    return res.json();
}
