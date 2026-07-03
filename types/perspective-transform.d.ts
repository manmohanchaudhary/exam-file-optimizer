declare module 'perspective-transform' {
  interface Transform {
    transform(x: number, y: number): [number, number];
    transformInverse(x: number, y: number): [number, number];
  }
  
  function PerspT(srcPts: number[], dstPts: number[]): Transform;
  export default PerspT;
}
