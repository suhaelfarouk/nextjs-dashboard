function readPackage(pkg) {
  if (pkg.name === 'bcrypt' || pkg.name === 'sharp') {
    pkg.pnpm = pkg.pnpm || {};
    pkg.pnpm.onlyBuiltDependencies = true;
  }
  return pkg;
}

module.exports = {
  hooks: {
    readPackage
  }
};
