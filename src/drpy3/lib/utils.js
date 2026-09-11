// utils：URL/文本工具（设计 §9 text/utils）。W1 先落 joinUrl 内置兜底，其余 W4 补齐。

/** 内置 joinUrl 兜底：WHATWG URL 语义（= python urljoin 常用面），异常时保守拼接 */
export function builtinJoinUrl(base, path) {
    try {
        return new URL(path, base || undefined).href;
    } catch {
        return (base || '') + path;
    }
}
