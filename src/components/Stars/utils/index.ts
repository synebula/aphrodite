export function clone(src: any): any {
  return JSON.parse(JSON.stringify(src));
}
