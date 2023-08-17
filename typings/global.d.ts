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

/*与csss相关的处理
*/
declare module '*.css' {
    const classes:{[key:string]:string};
    export default classes
}

declare module '*.scss' {
    const classes:{[key:string]:string};
    export default classes
}
declare module '*.sass' {
    const classes:{[key:string]:string};
    export default classes
}
declare module '*.less' {
    const classes:{[key:string]:string};
    export default classes
}
declare module '*.styl' {
    const classes:{[key:string]:string};
    export default classes
}
/*静态资源处理*/
declare module "*.svg"{
    const ref:string;
    export default ref;
}
declare module "*.bmp"{
    const ref:string;
    export default ref;
}
declare module "*.gif"{
    const ref:string;
    export default ref;
}
declare module "*.jpg"{
    const ref:string;
    export default ref;
}
declare module "*.jpeg"{
    const ref:string;
    export default ref;
}
declare module "*.png"{
    const ref:string;
    export default ref;
}
declare module "*.webp"{
    const ref:string;
    export default ref;
}