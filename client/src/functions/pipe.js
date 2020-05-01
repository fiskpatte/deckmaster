// pipe(a, b, c)(argument) === c(b(a(initialArgument)))

const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
export default pipe;
