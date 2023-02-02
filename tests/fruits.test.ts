import app from "../src/index";
import supertest from "supertest";

const api = supertest(app);

describe('Post:/fruits',  ()=>{

    it('Should respond with status 201', async ()=>{

        const resultadopost = await api.post('/fruits').send(
            {
                "name": "morango",
                "price": 2,
            }
        )

        const resultado = await api.get("/fruits")

        expect(resultado.body).toHaveLength(1) 
        expect(resultadopost.status).toBe(201)   
    })
    
    it('Should respond with 422 if bad request', async ()=>{

        const resultado = await api.post('/fruits').send({})
        expect(resultado.status).toBe(422) 
    })
})


describe('GET:/fruits',  ()=>{

    it('Should respond with status 200/', async ()=>{
        const resultado = await api.get("/fruits")
        expect(resultado.status).toBe(200)
        expect(resultado.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    price: expect.any(Number),
                })
            ])
        )
    })

    

})

describe("GET:/fruits/:id", ()=>{

    it('GET:/fruits/:id', async ()=>{
        const resultado = await api.get(`/fruits/${1}`)
        expect(resultado.body).toEqual({
            id: expect.any(Number),
            name: expect.any(String),
            price: expect.any(Number),
        })
        expect(resultado.status).toBe(200)
    })
})
