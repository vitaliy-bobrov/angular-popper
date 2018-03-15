export default {
  output: {
    name: 'angular-icon',
    format: 'umd'
  },
  external: [
    '@angular/core',
    '@angular/common',
    'popper.js'
  ],
  onwarn: (warning) => {
    const skip_codes = [
      'THIS_IS_UNDEFINED',
      'MISSING_GLOBAL_NAME'
    ];

    if ( skip_codes.indexOf(warning.code) != -1 ) return;
    console.error(warning);
  }
};
