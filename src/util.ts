// Galaxy Engine - Copyright (C) 2023 Karl Pickett - All Rights Reserved

import { float_to_u8  } from "./math.js";


// NB: Writing past a TypedArray's max size does not throw any error,
// the write is simply ignored.
export class BufferWrapper {
    private buffer: ArrayBuffer
    private view_u32: Uint32Array
    private view_f32: Float32Array
    private view_u8: Uint8Array
    private nr_bytes: number

    constructor(byte_size: number) {
      this.buffer = new ArrayBuffer(byte_size)
      this.view_u32 = new Uint32Array(this.buffer)
      this.view_f32 = new Float32Array(this.buffer)
      this.view_u8 = new Uint8Array(this.buffer)
      this.nr_bytes = 0
    }

    clear() { this.nr_bytes = 0; }

    set_min_size() {
        while(this.bytes_used < 16) {
            this.append_raw_u32(99999);
        }
    }

    get bytes() { return this.view_u8; }

    get bytes_used(): number { return this.nr_bytes; }

    append_raw_color4(v: Color4) {
        this.append_raw_f32(v.r)
        this.append_raw_f32(v.g)
        this.append_raw_f32(v.b)
        this.append_raw_f32(v.a)
    }

    append_raw_color4_packed(v: Color4) {
        let r = float_to_u8(v.r);
        let g = float_to_u8(v.g);
        let b = float_to_u8(v.b);
        let a = float_to_u8(v.a);
        let idx = this.bytes_used;
        this.view_u8[idx]   = r
        this.view_u8[idx+1] = g
        this.view_u8[idx+2] = b
        this.view_u8[idx+3] = a
        this.nr_bytes += 4
    }

    // No capacity checks; caller must check beforehand
    append_raw_f32(v: number) {
        this.view_f32[this.nr_bytes/4] = v;
        this.nr_bytes += 4;
    }

    append_raw_u32(v: number) {
        this.view_u32[this.nr_bytes/4] = v;
        this.nr_bytes += 4;
    }

}


export class Vector3 {
    x: number = 0
    y: number = 0
    z: number = 0

    constructor(x: number, y: number, z: number) {
        this.x = x
        this.y = y
        this.z = z
    }

    clone(): Vector3 {
        return new Vector3(this.x, this.y, this.z);
    }

    toString(): string {
        return `x:${this.x.toFixed(2)}, y:${this.y.toFixed(2)}, z:${this.z.toFixed(2)}`;
    }
}


export class Vector2 {
    x: number = 0
    y: number = 0

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    toString(): string {
        return `x:${this.x.toFixed(2)}, y:${this.y.toFixed(2)}`;
    }
}


export class Color4 {
    r: number = 0
    g: number = 0
    b: number = 0
    a: number = 0

    constructor(r: number, g: number, b: number, a: number) {
        this.r = r
        this.g = g
        this.b = b
        this.a = a
    }

    clone(): Color4 {
        return new Color4(this.r, this.g, this.b, this.a);
    }
}



export function do_throw(errorMessage: string): never {
    throw new Error(errorMessage)
}

