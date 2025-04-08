import UsersDao from "../dao/users.dao";

class Invitations{
    constructor( dao ){
      this.dao = dao
    }

  async getById( id ){
    return this.dao.getById( id )
  }

  async getByEmail( email ){
    return this.dao.getByEmail( email )
  }

  async deleteGuest( id , email ){
    return this.dao.deleteGuest( id , email )
  }

  async getGuestByEmail( id , email ){
    return this.dao.getGuestByEmail( id , email )
  }

  async deleteTable( id , email ){
    return this.dao.deleteTable( id , email )
  }

  async createTable( id , table ){
    return this.dao.createTable( id , table )
  }

  async updateGuests( id , guest ){
    return this.dao.updateGuests( id , guest )
  }

  async addTable( id , table , guest ){
    return await this.dao.addTable( id , table , guest )
  }
  
  async getGuests( id , guestId ){
    return this.dao.getGuests( id , guestId )
  }
}


const Users = new Invitations( new UsersDao )
export default Users