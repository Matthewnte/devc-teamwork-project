/* eslint-disable quotes */
/* eslint-disable global-require */
/* eslint-disable no-undef */
const Request = require('request');

describe('Unit test for all api endpoints', () => {
    let server;
    beforeAll(() => {
        server = require('../server')
    })
    afterAll(() => {
        server.close();
    })

    describe('POST /auth/create-user', () => {
        const data = {};
        beforeAll((done) => {
            Request.post('http://localhost:3000/auth/create-user', (error, res, body) => {
                data.status = res.statusCode;
                data.body = JSON.parse(body);
                done();
            });
        });
        it('Should respond with a json object specifying a data property on success', () => {
            expect(data.body).toEqual({
                status: 'success',
                data: {
                    message: 'User account successfully created',
                    token: 'randomstring',
                    userId: data.body.data.userId,
                },
            })
        });
        it('should return status code of 201', () => {
            expect(data.status).toBe(201);
        });
    })
    xdescribe('POST /auth/signin', () => {
        const data = {};
        beforeAll((done) => {
            Request.get('http://localhost:3000/auth/signin', (error, res, body) => {
                data.status = res.statusCode;
                data.body = JSON.parse(body);
                done();
            });
        });
        it('should return a status code of 200', () => {
            expect(data.status).toBe(200)
        });
        it('should put extra user data on the token payload', () => {
            expect(data.data.token).toBe('This is an error message')
        });
    })
//     xdescribe('POST /gif', () => {
//         const data = {};
//         beforeAll((done) => {
//             Request.get('http://localhost:3000/gifs', (error, res, body) => {
//                 data.status = res.statusCode;
//                 data.body = JSON.parse(body);
//                 done();
//             });
//         });
//         it('should return a status code of 200', () => {
//             expect(data.status).toBe(200)
//         });
//         it('should put extra user data on the token payload', () => {
//             expect(data).toBe({
//             status: "success",
//             data: {
//                 gifId: Interger,
//                 message: "GIF image successfully posted",
//                 createdOn: Datetime,
//                 title: String,
//                 imageUrl: String,
//             },
//         })
//         });
//     })
})