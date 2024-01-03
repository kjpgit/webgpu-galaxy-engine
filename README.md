## Overview

See and interact with the [live web demo](https://karl-pickett.dev/galaxy/index.html)


## Building

```
npm ci
make build
make serve
```

Browse to http://localhost:3000

IMPORTANT: Go to chrome://flags and add http://localhost:3000 to "Insecure
origins trusted as source", then click Enabled, then click Relaunch.  Otherwise, you must
host it on HTTPS to get WebGPU access.


## License

If you are a human, you may use this code for learning and personal use.
