"use client"
//const hostDev = "http://localhost:3000/api/invitation"
const hostDev = "https://tonia-inv.vercel.app/api/invitation"

class CardsClass{
    constructor(){}

    async ById( id ){
        const request = await fetch(`${hostDev}/${id}`)
        const response = await request.json()
        return response
    }


    async login( body ){
        const request = await fetch(`${hostDev}/auth`,{
            method : "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify( body ),
            credentials: "include"
        })
        const response = await request.json()
        return response
    }
    

    async addGuest( id , guest ){
        const request = await fetch(`${hostDev}/${id}`,{
            method : "PUT",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify( guest )
        })
        const response = await request.json()
        return response
    }

    async addToTable( id , table , guest ){
        const body = {
            table : table,
            guest : guest
        }
        const request = await fetch(`${hostDev}/${id}/table`,{
            method : "PUT",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify( body ),
        })
        const response = await request.json()
        return response
    }

    async deleteGuest( id , email ){
        const body = {
          email : email
        }
        const request = await fetch(`${hostDev}/${id}/guests`,{
            method : "PUT",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify( body ),
            credentials: "include"
        })
        const response = await request.json()
        return response
    }

    async deleteTable( id , number ){
        const request = await fetch(`${hostDev}/${id}/table/${ number }`,{
            method : "PUT",
            headers: { "Content-Type" : "application/json" },
            credentials: "include"
        })
        const response = await request.json()
        return response
    }

    async createTable( id , number ){
        const request = await fetch(`${hostDev}/${id}/table/${ number }/create`,{
            method : "PUT",
            headers: { "Content-Type" : "application/json" },
            credentials: "include"
        })
        const response = await request.json()
        return response
    }


    async getGuests( id ){
        const request = await fetch(`${hostDev}/${id}/guests`,{
            method : "GET",
            headers: { "Content-Type" : "application/json" },
            credentials: "include"
        })
        const response = await request.json()
        return response
    }
}

const Card = new CardsClass()
export default Card