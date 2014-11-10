# findmydevice-l10n-screens

Screenshots for FindMyDevice.

## Installation

```sh
$ npm install
```

**PROTIP:** Running `npm install` causes the Bower modules to be installed/updated.


## How Do I Even?

```sh
$ npm start
```

Running `npm start` will force sync the Bower dependencies (to ensure we're always running with latest translations), and then scrapes the homepages for the specified locales for each of the specified viewport widths.

The generated screenshots are saved in [_/output/images/_](output/images), or you can view locale specific screenshots by viewing the [_/output/{locale}.md_](output/) files which lists locale-specific images on a single page.
