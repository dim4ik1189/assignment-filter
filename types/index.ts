type ThumbnailImage = {
    file: {
        "url": string;
    }
}

export type EdgeNode = {
    "name": string;
    "node_locale": string
    "thumbnailImage": ThumbnailImage;
    "colorFamily": Array<{ "name": string }>;
    "categoryTags": Array<string>,
    "shopifyProductEu": {
        "variants": {
            "edges": Array<{ "node": { "price": string; }}>
        }
    }
}


export type Edge = {
    node: EdgeNode;
}
