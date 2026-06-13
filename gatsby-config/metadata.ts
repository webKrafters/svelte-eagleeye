import pkgJson from '../package.json';

// @debugs
// export const basePkgName = '@webkrafters/svelte-eagleeye';
export const basePkgName = '@webkrafters/vue-eagleeye';

export const NO_SIDER_URI_PATTERN = /^$/; // /^(?:\/(?:quick-start\/?)?(?:\?.*)?)?$/;

export default {
    _24Hours: 8.64e7,
    contact: pkgJson.author.email,
    copyright: 'This website is a copyrisght of webKrafters Inc. 2026-Present',
    darkmode: {
        defaultValue: true,
        key: 'DKM-SV'
    },
    description: pkgJson.description,
    device: {
        backgroundColor: '#002',
        maxWidth: {
            handheldPortait: 991
        },
        themeColor: '#da4'
    },
    language: 'en',
    siteUrl: 'https://svelte-eagleeye.js.org',
    title: 'Svelte Eagle Eye',
    url: {
        demo: 'https://codesandbox.io/s/github/webKrafters/svelte-eagleeye-app',
        npm: `https://www.npmjs.com/package/${ basePkgName }`,
        repo: `https://github.com//${ basePkgName.slice( 1 ) }.js.git`,
        site: pkgJson.homepage
    },
    versionOfInterest: {
        defaultValue: 'Latest',
        key: 'VEROI-SV'
    },
};
