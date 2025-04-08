import usersModel from "./model/usersModel"
import { connectMongoDB } from "../dao/connection";

class UsersDao{
    constructor(){}

    async getById( id ){
        await connectMongoDB()
        return await usersModel.findOne( { _id : id } ).select("-email -password -price")
    }

    async getByEmail( email ){
        await connectMongoDB()
        return await usersModel.findOne( { email : email } )
    }

    async getGuestByEmail( id , email ){
      await connectMongoDB()
      return await usersModel.findOne( { _id : id , "guests.email" : email } )
    }

    async updateGuests( id , guest ){
      await connectMongoDB()
      return await usersModel.updateOne( { _id : id } , { $push : { guests : guest } } )
    }    
 
    async deleteTable( id , number ){
        await connectMongoDB()
        const parsedNumber = parseInt( number )
        const delTable = await usersModel.updateOne( { _id : id , "guestTable.table_name" : parsedNumber } , { $pull : { guestTable : { table_name : parsedNumber }} } )
        if( !delTable ){
          return { ERROR : "CANNOT DELETE TABLE" }
        }
        else{
          return { MESSAGE : "200OK" }
        }
    }

    async deleteGuest( id , email ){
        await connectMongoDB()
        const deleteGuest =  await usersModel.updateOne( { _id : id , "guests.email" : email } , { $pull : { guests : { email : email } } } )
        if( !deleteGuest ){
         return { ERROR : "CANNOT DELETE GUEST" }
        }
        else{
         const deleteFromTable = await usersModel.updateOne( { _id: id }, { $pull: { "guestTable.$[table].guests": { email: email } } }, { arrayFilters: [{ "table.guests.email": email }]  });
         if( !deleteFromTable ){
           return { ERROR : "CANNOT DELETE GUEST FROM TABLE" }
         }
         else{
           return { SUCCESS : "200OK" }
         }
        }
    }

    async createTable( id , table ){
      const parsedNumber = parseInt( table )
      const findTable = await usersModel.findOne( { _id : id , "guestTable.table_name" : parsedNumber } )
      if( !findTable ){
       const createTable = await usersModel.updateOne( { _id : id } , { $push : { guestTable : { table_name : parsedNumber } } } )
       if( !createTable ){
        return { ERROR : "CANNOT CREATE TABLE" }
       }
       else{
        return { SUCCESS : "TABLE CREATED" }
       }
      }
      else{
        return { ERROR : "TABLE ALREADY EXISTS" }
      }
    }

    async addTable( id , table , guest ){
        await connectMongoDB()
        const table_number = parseInt( table )
        const findTable = await usersModel.findOne( { _id : id , "guestTable.table_name" : table_number } )
        if( !findTable ){
            const addGuestTable = await usersModel.updateOne( { _id : id } , { $push : { guestTable : { table_name : table_number , guests : [ guest ] } } } )
            if( !addGuestTable ){
              return { ERROR : "NO SE AH PODIDO AÑADIR" }
            }
            else{
                const changueGuestTable = await usersModel.updateOne( { _id : id , "guests.email" : guest.email } , { $set : { "guests.$.table" : table } })
                if( !changueGuestTable ){
                 return { ERROR : "NO SE AH PODIDO CREAR LA MESA" }
                }
                else{
                  const findGuest = await usersModel.findOne( { _id : id , "guestTable.guests.email" : guest.email } )
                  if( !findGuest ){
                    return { SUCCESS : "USUARIO NO ENCONTRADO EN MESA" }
                  }
                  else{
                    const removeGuest = await usersModel.updateOne( { _id : id , "guestTable.table_name" : table , "guestTable.guests.email" : guest.email } , { $pull : { "guestTable.$.guests" : { email : guest.email } } } )
                    if( !removeGuest ){
                        return { ERROR : "CANNOT DELETE GUEST FROM TABLE" }
                    }
                    else{
                        return { SUCCESS : "200OK" }
                    }
                  }
                }
            }
        }
        else{
            const findGuest = await usersModel.findOne( { _id : id , "guestTable.table_name" : table_number , "guestTable.guests.email" : guest.email } )
            if( !findGuest ){
                const createTable = await usersModel.updateOne( { _id : id , "guestTable.table_name" : table_number } , { $push : {  "guestTable.$.guests" : [ guest ] } } )
                if( !createTable ){
                    return { ERROR : "CANNOT CREATE TABLE" }
                }
                else{
                    const changueGuestTable = await usersModel.updateOne( { _id : id , "guests.email" : guest.email } , { $set : { "guests.$.table" : table } })
                    if( !changueGuestTable ){
                     return { ERROR : "NO SE AH PODIDO CREAR LA MESA" }
                    }
                    else{
                     return { SUCCESS : "200OK" }
                    }
                }
            }
            else{
              const removeGuest = await usersModel.updateOne({ _id: id }, { $pull: { "guestTable.$[table].guests": { email: guest.email } } }, { arrayFilters: [{ "table.guests.email": guest.email }]  });
              if( !removeGuest ){
                  return { ERROR : "CANNOT DELETE GUEST FROM TABLE" }
              }
              else{
                const createTable = await usersModel.updateOne( { _id : id , "guestTable.table_name" : table_number } , { $push : {  "guestTable.$.guests" : [ guest ] } } )
                if( !createTable ){
                    return { ERROR : "CANNOT CREATE TABLE" }
                }
                else{
                    const changueGuestTable = await usersModel.updateOne( { _id : id , "guests.email" : guest.email } , { $set : { "guests.$.table" : table } })
                    if( !changueGuestTable ){
                     return { ERROR : "NO SE AH PODIDO CREAR LA MESA" }
                    }
                    else{
                      return { SUCCESS : "200OK" }
                    }
                }
              }
            }
        }
    }

    async getGuests( id , guestId ){
        await connectMongoDB()
        if( !guestId ){
          return await usersModel.findOne( { _id : id } ).select("-user -email -password -price")   
        }
        else{
            return await usersModel.findOne( { _id : id } , { "guests._id" : guestId } )
        }
    }
}

export default UsersDao