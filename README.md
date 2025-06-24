# OpenPaste

OpenPaste is an open-source implementation for self-hosted pastebin, also an alternative to [GitHub Gist](https://gist.github.com) but with more flexibility.

OpenPaste is written with [Prisma](https://prisma.io) and [Remix](https://remix.run), providing fluent, fast and out-of-box experience.

## Installation

### Docker

``` shell
$ docker pull ghcr.io/VLTHellolin/openpaste:latest
```

### Docker Compose (Recommended)

``` yaml
services:
  openpaste:
    image: ghcr.io/VLTHellolin/openpaste:latest
    container_name: openpaste
    restart: always
    ports:
      - 6280:6280
```

OpenPaste is now running on port 6280.

By default OpenPaste uses SQLite to storage paste data. It is also possible to use MySQL, MariaDB or PostgreSQL:

``` shell
DATABASE_PROVIDER="mysql"
DATABASE_URL="mysql://openpaste:1145141919810@openpaste-mysql:3306/openpaste"
```

### From Source

Make sure you have Node.js and pnpm installed.

``` shell
$ git clone https://github.com/VLTHellolin/openpaste.git
$ cd openpaste
$ pnpm install
$ pnpm build
$ pnpm start
```

OpenPaste is now running on port 6280.

## Acknowledgements

This project is inspired by [thomiceli/opengist](https://github.com/thomiceli/opengist).

## License

Released under the [MIT License](./LICENSE).

Copyright © 2025 [hellolin](https://hellolin.top). All rights reserved.