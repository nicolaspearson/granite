# backend

This directory contains source code for all backend services in the monorepo. Each service is
considered to be a package. As more services are added to the project support packages can also
be added into the directory structure to promote code re-use between the various packages. For
example the `lib-` prefix can be used for common runtime functions that are shared by various
packages. The `utils-` prefix can be used to share common test functionality.
