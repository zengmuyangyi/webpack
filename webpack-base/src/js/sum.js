export default function count(...args) {
  return args.reduce((a, b) => a + b, 0);
}
