# Online Medicare Plans

**The following technologies are assumed to be installed**
* Docker
* Node
* Yarn

### Build Instructions
**Development Environment**
```bash
yarn run start
```

**Staging/Production Environment**
```bash
docker build -t ilab-omp .
docker run -it --rm -p 80:80 ilab-omp
```
