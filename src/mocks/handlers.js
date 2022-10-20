import { rest } from 'msw'

const sampleResponse = {"bus":[{"route":"77","destination":"Cumberland","direction":"Westbound","predictedTime":"20:09"},{"route":"77","destination":"Diversey/Lake Shore","direction":"Eastbound","predictedTime":"20:11"},{"route":"77","destination":"Diversey/Lake Shore","direction":"Eastbound","predictedTime":"20:22"},{"route":"77","destination":"Harlem","direction":"Westbound","predictedTime":"20:24"},{"route":"77","destination":"Cumberland","direction":"Westbound","predictedTime":"20:30"}],"train":[{"route":"Blue","destination":"Forest Park","direction":"Forest Park","predictedTime":"20:10:14"},{"route":"Blue","destination":"O'Hare","direction":"O'Hare","predictedTime":"20:11:47"},{"isGhost": true, "route":"Blue","destination":"Forest Park","direction":"Forest Park","predictedTime":"20:25:52"},{"route":"Blue","destination":"O'Hare","direction":"O'Hare","predictedTime":"20:29:19"},{"route":"Blue","destination":"O'Hare","direction":"O'Hare","predictedTime":"20:33:16"}],"bike":[{"lat":41.939059,"lon":-87.7028235,"id":"9f4e6fc9fb15914a02e5e839ad458fe5","distance":209.84143476571572},{"lat":41.939521909,"lon":-87.700390935,"id":"ef8008784930f745e672e14dd3c1ee28","distance":1083.1369615167316},{"lat":41.93580683333333,"lon":-87.70432716666667,"id":"749b0758917998c14bafc355b3a4a85b","distance":1112.0167486427686},{"lat":41.936534,"lon":-87.70626033333333,"id":"8c1a379ffdf7da376a633e56ba7ca554","distance":1347.545017836817},{"lat":41.938540833333334,"lon":-87.69951866666666,"id":"e33e9cd3465a0853942eb255f7a15b8f","distance":1354.495157648413}]};

export const handlers = [
    rest.get('/transitinfo', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(sampleResponse)
        )})
];



