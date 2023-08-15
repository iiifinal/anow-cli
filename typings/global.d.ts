declare module 'process' {
    global {
        namespace NodeJS {
           export  interface ProcessEnv {
                BASE_ENV:'development'|'production'|'test'|'pre';
                NODE_ENV:'development'|'production';
            }
        }
    }
}

declare module '*.png' {
    const value: any;
    export = value;
}

declare module '*.jpg' {
    const value: any;
    export = value;
}

declare module '*.jpeg' {
    const value: any;
    export = value;
}

declare module '*.gif' {
    const value: any;
    export = value;
}

declare module '*.svg' {
    const value: any;
    export = value;
}

declare module '*.css' {
    const value: any;
    export = value;
}

declare module '*.less' {
    const value: any;
    export = value;
}

declare module '*.scss' {
    const value: any;
    export = value;
}

declare module '*.sass' {
    const value: any;
    export = value;
}

declare module '*.styl' {
    const value: any;
    export = value;
}

declare module '*.md' {
    const value: any;
    export = value;
}

declare module '*.json' {
    const value: any;
    export = value;
}

declare module '*.woff' {
    const value: any;
    export = value;
}

declare module '*.woff2' {
    const value: any;
    export = value;
}

declare module '*.ttf' {
    const value: any;
    export = value;
}

declare module '*.eot' {
    const value: any;
    export = value;
}
declare module '*.otf' {
    const value: any;
    export = value;
}