const imageCache = new Map();

export function loadImage(id,src) {
    if (!id) {
        return Promise.reject(new Error("loadImage: 'id' is required"));
    }

    const existing = imageCache.get(id);
    if (existing?.status === 'loaded') {
        return Promise.resolve(existing.image);
    }
    if (existing?.status === 'loading') {
        return existing.promise;
    }
    const img = new Image();
    const promise = new Promise((resolve) => {
        img.onload = () => {
            imageCache.set(id, { status: 'loaded', image: img, src });
            resolve(img);
        };
        img.onerror = () => {
            imageCache.set(id, { status: 'error', image: null, src });
            resolve(null);
        };
        img.src = src;
    });
    imageCache.set(id, { status: 'loading', image: null, promise, src });
    return promise;
}

export async function loadImages(manifest) {
    const entries = Object.entries(manifest ?? {});
    const results = await Promise.all(entries.map(([id, src]) => loadImage(id, src)));

    const out = {};
    for (let i = 0; i < entries.length; i++) {
        out[entries[i][0]] = results[i];
    }
    return out;
}

export function getImage(id) {
    return imageCache.get(id)?.image ?? null;
}

export function getImageSrc(id) {
    return imageCache.get(id)?.status === "loaded";
}
