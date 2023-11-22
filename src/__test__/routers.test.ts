import app from "../server";
import supertest from "supertest"; 

describe('GET / ' ,()=>{
    it("Should return some message"), async ()=>{
        const res = await supertest(app)
        .get('/')

        expect(res.body.message).toBe('hello')
    }
})
