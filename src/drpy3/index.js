// drpy3-core 入口：宿主无关的 ESM 类库（W0 骨架，后续 WP 逐个充实）
// 设计唯一真相源：docs/drpy3-设计文档.md；执行手册：docs/drpy3-实现任务书.md

export const VERSION = 'drpy3 0.1.0 W0';

// W1 起实现：Runtime（HostEnv 校验/use()/capabilities）
export class Runtime {
    constructor(hostEnv) {
        this.hostEnv = hostEnv || {};
    }
}

// defineSource 运行时恒等（§4.1）：唯一作用是给 IDE/TS 类型提示
export function defineSource(source) {
    return source;
}
